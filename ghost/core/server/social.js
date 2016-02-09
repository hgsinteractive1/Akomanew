var _          = require('lodash'),
    Promise    = require('bluebird'),
    config     = require('./config');

function SSOSocial(opts) {
    opts = opts || {};
    this.url = opts.url || null;
}

// ## SSO Social keys setup
// *This promise should always resolve to avoid halting Ghost::init*.
SSOSocial.prototype.init = function () {
    var self = this;

    self.url = config.url;

    if (config.social && config.social.twitter) {
        self.twitter = {};
        self.initTwitter();
    }
    if (config.social && config.social.facebook) {
        self.facebook = {};
        self.initFacebook();
    }

    return Promise.resolve();
};

SSOSocial.prototype.initTwitter = function () {
    this.twitter.consumer_key = config.social.twitter.consumer_key || "/t";
    this.twitter.consumer_secret = config.social.twitter.consumer_secret || "/t";
    this.twitter.callback = config.url + config.social.twitter.callback || "/t";
//    console.log("******** ******** twitter.callback = " + this.twitter.callback);
};

SSOSocial.prototype.initFacebook = function () {
    this.facebook.client_id = config.social.facebook.client_id || "/f";
    this.facebook.client_secret = config.social.facebook.client_secret || "/f";
    this.facebook.callback = config.url + config.social.facebook.callback || "/f";
//    console.log("******** ******** facebook.callback = " + this.facebook.callback);
};

module.exports = new SSOSocial();