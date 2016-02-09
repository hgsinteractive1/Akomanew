import Ember from 'ember';
import DS from 'ember-data';
import NProgressSaveMixin from 'ghost/mixins/nprogress-save';
import SelectiveSaveMixin from 'ghost/mixins/selective-save';

var SSOUser = DS.Model.extend(NProgressSaveMixin, SelectiveSaveMixin, {
    uuid: DS.attr('string'),
    name: DS.attr('string'),
    social_id: DS.attr('string'),
    network: DS.attr('string'),
    email: DS.attr('string'),
    reason: DS.attr('string'),
    type_requested: DS.attr('string'),
    status: DS.attr('string'),
    status_date: DS.attr('moment-date'),
    created_at: DS.attr('moment-date'),
    created_by: DS.attr('number'),
    updated_at: DS.attr('moment-date'),
    updated_by: DS.attr('number'),
    approved_role: DS.attr('string', {defaultValue: null}),
    user: DS.belongsTo("user", {embedded: 'always'}),

    isActive: Ember.computed.equal('status', 'approved'),
    isRejected: Ember.computed.equal('status', 'rejected'),
    role: Ember.computed('email', 'user', 'user.roles', function(){
        var roles = this.get("user.roles");
        return roles ? roles.mapBy("name")[0] : "New";
    }),
    isAuthor: Ember.computed('user.roles', function(){
        var roles = this.get("user.roles");
        if(roles) {
            roles = roles.mapBy("name");
        } else {
            roles = [];
        }
        return roles.indexOf("Author") >= 0;
    }),
    canBecomeAuthor: Ember.computed('user.roles', function(){
        var roles = this.get("user.roles");
        if(roles) {
            roles = roles.mapBy("name");
        } else {
            roles = [];
        }
        return roles.indexOf("Reader") >= 0;
    }),
    canBecomeReader: Ember.computed('status', 'user.roles', function(){
        return this.get("isAuthor") || !this.get("isActive");
    }),
    date: Ember.computed('status_date', function () {
        if(this.get("status_date")) {
            return moment(this.get('status_date')).fromNow();
        }
        return moment(this.get('created_at')).fromNow();
    }),
});

export default SSOUser;
