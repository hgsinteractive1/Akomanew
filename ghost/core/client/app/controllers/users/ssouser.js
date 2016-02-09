import Ember from 'ember';
var SSOUserController = Ember.Controller.extend({
    needs: ['ssousers'],
    isActive: Ember.computed.equal('model.status', 'approved'),
    classNameBindings: ['model.status', 'model.user'],
    
    showUnderDraftsFilter: Ember.computed('model.isActive', 'model.user', 'model.role', 'controllers.ssousers.currentFilter', function () {
        if(this.get("model.role") === "New") {
            return false;
        }
        var isActive = this.get("model.isActive");
        var currentFilter = this.get("controllers.ssousers.currentFilter");
        if(currentFilter === "inactive") {
            return !isActive;
        } else {
            return isActive;
        }
    }),

    actions: {
        "approveReader":function(model){
            model.set("status", "approved");
            model.set("approved_role", "Reader");
            return model.save().catch(function (errors) {
                console.log("ERRORS", errors);
                model.rollback();
            });
        },
        "approveAuthor":function(model){
            model.set("status", "approved");
            model.set("approved_role", "Author");
            return model.save().catch(function (errors) {
                console.log("ERRORS", errors);
                model.rollback();
            });
        },
        "reject":function(model){
            model.set("status", "rejected");
            return model.save().catch(function (errors) {
                console.log("ERRORS", errors);
                model.rollback();
            });
        }
    }
});

export default SSOUserController;
