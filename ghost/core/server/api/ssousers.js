// # Users API
// RESTful API for the User resource
var Promise         = require('bluebird'),
    _               = require('lodash'),
    dataProvider    = require('../models'),
    settings        = require('./settings'),
    canThis         = require('../permissions').canThis,
    errors          = require('../errors'),
    utils           = require('./utils'),
    globalUtils     = require('../utils'),
    config          = require('../config'),
    mail            = require('./mail'),

    docName         = 'ssoUsers',
    // TODO: implement created_by, updated_by
    allowedIncludes = ['permissions', 'roles', 'roles.permissions'],
    users,
    sendInviteEmail;

// ## Helpers
function prepareInclude(include) {
    include = include || '';
    include = _.intersection(include.split(','), allowedIncludes);
    return include;
}

/**
 * Send an email
 **/
function sendEmail(sendTo, subject, message) {
    var payload = {
        mail: [{
            message: {
                to: sendTo,
                subject: subject,
                html: message.replace(/(?:\r\n|\r|\n)/g, '<br />'),
                text: message
            },
            options: {}
        }]
    };

    return mail.send(payload, {context: {internal: true}});
}

/**
 * ## Posts API Methods
 *
 * **See:** [API Methods](index.js.html#api%20methods)
 */
users = {

    /**
     * ## Browse
     * Fetch all users
     * @param {{context}} options (optional)
     * @returns {Promise(Users)} Users Collection
     */
    browse: function browse(options) {
        options = options || {};
        return canThis(options.context).browse.user().then(function () {
            if (options.include) {
                options.include = prepareInclude(options.include);
            }
            return dataProvider.SSOUser.findPage(options);
        }).catch(function (error) {
            return errors.handleAPIError(error, 'You do not have permission to browse users.');
        });
    },

    /**
     * ### Edit
     * @param {User} object the user details to edit
     * @param {{id, context}} options
     * @returns {Promise(User)}
     */
    edit: function edit(object, options) {
        var editOperation;
        if (options.id === 'me' && options.context && options.context.user) {
            options.id = options.context.user;
        }

        if (options.include) {
            options.include = prepareInclude(options.include);
        }

        var data = object.ssoUsers[0];
        var putInRole = null;

        // If they are approved, make srue to set the right role
        if(data.status === "approved" && data.approved_role) {
            putInRole = data.approved_role;
        }
        var status = data.status;

        return utils.checkObject(object, docName, options.id).then(function (data) {
            // Edit operation
            editOperation = function () {
                return dataProvider.SSOUser.edit(data.ssoUsers[0], options)
                    .then(function (result) {
                        if (result) {
                            if(putInRole) {
                                return dataProvider.Role.forge({"name": putInRole}).fetch().then(function(role){
                                    return result.getUser().then(function(user){
                                        user = user.toJSON();                                        
                                        user.roles = [role];
                                        return dataProvider.User.edit(user, { include: [ 'roles' ], id: user.id, context: { user: options.context.user } }).then(function(user){
                                            var subject = config.notifications.access_reader.subject;
                                            var message = config.notifications.access_reader.copy;
                                            if(putInRole === "Author") {
                                                subject = config.notifications.access_writer.subject;
                                                message = config.notifications.access_writer.copy;
                                            }
                                            return sendEmail(user.get("email"), subject, message).then(function(){
                                                return {ssoUsers: [result.toJSON(options)], users: user ? [user.toJSON({"withRelated":"roles"})] : null};
                                            });
                                        });
                                    });
                                });
                            }

                            if(status === "rejected") {
                                var subject = config.notifications.access_revoked.subject;
                                var message = config.notifications.access_revoked.copy;
                                return sendEmail(result.get("email"), subject, message).then(function(){
                                    return {ssoUsers: [result.toJSON(options)]};
                                });
                            } else {
                                return {ssoUsers: [result.toJSON(options)]};
                            }
                        }

                        return Promise.reject(new errors.NotFoundError('SSOUser not found.'));
                    });
            };

            // Check permissions
            return canThis(options.context).edit.user(options.id).then(function () {
                return editOperation();
            });
        }).catch(function (error) {
            return errors.handleAPIError(error, 'You do not have permission to edit this user');
        });
    },
};

module.exports = users;
