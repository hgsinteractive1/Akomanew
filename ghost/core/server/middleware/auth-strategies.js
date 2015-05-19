var passport = require('passport'),
    BearerStrategy = require('passport-http-bearer').Strategy,
    ClientPasswordStrategy = require('passport-oauth2-client-password').Strategy,
    TwitterStrategy = require('passport-twitter').Strategy,
    models  = require('../models');

// THIS NEEDS to be refactored into config.js in ghost root dir and set
// Depending on environment.
// Override the HOST value with the host we want SSO provider to call back
// e.g. http://b.akomanet.com
// e.g. http://127.0.0.1 -- NOT localhost as Twitter barfs at it
var APP_HOST_INTEGRATE = "http://lgr.akomanet.com:5000";

var TWITTER_CONSUMER_KEY = "NRfJBexESA1fGKjXv9OidwLVd";
var TWITTER_CONSUMER_SECRET = "MAYbbLLoiG2YSA0Tva6h4fPCs9TNAVJMxTeiwmXjIgcGK62A3F";
var TWITTER_CALLBACK = APP_HOST_INTEGRATE + "/auth/twitter/callback";



// Passport session setup.
passport.serializeUser(function(user, done) {
  done(null, user);
});
passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

// Use the TwitterStrategy within Passport.
passport.use(new TwitterStrategy({
    consumerKey: TWITTER_CONSUMER_KEY,
    consumerSecret: TWITTER_CONSUMER_SECRET,
    callbackURL: TWITTER_CALLBACK
  },
  function(token, tokenSecret, profile, done) {
    process.nextTick(function () {

//      console.log ("Twitter user profile: " + JSON.stringify(profile, null, 2));
      console.log ("Twitter user profile for: " + profile.username);

      // MySQL user association logic can tie in with Twitter realm & profile ID
      // The user's Twitter profile can now be associated with a user database record,
      // Return complete user profile object instead of Twitter.

      return done(null, profile);
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
        models.Client.forge({slug: clientId})
        .fetch()
        .then(function (model) {
            if (model) {
                var client = model.toJSON();

//console.log ("** Client Strategy, Secret: " + clientSecret);
//console.trace();
//console.log ("** Client Strategy, model: " + JSON.stringify(client, null, 2));

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
