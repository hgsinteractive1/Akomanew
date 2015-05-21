import Ember from 'ember';
import AuthenticatedRoute from 'ghost/routes/authenticated';
import styleBody from 'ghost/mixins/style-body';
import loadingIndicator from 'ghost/mixins/loading-indicator';
import PaginationRouteMixin from 'ghost/mixins/pagination-route';

var paginationSettings,
    PostsRoute;

paginationSettings = {
    status: 'all',
    staticPages: 'all',
    page: 1
};
var tagName = "All";

PostsRoute = AuthenticatedRoute.extend(styleBody, loadingIndicator, PaginationRouteMixin, {
    titleToken: 'Content',

    classNames: ['manage'],

    model: function () {
        var self = this;
        return this.get('session.user').then(function (user) {
            if (user.get('isAuthor')) {
                paginationSettings.author = user.get('slug');
            }

            // using `.filter` allows the template to auto-update when new models are pulled in from the server.
            // we just need to 'return true' to allow all models by default.
            var t = self.store.filter('post', paginationSettings, function (post) {
                if (user.get('isAuthor')) {
                    return post.isAuthoredByUser(user);
                }

                return true;
            });

            return t;
        });
    },

    setupController: function (controller, model) {
        this._super(controller, model);
        this.setupPagination(paginationSettings);
        paginationSettings.limit = 1000;
    }
});

export default PostsRoute;
