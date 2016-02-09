
import Ember from 'ember';
import counter from 'ghost/utils/word-count';

var debug = Ember.HTMLBars.makeBoundHelper(function (arr /* hashParams */) {
	console.log("Current Context");
	console.log("====================");
	console.log(this);

	if (arr) {
		console.log("Value");
		console.log("====================");
		console.log(arr);
	}
});



export default debug;