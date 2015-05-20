var frontend    = require('../controllers/frontend'),
    config      = require('../config'),
    express     = require('express'),
    passport    = require('passport'),
    utils       = require('../utils'),

    frontendRoutes;

frontendRoutes = function () {
    var router = express.Router(),
        subdir = config.paths.subdir;


    router.get('*', function redirect(req, res, next) {
console.log("** in router, req.url=" + req.url);
        // set seession here
        next();
    });


    router.get('*', function redirect(req, res, next) {
        if(!/^\/auth\/twitter/ig.test(req.url)) {
            req.session.lastUrl = req.url;
        }
        console.log("LAST URLs: ", req.url, req.session.lastUrl);
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

    // SSO Twitter filters
    router.get('/auth/twitter', passport.authenticate('twitter'));
    router.get('/auth/twitter/callback', passport.authenticate('twitter'),
      function(req, res) {        
          res.redirect(req.session.lastUrl);
      });

    // Default
    router.get('/' + config.routeKeywords.page + '/:page/', frontend.homepage);
    router.get('/', frontend.homepage);
    router.get('*', frontend.single);

    return router;
};

module.exports = frontendRoutes;
