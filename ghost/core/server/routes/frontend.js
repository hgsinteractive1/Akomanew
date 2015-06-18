var frontend    = require('../controllers/frontend'),
    config      = require('../config'),
    express     = require('express'),
    passport    = require('passport'),
    utils       = require('../utils'),
    middleware = require("../middleware/middleware"),

    frontendRoutes;

frontendRoutes = function () {
    var router = express.Router(),
        subdir = config.paths.subdir;

    router.get('*', function redirect(req, res, next) {
        if(
            !/^\/auth\/(twitter|facebook|last|user\/new|signout)/ig.test(req.url) && 
            !/^\/user\/update/ig.test(req.url) && 
            !/^\/images/ig.test(req.url)
        ) {
            req.session.lastUrl = req.url;
        }
        // set seession here
        next();
    });


    // ### Admin routes
    router.get(/^\/(logout|signout)\/$/, function redirect(req, res) {
        /*jslint unparam:true*/
        res.set({'Cache-Control': 'public, max-age=' + utils.ONE_YEAR_S});
        res.redirect(301, subdir + '/ghost/signout/');
    });
    router.get(/^\/signup\/$/, function redirect(req, res) {
        /*jslint unparam:true*/
        res.set({'Cache-Control': 'public, max-age=' + utils.ONE_YEAR_S});
        res.redirect(301, subdir + '/ghost/signup/');
    });

    // redirect to /ghost and let that do the authentication to prevent redirects to /ghost//admin etc.
    router.get(/^\/((ghost-admin|admin|wp-admin|dashboard|signin|login)\/?)$/, function (req, res) {
        /*jslint unparam:true*/
        res.redirect(subdir + '/ghost/');
    });

    // ### Frontend routes
    router.get('/rss/', frontend.rss);
    router.get('/rss/:page/', frontend.rss);
    router.get('/feed/', function redirect(req, res) {
        /*jshint unused:true*/
        res.set({'Cache-Control': 'public, max-age=' + utils.ONE_YEAR_S});
        res.redirect(301, subdir + '/rss/');
    });


    // Tags
    router.get('/' + config.routeKeywords.tag + '/:slug/rss/', frontend.rss);
    router.get('/' + config.routeKeywords.tag + '/:slug/rss/:page/', frontend.rss);
    router.get('/' + config.routeKeywords.tag + '/:slug/' + config.routeKeywords.page + '/:page/', frontend.tag);
    router.get('/' + config.routeKeywords.tag + '/:slug/', frontend.tag);

    // Authors
    router.get('/' + config.routeKeywords.author + '/:slug/rss/', frontend.rss);
    router.get('/' + config.routeKeywords.author + '/:slug/rss/:page/', frontend.rss);
    router.get('/' + config.routeKeywords.author + '/:slug/' + config.routeKeywords.page + '/:page/', frontend.author);
    router.get('/' + config.routeKeywords.author + '/:slug/', frontend.author);

    // Dynamic filters
    router.get('/latest', frontend.latest);
    router.get('/latest/' + config.routeKeywords.page + '/:page/', frontend.latest);
    router.get('/popular', frontend.popular);
    router.get('/popular/' + config.routeKeywords.page + '/:page/', frontend.popular);

    // SSO Social filters
    router.get('/auth/twitter', passport.authenticate('twitter'));
    router.get('/auth/twitter/callback', passport.authenticate('twitter'), frontend.social_callback);
    router.get('/auth/facebook', passport.authenticate('facebook'));
    router.get('/auth/facebook/callback', passport.authenticate('facebook'), frontend.social_callback);

    router.post('/auth/user/new', frontend.new_user);
    router.get('/auth/last', function(req, res) {        
        res.redirect(req.session.lastUrl);
    });
    router.get('/auth/signout', function(req, res) {
        req.session.destroy();
        res.redirect("/ghost/signout");
    });
    router.post('/auth/user/signin', 
        frontend.signin,
        middleware.spamSigninPrevention,
        middleware.addClientSecret,
        middleware.authenticateClient,
        middleware.generateAccessToken
    );

    // Updating user profile info
    router.post("/user/update", frontend.user_update);

    // Liek a post
    router.get("/post/like/:post_id/", frontend.like_post);
    router.get("/post/unlike/:post_id/", frontend.unlike_post);

    // Default
    router.get('/' + config.routeKeywords.page + '/:page/', frontend.homepage);
    router.get('/', frontend.homepage);
    router.get('*', frontend.single);

    return router;
};

module.exports = frontendRoutes;
