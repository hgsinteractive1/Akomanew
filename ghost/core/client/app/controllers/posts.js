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

var PostsController = Ember.ArrayController.extend(PaginationControllerMixin, {
    // See PostsRoute's shortcuts
    postListFocused: Ember.computed.equal('keyboardFocus', 'postList'),
    postContentFocused: Ember.computed.equal('keyboardFocus', 'postContent'),
    // this will cause the list to re-sort when any of these properties change on any of the models
    sortProperties: ['status', 'published_at', 'updated_at', 'tag_positions'],
    filterOptions: [
        {"name":"All", "slug":"All"}, 
        {"name":"Faves", "slug":"faves"}, 
        {"name":"Live", "slug":"live"}, 
        {"name":"Think", "slug":"think"}, 
        {"name":"Rant", "slug":"rant"}, 
        {"name":"Learn", "slug":"learn"}
    ],
    selectedFilter: "All",
    selectedFilterIsSortable: false,
    
    actions: {
        unfeature: function(post){
            var filter = this.get("selectedFilter");
            var posts = this.get("arrangedContent");
            
            for(var i = 0 ; i < posts.length ; i++) {
                var tag_positions = posts[i].get("data.tag_positions");
                if(!tag_positions) {
                    tag_positions = {};
                }
                tag_positions[filter] = i;
                posts[i].set("data.tag_positions", tag_positions);
            }

            for(var i = 0 ; i < posts.length ; i++) {
                posts[i].set("tag_positions", posts[i].get("data.tag_positions"));
                console.log(posts[i].get("id"), posts[i].get("data.tag_positions"));
                posts[i].save(posts[i].get("data.tag_positions"));
            }
        },
        feature: function(post){
            var filter = this.get("selectedFilter");
            var posts = this.get("arrangedContent");

            for(var i = 0 ; i < posts.length ; i++) {
                var tag_positions = posts[i].get("data.tag_positions");
                if(!tag_positions) {
                    tag_positions = {};
                }
                if(posts[i].get("id") === post.get("id")) {
                    // Move this post to -9999999
                    tag_positions[filter] = -9999999;
                } else {
                    tag_positions[filter] = i;
                }
                posts[i].set("data.tag_positions", tag_positions);
            }

            for(var i = 0 ; i < posts.length ; i++) {
                posts[i].set("tag_positions", posts[i].get("data.tag_positions"));
                console.log(posts[i].get("id"), posts[i].get("data.tag_positions"));
                posts[i].save(posts[i].get("data.tag_positions"));
            }
        },
        movePostUp: function(post){
            var filter = this.get("selectedFilter");
            var posts = this.get("arrangedContent");
            for(var i = 0 ; i < posts.length ; i++) {
                var tag_positions = posts[i].get("data.tag_positions");
                if(!tag_positions) {
                    tag_positions = {};
                }
                if(posts[i].get("id") === post.get("id")) {
                    // Move this post up
                    tag_positions[filter] = Math.max(0, i - 1);

                    // Swap with the post above
                    if(i > 0) {
                        var swap_tag_positions = posts[i-1].get("data.tag_positions");
                        swap_tag_positions[filter] = i;
                        posts[i-1].set("data.tag_positions", swap_tag_positions);
                    }
                } else {
                    tag_positions[filter] = i;
                }
                posts[i].set("data.tag_positions", tag_positions);
            }

            for(var i = 0 ; i < posts.length ; i++) {
                posts[i].set("tag_positions", posts[i].get("data.tag_positions"));
                console.log(posts[i].get("id"), posts[i].get("data.tag_positions"));
                posts[i].save(posts[i].get("data.tag_positions"));
            }

        },
        movePostDown: function(post){
            var filter = this.get("selectedFilter");
            var posts = this.get("arrangedContent");
            for(var i = posts.length - 1; i >= 0 ; i--) {
                var tag_positions = posts[i].get("data.tag_positions");
                if(posts[i].get("id") === post.get("id")) {
                    // Move this post up
                    tag_positions[filter] = Math.min(posts.length - 1, i + 1);

                    // Swap with the post above
                    if(i < posts.length) {
                        var swap_tag_positions = posts[i+1].get("data.tag_positions");
                        swap_tag_positions[filter] = i;
                        posts[i+1].set("data.tag_positions", swap_tag_positions);
                    }
                } else {
                    tag_positions[filter] = i;
                }
                posts[i].set("data.tag_positions", tag_positions);
            }

            for(var i = 0 ; i < posts.length ; i++) {
                posts[i].set("tag_positions", posts[i].get("data.tag_positions"));
                posts[i].save(posts[i].get("data.tag_positions"));
            }
        }
    },

    watchFilter: function() {  
        this.get("target").send("filter", this.get("selectedFilter"));
        this.set("selectedFilterIsSortable", this.get("selectedFilter") === "faves");
    }.observes('selectedFilter'),

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
            
        if(item1.positionInTag(this.get("selectedFilter")) > item2.positionInTag(this.get("selectedFilter"))){ 
            return 1;
        } else if(item1.positionInTag(this.get("selectedFilter")) < item2.positionInTag(this.get("selectedFilter"))) {
            return -1;
        }

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
        this._super({modelType: 'post'});
    }
});

export default PostsController;
