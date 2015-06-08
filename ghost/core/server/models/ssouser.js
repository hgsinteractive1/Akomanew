var  _              = require('lodash'),
    Promise        = require('bluebird'),
    ghostBookshelf = require('./base'),
    errors         = require('../errors'),
    utils          = require('../utils'),
    uuid       = require('node-uuid'),
    config      = require('../config'),
    User      = require('./user').User,
    Users      = require('./user').Users,
    SSOUser;

SSOUser = ghostBookshelf.Model.extend({

    tableName: 'sso_users',

    initialize: function () {
        ghostBookshelf.Model.prototype.initialize.apply(this, arguments);
        var self = this;
        this.isNewUser = function(){ return self.get("status") === "new"; };
        this.isPendingUser = function(){ return self.get("status") === "pending"; };
        this.isAcceptedUser = function(){ return self.get("status") === "approved"; };
        this.isRejectedUser = function(){ return self.get("status") === "rejected"; };
        this.getPassword = function(){ return config.salt + self.get("social_id") + self.get("network"); };
        this.getSocialUrl = function(){
            if(self.get("network") === "facebook") {
                return "https://facebook.com/" + self.get("social_id");
            } else if(self.get("network") === "twitter") {
                return "https://twitter.com/intent/user?user_id=" + self.get("social_id");
            }

            return "#";
        };
        this.getUser = function(){
            if(!self.isAcceptedUser()) {
                return User.forge({"id":-1}).fetch();
            }
            return User.forge({"email":self.get("email")}).fetch({"withRelated":["roles"]});
        };
    },

    defaults: function () {
        return {
            uuid: uuid.v4(),
            status: "new"
        };
    },

    toJSON: function (options) {
        var attrs = ghostBookshelf.Model.prototype.toJSON.call(this, options);

        return attrs;
    },
}, {
    getWithNetworkAndSocialId: function(network, social_id){
        return SSOUser.forge({"network":network, "social_id":social_id}).fetch({"network":network, "social_id":social_id}).then(function(user){
            if(!user) {
                return SSOUser.add({"network":network, "social_id":social_id, "status_date": new Date()}, {context: {internal: true}});
            }
            return user;
        }).then(function(user){
            return user;
        });
    },
       /**
     * #### findPage
     * Find results by page - returns an object containing the
     * information about the request (page, limit), along with the
     * info needed for pagination (pages, total).
     *
     * **response:**
     *
     *     {
     *         users: [
     *              {...}, {...}, {...}
     *          ],
     *          meta: {
     *              page: __,
     *              limit: __,
     *              pages: __,
     *              total: __
     *         }
     *     }
     *
     * @param {Object} options
     */
    findPage: function (options) {
        options = options || {};

        var userCollection = SSOUsers.forge();

        if (options.limit && options.limit !== 'all') {
            options.limit = parseInt(options.limit, 10) || 15;
        }

        if (options.page) {
            options.page = parseInt(options.page, 10) || 1;
        }

        options = this.filterOptions(options, 'findPage');

        // Set default settings for options
        options = _.extend({
            page: 1, // pagination page
            limit: 1000,
            where: {},
            whereIn: {}
        }, options);

        // If there are where conditionals specified, add those
        // to the query.
        if (options.where) {
            userCollection.query('where', options.where);
        }

        // Add related objects
        options.withRelated = _.union(options.withRelated, options.include);

        // only include a limit-query if a numeric limit is provided
        if (_.isNumber(options.limit)) {
            userCollection
                .query('limit', options.limit)
                .query('offset', options.limit * (options.page - 1));
        }

        function fetchCollection() {
            return userCollection
                .query('orderBy', 'name', 'ASC')
                .query('orderBy', 'created_at', 'DESC')
                .fetch(_.omit(options, 'page', 'limit'));
        }

        function fetchPaginationData() {
            var qb,
                tableName = _.result(userCollection, 'tableName'),
                idAttribute = _.result(userCollection, 'idAttribute');

            // After we're done, we need to figure out what
            // the limits are for the pagination values.
            qb = ghostBookshelf.knex(tableName);

            if (options.where) {
                qb.where(options.where);
            }

            return qb.count(tableName + '.' + idAttribute + ' as aggregate');
        }
        // Get all the users by email
        return User.fetchAll({"withRelated":"roles", "include":"roles"}).then(function(users){
            
            var usersByEmail = {};
            users.models.forEach(function(user){
                usersByEmail[user.attributes.email] = user;
            });
            return usersByEmail;
        }).then(function(usersByEmail){
            return Promise.join(fetchCollection(), fetchPaginationData())
                // Format response of data
                .then(function (results) {
                    var totalUsers = parseInt(results[1][0].aggregate, 10),
                        calcPages = Math.ceil(totalUsers / options.limit) || 0,
                        pagination = {},
                        meta = {},
                        data = {};

                    pagination.page = options.page;
                    pagination.limit = options.limit;
                    pagination.pages = calcPages === 0 ? 1 : calcPages;
                    pagination.total = totalUsers;
                    pagination.next = null;
                    pagination.prev = null;

                    data.ssoUsers = userCollection.toJSON(options);
                    for(var s in data.ssoUsers) {
                        data.ssoUsers[s].user = usersByEmail[data.ssoUsers[s].email] ? usersByEmail[data.ssoUsers[s].email].attributes.id : null;
                    }
                    data.users = [];
                    for(var u in usersByEmail) {
                        var user = usersByEmail[u].toJSON();
                        user.roles = usersByEmail[u].relations.roles.models;
                        data.users.push(user);
                    }
                    data.meta = meta;
                    meta.pagination = pagination;

                    if (pagination.pages > 1) {
                        if (pagination.page === 1) {
                            pagination.next = pagination.page + 1;
                        } else if (pagination.page === pagination.pages) {
                            pagination.prev = pagination.page - 1;
                        } else {
                            pagination.next = pagination.page + 1;
                            pagination.prev = pagination.page - 1;
                        }
                    }

                    return data;
                });
        }).catch(errors.logAndThrowError);
    },
});



SSOUsers = ghostBookshelf.Collection.extend({
    model: SSOUser
});

module.exports = {
    SSOUser: ghostBookshelf.model('SSOUser', SSOUser),
    SSOUsers: ghostBookshelf.collection('SSOUsers', SSOUsers)
};