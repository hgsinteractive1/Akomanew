var express           =     require('express')
  , passport          =     require('passport')
  , util              =     require('util')
  , TwitterStrategy   =     require('passport-twitter').Strategy
  , FacebookStrategy  =     require('passport-facebook').Strategy
  , session           =     require('express-session')
  , cookieParser      =     require('cookie-parser')
  , bodyParser        =     require('body-parser')
  , app               =     express();

// Override the HOST value with the host we want SSO provider to call back
// e.g. http://b.akomanet.com
// e.g. http://127.0.0.1 -- NOT localhost as Twitter barfs at it
var APP_HOST_INTEGRATE = "http://lgr.akomanet.com:8081";

var TWITTER_CONSUMER_KEY = "NRfJBexESA1fGKjXv9OidwLVd";
var TWITTER_CONSUMER_SECRET = "MAYbbLLoiG2YSA0Tva6h4fPCs9TNAVJMxTeiwmXjIgcGK62A3F";
var TWITTER_CALLBACK = APP_HOST_INTEGRATE + "/auth/twitter/callback";

// FB auth API Credentials
var FB_CLIENT_ID = "802215216531320";
var FB_CLIENT_SECRET = "ff50f138c26dd2992027ca4c506ef0fa";
var FB_CALLBACK = APP_HOST_INTEGRATE + "/auth/facebook/callback";


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
      return done(null, profile);
    });
  }  
));


app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({ secret: 'keyboard cat', key: 'sid'}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
  res.render('index', { user: req.user });
});

app.get('/account', ensureAuthenticated, function(req, res){
  res.render('account', { user: req.user });
});

app.get('/auth/twitter', passport.authenticate('twitter'));
app.get('/auth/facebook', passport.authenticate('facebook'));


app.get('/auth/twitter/callback',
  passport.authenticate('twitter', { successRedirect : '/account', failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  });

app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { successRedirect : '/account', failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  });

app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});


function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login')
}

app.listen(5000);
