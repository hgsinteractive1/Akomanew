//configure paths
define(['jquery', 'storyShareTools'], function($, storyShareTools) {
 	
/**************************************************************************
* DECLARE SCOPE
*/
	obj = this;

/**************************************************************************
* DECLARE APPLICATION VARS
*/




/**************************************************************************
* INIT APPLICATION
*/
	function initGlobalComponents() {

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

 	$(document).ready(function() {
 		initApplication();
 	});

 
});



