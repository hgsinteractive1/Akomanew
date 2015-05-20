//configure paths
akomadefine(['jquery'], function($) {
	$ = $ || window.$;
 	
/**************************************************************************
* DECLARE SCOPE
*/
	obj = {};

/**************************************************************************
* DECLARE APPLICATION VARS
*/
	var module;
	var isExpanded = false;

/**************************************************************************
* EXPAND/CONTRACT SHARE TOOLS 
*/

	function hideOrShow() {
		if(isExpanded === false) {
			module.addClass('expanded');
			isExpanded = true;
		} else {
			module.removeClass('expanded');
			isExpanded = false;
		}
	}


/**************************************************************************
* BIND EVENTS
*/
	function bindEvents() {
		module.find('#expand-shares').click(function() {
			hideOrShow();
		});
	}


/**************************************************************************
* INIT APPLICATION
*/

	obj.init = function() {
		module = $('#social');
		bindEvents();
	}

/**************************************************************************
* RETURN SCOPE
*/

 	return obj;

});



