// # Tags Helper
// Usage: `{{tags}}`, `{{tags separator=' - '}}`
//
// Returns a string of the tags on the post.
// By default, tags are separated by commas.
//
// Note that the standard {{#each tags}} implementation is unaffected by this helper

var hbs             = require('express-hbs'),
    _               = require('lodash'),
    config          = require('../config'),
    utils           = require('./utils'),
    dataProvider = require('../models'),
    tags;

tags = function (options) {
    options = options || {};
    options.hash = options.hash || {};

    var autolink = options.hash && _.isString(options.hash.autolink) && options.hash.autolink === 'false' ? false : true,
        separator = options.hash && _.isString(options.hash.separator) ? options.hash.separator : ', ',
        prefix = options.hash && _.isString(options.hash.prefix) ? options.hash.prefix : '',
        suffix = options.hash && _.isString(options.hash.suffix) ? options.hash.suffix : '',
        css_class = options.hash && _.isString(options.hash.css_class) ? options.hash.css_class : '',
        output = '';

    function createTagList(tags) {
        var tagNames = _.pluck(tags, 'name');

        if (autolink) {
            return _.map(tags, function (tag) {
                return utils.linkTemplateWithClass({
                    url: config.urlFor('tag', {tag: tag}),
                    text: _.escape(tag.name),
                    css_class:_.escape(css_class)
                });
            }).join(separator);
        }
        return _.escape(tagNames.join(separator));
    }

    if (this.tags && this.tags.length) {
        output = prefix + createTagList(this.tags) + suffix;
    }
    return new hbs.handlebars.SafeString(output);
};

module.exports = tags;
