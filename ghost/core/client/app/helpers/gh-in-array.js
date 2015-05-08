import Ember from 'ember';
var inArray = Ember.HTMLBars.makeBoundHelper(function (arr /* hashParams */, options) {
    if (!arr || !arr.length) {
        return;
    }

    var elem = arr[0];
    var search = arr[1];

    return search.mapBy('name').contains(elem);
});

export default inArray;
