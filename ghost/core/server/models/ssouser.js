var ghostBookshelf = require('./base'),
    uuid       = require('node-uuid'),
    config      = require('../config'),
    SSOUser;

SSOUser = ghostBookshelf.Model.extend({

    tableName: 'sso_users',

    initialize: function () {
        ghostBookshelf.Model.prototype.initialize.apply(this, arguments);
        var self = this;
        this.isNewUser = function(){ return self.get("status") === "new"; };
        this.isPendingUser = function(){ return self.get("status") === "pending"; };
        this.isAcceptedUser = function(){ return self.get("status") === "approved"; };
        this.getPassword = function(){ return config.salt + self.get("social_id") + self.get("network"); };
    },

    defaults: function () {
        return {
            uuid: uuid.v4(),
            status: "new"
        };
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
    }
});


module.exports = {
    SSOUser: ghostBookshelf.model('SSOUser', SSOUser)
};