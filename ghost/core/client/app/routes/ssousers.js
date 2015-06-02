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
            if (!user.get('isAdmin')) {
                return self.transitionTo("drafts");
            }

            return self.store.find('sso_user', {limit: 'all'}).then(function (users) {
                return users;
            });
        });
    },

    setupController: function (controller, model) {
        this._super(controller, model);
        this.setupPagination(paginationSettings);
        paginationSettings.limit = 1000;
    }
});

export default PostsRoute;
