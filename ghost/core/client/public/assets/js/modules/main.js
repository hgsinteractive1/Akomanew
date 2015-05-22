//configure paths
akomadefine(['jquery', 'mainNav', 'storyShareTools', 'fullBleedHero', 'pagination'], function($, mainNav, storyShareTools, fullBleedHero, pagination) {
		$ = $ || window.$;
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
		fullBleedHero.init();
		pagination.init();
	}


/**************************************************************************
* DECLARE APPLICATION VARS
*/	
	obj.init = function() {
 		initApplication();
	}

	return obj;
 
});



