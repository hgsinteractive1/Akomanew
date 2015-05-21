import Ember from 'ember';
import DS from 'ember-data';
import ValidationEngine from 'ghost/mixins/validation-engine';
import NProgressSaveMixin from 'ghost/mixins/nprogress-save';

var Post = DS.Model.extend(NProgressSaveMixin, ValidationEngine, {
    validationType: 'post',

    uuid: DS.attr('string'),
    title: DS.attr('string', {defaultValue: ''}),
    slug: DS.attr('string'),
    markdown: DS.attr('string', {defaultValue: ''}),
    html: DS.attr('string'),
    image: DS.attr('string'),
    featured: DS.attr('boolean', {defaultValue: false}),
    page: DS.attr('boolean', {defaultValue: false}),
    status: DS.attr('string', {defaultValue: 'draft'}),
    language: DS.attr('string', {defaultValue: 'en_US'}),
    meta_title: DS.attr('string'),
    meta_description: DS.attr('string'),
    meta_keywords: DS.attr('string'),
    abstract: DS.attr('string'),
    author: DS.belongsTo('user',  {async: true}),
    author_id: DS.attr('number'),
    updated_at: DS.attr('moment-date'),
    updated_by: DS.attr(),
    published_at: DS.attr('moment-date'),
    published_by: DS.belongsTo('user', {async: true}),
    created_at: DS.attr('moment-date'),
    created_by: DS.attr(),
    tags: DS.hasMany('tag', {embedded: 'always'}),
    url: DS.attr('string'),
    tag_positions: DS.attr(),
    excerpt: DS.attr("string"),

    absoluteUrl: Ember.computed('url', 'ghostPaths.url', 'config.blogUrl', function () {
        var blogUrl = this.get('config.blogUrl'),
            postUrl = this.get('url');
        return this.get('ghostPaths.url').join(blogUrl, postUrl);
    }),

    date: Ember.computed('published_at', function () {
        if(this.get("published_at")) {
            return moment(this.get('published_at')).fromNow();
        }
        return moment(this.get('updated_at')).fromNow();
    }),

    scratch: null,
    titleScratch: null,

    // Computed post properties

    isPublished: Ember.computed.equal('status', 'published'),
    isDraft: Ember.computed.equal('status', 'draft'),

    // remove client-generated tags, which have `id: null`.
    // Ember Data won't recognize/update them automatically
    // when returned from the server with ids.
    updateTags: function () {
        var tags = this.get('tags'),
            oldTags = tags.filterBy('id', null);

        tags.removeObjects(oldTags);
        oldTags.invoke('deleteRecord');
    },

    isAuthoredByUser: function (user) {
        return parseInt(user.get('id'), 10) === parseInt(this.get('author_id'), 10);
    },
    
    hasTag: function (tagName) {
        return this.get('tags').mapBy('slug').contains(tagName);
    },

    positionInTag: function(tagName) {
        if(this.get("data.tag_positions")) {
            return this.get("data.tag_positions")[tagName] ? this.get("data.tag_positions")[tagName] : 0;
        }
    },

    isFeaturedInTag: function(tagName) {
        return this.positionInTag(tagName) === -9999999;
    }

});

export default Post;
