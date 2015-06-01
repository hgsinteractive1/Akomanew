var passport = require('passport'),
    config = require('../config'),
    BearerStrategy = require('passport-http-bearer').Strategy,
    ClientPasswordStrategy = require('passport-oauth2-client-password').Strategy,
    TwitterStrategy = require('passport-twitter').Strategy,
    FacebookStrategy  = require('passport-facebook').Strategy,
    models  = require('../models');

// THIS NEEDS to be refactored into config.js in ghost root dir and set
// Depending on environment.
// Override the HOST value with the host we want SSO provider to call back
// e.g. http://b.akomanet.com
// e.g. http://127.0.0.1 -- NOT localhost as Twitter barfs at it
// So it seems FB does not like any localhost variants, including the IP address. have to stick with an alias.
// var APP_HOST_INTEGRATE = "http://b.akomanet.com";
var APP_HOST_INTEGRATE = "http://lgr.akomanet.com:2368";

var TWITTER_CONSUMER_KEY = "NRfJBexESA1fGKjXv9OidwLVd";
var TWITTER_CONSUMER_SECRET = "MAYbbLLoiG2YSA0Tva6h4fPCs9TNAVJMxTeiwmXjIgcGK62A3F";
var TWITTER_CALLBACK = APP_HOST_INTEGRATE + "/auth/twitter/callback";

// FB auth API Credentials
var FB_CLIENT_ID = "802215216531320";
var FB_CLIENT_SECRET = "ff50f138c26dd2992027ca4c506ef0fa";
var FB_CALLBACK = APP_HOST_INTEGRATE + "/auth/facebook/callback";

//console.log("********** config = ", config);

// Passport session setup.
passport.serializeUser(function(user, done) {
  done(null, user);
});
passport.deserializeUser(function(obj, done) {
  console.log("*********** DES", obj);
  models.SSOUser.forge({id:obj.id}).fetch().then(function(user){ console.log("RETETETETET", user); done(null, user); });
});

console.log("*** Passport Strategies initialized in auth-strategies.js");

// Use the TwitterStrategy within Passport.
passport.use(new TwitterStrategy({
    consumerKey: TWITTER_CONSUMER_KEY,
    consumerSecret: TWITTER_CONSUMER_SECRET,
    callbackURL: TWITTER_CALLBACK
  },
  function(token, tokenSecret, profile, done) {
    process.nextTick(function () {
      console.log ("Twitter user profile for: " + profile.displayName);
      return models.SSOUser.getWithNetworkAndSocialId("twitter", profile.id).then(function(sso_user){
        return done(null, sso_user);
      });
    });
  }
));

// Use the FacebookStrategy within Passport
// Use the FacebookStrategy within Passport.
passport.use(new FacebookStrategy({
    clientID: FB_CLIENT_ID,
    clientSecret: FB_CLIENT_SECRET,
    callbackURL: FB_CALLBACK,
    enableProof: false
  },
  function(token, tokenSecret, profile, done) {
    process.nextTick(function () {
      console.log ("Facebook user profile for: " + profile.displayName);

      return models.SSOUser.getWithNetworkAndSocialId("facebook", profile.id).then(function(sso_user){
        return done(null, sso_user);
      });
      
    });
  }  
));


/**
 * ClientPasswordStrategy
 *
 * This strategy is used to authenticate registered OAuth clients.  It is
 * employed to protect the `token` endpoint, which consumers use to obtain
 * access tokens.  The OAuth 2.0 specification suggests that clients use the
 * HTTP Basic scheme to authenticate (not implemented yet).

 * Use of the client password strategy is implemented to support ember-simple-auth.
 */
passport.use(new ClientPasswordStrategy(
    function (clientId, clientSecret, done) {
      console.log("CLIENT ID", clientId);
        models.Client.forge({slug: clientId})
        .fetch()
        .then(function (model) {
            if (model) {
                var client = model.toJSON();

// console.log ("** Client Strategy, Secret: " + clientSecret);
//console.trace();
// console.log ("** Client Strategy, model: " + JSON.stringify(client, null, 2));

                if (client.secret === clientSecret) {
                    return done(null, client);
                }
            }
            return done(null, false);
        });
    }
));

/**
 * BearerStrategy
 *
 * This strategy is used to authenticate users based on an access token (aka a
 * bearer token).  The user must have previously authorized a client
 * application, which is issued an access token to make requests on behalf of
 * the authorizing user.
 */
passport.use(new BearerStrategy(
    function (accessToken, done) {
        models.Accesstoken.forge({token: accessToken})
        .fetch()
        .then(function (model) {
            if (model) {
                var token = model.toJSON();
                if (token.expires > Date.now()) {
                    models.User.forge({id: token.user_id})
                    .fetch()
                    .then(function (model) {
                        if (model) {
                            var user = model.toJSON(),
                                info = {scope: '*'};
                            return done(null, {id: user.id}, info);
                        }
                        return done(null, false);
                    });
                } else {
                    return done(null, false);
                }
            } else {
                return done(null, false);
            }
        });
    }
));
