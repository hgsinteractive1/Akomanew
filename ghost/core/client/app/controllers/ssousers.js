import Ember from 'ember';
import PaginationControllerMixin from 'ghost/mixins/pagination-controller';

function publishedAtCompare(item1, item2) {
    var published1 = item1.get('published_at'),
        published2 = item2.get('published_at');

    if (!published1 && !published2) {
        return 0;
    }

    if (!published1 && published2) {
        return -1;
    }

    if (!published2 && published1) {
        return 1;
    }

    return Ember.compare(published1.valueOf(), published2.valueOf());
}

var SSOUsersController = Ember.ArrayController.extend(PaginationControllerMixin, {

    currentFilter: "inactive",

    actions: {
        goToActive: function(){
            this.set("currentFilter", "active");
        },
        goToInactive: function(){
            this.set("currentFilter", "inactive");
        }
    },
    currentFilterIsActive: Ember.computed('currentFilter', function () {
        return this.get("currentFilter") === "active";
    }),
    currentFilterIsInactive: Ember.computed('currentFilter', function () {
        return this.get("currentFilter") === "inactive";
    }),

    userCounts: Ember.computed('@each', '@each.isActive', '@each.role', function(){
        var inactiveCount = 0;
        var activeCount = 0;
        var unactivated = 0;
        var total = 0;
        this.forEach(function(i){
            total++;
            if(i.get("role") === "New") {
                unactivated++;
            } else if(i.get("isActive")) {
                activeCount++;
            } else {
                inactiveCount++;
            }
        })
        return {"total":total, "inactive":inactiveCount, "active":activeCount, "unactivated": unactivated};
    }),

    // override Ember.SortableMixin
    //
    // this function will keep the posts list sorted when loading individual/bulk
    // models from the server, even if records in between haven't been loaded.
    // this can happen when reloading the page on the Editor or PostsPost routes.
    //
    // a custom sort function is needed in order to sort the posts list the same way the server would:
    //     status: ASC
    //     published_at: DESC
    //     updated_at: DESC
    //     id: DESC
    orderBy: function (item1, item2) {
        var updated1 = item1.get('updated_at'),
            updated2 = item2.get('updated_at'),
            idResult,
            statusResult,
            updatedAtResult,
            publishedAtResult;

        // when `updated_at` is undefined, the model is still
        // being written to with the results from the server
        if (item1.get('isNew') || !updated1) {
            return -1;
        }

        if (item2.get('isNew') || !updated2) {
            return 1;
        }

        idResult = Ember.compare(parseInt(item1.get('id')), parseInt(item2.get('id')));
        statusResult = Ember.compare(item1.get('status'), item2.get('status'));
        updatedAtResult = Ember.compare(updated1.valueOf(), updated2.valueOf());
        publishedAtResult = publishedAtCompare(item1, item2);

        if (statusResult === 0) {
            if (publishedAtResult === 0) {
                if (updatedAtResult === 0) {
                    // This should be DESC
                    return idResult * -1;
                }
                // This should be DESC
                return updatedAtResult * -1;
            }
            // This should be DESC
            return publishedAtResult * -1;
        }

        return statusResult;
    },

    init: function () {
        // let the PaginationControllerMixin know what type of model we will be paginating
        // this is necessary because we do not have access to the model inside the Controller::init method
        this._super({modelType: 'ssouser'});
    }
});

export default SSOUsersController;
