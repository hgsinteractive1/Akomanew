import Ember from 'ember';
var PostController = Ember.Controller.extend({
    needs: ['post-settings-menu'],
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

    actions: {
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
        delete: function(){
            console.log("Delete post...");
        },
        toggleFeatured: function () {
            var options = {disableNProgress: true},
                self = this;

            this.toggleProperty('model.featured');
            this.get('model').save(options).catch(function (errors) {
                self.notifications.showErrors(errors);
            });
        },
        showPostContent: function () {
            this.transitionToRoute('posts.post', this.get('model'));
        }
    }
});

export default PostController;
