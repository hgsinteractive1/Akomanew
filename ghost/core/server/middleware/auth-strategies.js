var passport = require('passport'),
    social = require('../social'),
    BearerStrategy = require('passport-http-bearer').Strategy,
    ClientPasswordStrategy = require('passport-oauth2-client-password').Strategy,
    TwitterStrategy = require('passport-twitter').Strategy,
    FacebookStrategy  = require('passport-facebook').Strategy,
    models  = require('../models');

// Passport session setup.
passport.serializeUser(function(user, done) {
  done(null, user);
});
passport.deserializeUser(function(obj, done) {
  models.SSOUser.forge({id:obj.id}).fetch().then(function(user){ done(null, user); });
});

function SocialStrategies(opts) {
    opts = opts || {};
    this.url = opts.url || null;
}

SocialStrategies.prototype.init = function () {

  // Use the TwitterStrategy within Passport.
  passport.use(new TwitterStrategy({
      consumerKey: social.twitter.consumer_key,
      consumerSecret: social.twitter.consumer_secret,
      callbackURL: social.twitter.callback
    },
    function(token, tokenSecret, profile, done) {
      process.nextTick(function () {
//        console.log ("Twitter user profile for: " + profile.displayName);
        return models.SSOUser.getWithNetworkAndSocialId("twitter", profile.id).then(function(sso_user){
           sso_user.set("image_url", profile.photos[0].value.replace("_normal.", "."));
            return sso_user.save(null, {context:{internal:true}}).then(function(){
              // check if the user connected to this sso user has an image
              sso_user.getUser().then(function(user){
                if(!user) {
                  return done(null, sso_user);
                } else {
                  user.set("image", sso_user.get("image_url"));
                  user.save(null, {context:{internal:true}}).then(function(){
                    return done(null, sso_user);
                  });
                }
              });
            });
        });
      });
    }
  ));


  // Use the FacebookStrategy within Passport
  passport.use(new FacebookStrategy({
      clientID: social.facebook.client_id,
      clientSecret: social.facebook.client_secret,
      callbackURL: social.facebook.callback,
      enableProof: false
    },
    function(token, tokenSecret, profile, done) {
      process.nextTick(function () {
//        console.log ("Facebook user profile for: " + profile.displayName);
        return models.SSOUser.getWithNetworkAndSocialId("facebook", profile.id).then(function(sso_user){
          if(!sso_user.get("image_url")) {
            sso_user.set("image_url", "https://graph.facebook.com/"+profile.id+"/picture?width=180&height=180");
            return sso_user.save(null, {context:{internal:true}}).then(function(){
              // check if the user connected to this sso user has an image
              sso_user.getUser().then(function(user){
                if(!user) {
                  return done(null, sso_user);
                } else {
                  user.set("image", sso_user.get("image_url"));
                  user.save(null, {context:{internal:true}}).then(function(){
                    return done(null, sso_user);
                  });
                }
              });
            });
          } else {
            return done(null, sso_user);
          }
        });
        
      });
    }  
  ));

};


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
//      console.log("CLIENT ID", clientId);
        models.Client.forge({slug: clientId})
        .fetch()
        .then(function (model) {
            if (model) {
                var client = model.toJSON();
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


module.exports = new SocialStrategies();