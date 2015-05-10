//configure paths
define(['jquery'], function($) {
 	
/**************************************************************************
* DECLARE SCOPE
*/
	var obj = {};

/**************************************************************************
* DECLARE APPLICATION VARS
*/
	//main member vars
	var nav;
	var menu;
	var shouldCheckNavState;

	//scroll nav vars
	var scrollDistance;
	var scrollChange = 50;


/**************************************************************************
* BIND EVENTS
*/
	function bindEvents() {
	
	}


/**************************************************************************
* INIT NAV STATE
*/	
	function checkState() {
		var  hasClass = $('#primary-nav').hasClass('is-white');
		return hasClass;

		
	}

	function checkInitNavState() {
		shouldCheckNavState = checkState();
		if(shouldCheckNavState == true) {
			initCheckNavState();
		}
	}

	function initCheckNavState() {
		$(window).resize(function() {
			updateScrollCheckvars();
		});

		$(window).scroll(function() {
			checkNavScroll();
		});

		updateScrollCheckvars();
		checkNavScroll();
	}

	function updateScrollCheckvars() {
		scrollDistance = $(window).scrollTop();
	}

	function checkNavScroll() {

		scrollDistance = $(window).scrollTop();

		if(scrollDistance >= scrollChange) {
			nav.removeClass('is-white');

		} else {
			nav.addClass('is-white');

		}
	}




/**************************************************************************
* INIT APPLICATION
*/

	obj.init = function() {
		console.log('init nav');
		nav = $('#primary-nav');
		menu = $('#main-menu-wrapper');
		checkInitNavState();
		bindEvents();
	}

/**************************************************************************
* RETURN SCOPE
*/

 	return obj;

});



