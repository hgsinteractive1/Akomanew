//configure paths
define(['jquery', 'mainNav', 'storyShareTools'], function($, mainNav, storyShareTools) {
 	
/**************************************************************************
* DECLARE SCOPE
*/
	var obj = {};

/**************************************************************************
* DECLARE APPLICATION VARS
*/




/**************************************************************************
* INIT APPLICATION
*/
	function initGlobalComponents() {
		console.log('global components');
		//init main nav
		mainNav.init();

	}

	function initApplication() {

		initGlobalComponents();

		//need to check page type
		//as we continue to build
		storyShareTools.init();

	}


/**************************************************************************
* DECLARE APPLICATION VARS
*/	
	obj.init = function() {
		console.log('init main app');
 		initApplication();
	}

	return obj;
 
});



