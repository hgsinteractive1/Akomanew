import Ember from 'ember';
var PostController = Ember.Controller.extend({
    needs: ['post-settings-menu', 'posts'],
    isPublished: Ember.computed.equal('model.status', 'published'),
    classNameBindings: ['model.featured'],

    authorName: Ember.computed('model.author.name', 'model.author.email', function () {
        return this.get('model.author.name') || this.get('model.author.email');
    }),

    authorAvatar: Ember.computed('model.author.image', function () {
        return this.get('model.author.image') || this.get('ghostPaths.url').asset('/shared/img/user-image.png');
    }),

    authorAvatarBackground: Ember.computed('authorAvatar', function () {
        return `background-image: url(${this.get('authorAvatar')})`.htmlSafe();
    }),

    canFeature: Ember.computed('controllers.posts.selectedFilter', function () {
        return this.get('controllers.posts.selectedFilter') !== "All";
    }),

    isFeaturedInCurrentTag: Ember.computed('model', 'model.tag_positions', 'controllers.posts.selectedFilter', function () {
        return this.get("model").isFeaturedInTag(this.get('controllers.posts.selectedFilter'));
    }),

    actions: {
        feature: function(data){
            // Pass the event on to the posts controller, since it is needed to
            // check all the other posts and access the current filter.
            this.get("controllers.posts").send("feature", this.get("model"));
        },
        unfeature: function(data){
            // Pass the event on to the posts controller, since it is needed to
            // check all the other posts and access the current filter.
            this.get("controllers.posts").send("unfeature", this.get("model"));
        },
        togglePublish: function(){
            var psmController = this.get('controllers.post-settings-menu');
            var options = {};
            var promise ;
            var self = this;

            var prevStatus = this.get("model.status");
            if(prevStatus === "published"){
                this.get("model").set("status", "draft");
            } else {
                this.get("model").set("status", "published");
            }

            promise = Ember.RSVP.resolve(psmController.get('lastPromise')).then(function () {
                return self.get('model').save(options).then(function (model) {
                    // if (!options.silent) {
                    //     self.showSaveNotification(prevStatus, model.get('status'), false);
                    // }

                    return model;
                });
            }).catch(function (errors) {
                if (!options.silent) {
                    console.log(errors);
                }

                self.set('model.status', prevStatus);

                return self.get('model');
            });

            psmController.set('lastPromise', promise);
        },
        showPostContent: function () {
            this.transitionToRoute('posts.post', this.get('model'));
        }
    }
});

export default PostController;
