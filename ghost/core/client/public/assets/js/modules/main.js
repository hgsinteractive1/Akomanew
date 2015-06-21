//configure paths
akomadefine(['jquery', 'mainNav', 'storyShareTools', 'fullBleedHero', 'pagination', 'editProfile', "modules/fancy"], function($, mainNav, storyShareTools, fullBleedHero, pagination, editProfile, fancy) {
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
		editProfile.init();
	}


/**************************************************************************
* DECLARE APPLICATION VARS
*/	
	obj.init = function() {
 		initApplication();
	}

	return obj;
 
});



