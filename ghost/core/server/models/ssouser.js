var ghostBookshelf = require('./base'),
    uuid       = require('node-uuid'),
    SSOUser;

SSOUser = ghostBookshelf.Model.extend({

    tableName: 'sso_users',

    initialize: function () {
        ghostBookshelf.Model.prototype.initialize.apply(this, arguments);
        var self = this;
        this.isNewUser = function(){ return self.get("status") === "new"; };
        this.isPendingUser = function(){ return self.get("status") === "pending"; };
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
        });
    }
});


module.exports = {
    SSOUser: ghostBookshelf.model('SSOUser', SSOUser)
};