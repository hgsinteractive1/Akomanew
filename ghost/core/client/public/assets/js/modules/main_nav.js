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
	var menuIcon;
	var shouldCheckNavState;
	var menuIsOpen = false;

	//scroll nav vars
	var scrollDistance;
	var scrollChange = 50;


/**************************************************************************
* HIDE/SHOW MAIN MENU
*/

	function showMenu() {
		menu.removeClass('hidden');
		menu.addClass('fadedIn');
		menuIcon.addClass('menu-is-open');
	
	}

	function hideMenu() {
		menuIcon.removeClass('menu-is-open');
		menu.removeClass('fadedIn');
		menu.on("webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend",
        function(event) {
   			$(this).addClass('hidden');
   			$(this).off("webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend");
  		});
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
			menuIcon.removeClass('is-white');

		} else {
			nav.addClass('is-white');
			menuIcon.addClass('is-white');

		}
	}

/**************************************************************************
* BIND EVENTS
*/
	function bindEvents() {
		menuIcon.click(function(e) {
			e.preventDefault();
			if(menuIsOpen == false) {
				showMenu();
				menuIsOpen = true;
			} else {
				hideMenu()
				menuIsOpen = false;
			}
		});
	}


/**************************************************************************
* INIT APPLICATION
*/

	obj.init = function() {
		console.log('init nav');
		nav = $('#primary-nav');
		menu = $('#main-menu-wrapper');
		menuIcon = $('#menu-icon');
		checkInitNavState();
		bindEvents();
	}

/**************************************************************************
* RETURN SCOPE
*/

 	return obj;

});



