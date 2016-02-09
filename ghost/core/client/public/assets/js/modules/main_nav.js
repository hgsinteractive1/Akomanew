//configure paths
akomadefine(['jquery'], function($) {
	$ = $ || window.$;
 	
/**************************************************************************
* DECLARE SCOPE
*/
	var obj = {};

/**************************************************************************
* DECLARE APPLICATION VARS
*/
	//vars to store scope
	var nav;
	var menu;
	var menuIcon;
	var actionsMenu;
	var profileIcon;

	//main member vars
	var shouldCheckNavState;
	var menuIsOpen = false;
	var actionsMenuIsOpen = false;
	var actionsMenuIsAnimating = false;
	var bodyClickActionHandler;
	var isInteractingWithActionsMenu = false;

	//scroll nav vars
	var scrollDistance;
	var scrollChange = 50;



/**************************************************************************
* HIDE/SHOW LOG IN OVERLAY
*/

	function showLogInOverlay() {
		
	}

/**************************************************************************
* HIDE/SHOW LOGGED IN ACTIONS NAV
*/
	function showActionsMenu() {
		if(actionsMenu.length === 0) {
			lookupElements();
		}

		actionsMenuIsAnimating = true;
		actionsMenuIsOpen = true;
		menuIcon.addClass('tool-tip-active');
		actionsMenu.removeClass('hidden');
		actionsMenu.addClass('fadedIn');
		actionsMenu.on("webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend",
        function(event) {
        	$(this).off("webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend");
   			bindBodyClickDetection();
   			actionsMenuIsAnimating = false;
  		});
	}

	function hideActionsMenu() {
		unbindBodyClickDetection();
		menuIcon.removeClass('tool-tip-active');
		actionsMenu.removeClass('fadedIn');
		actionsMenu.on("webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend",
        function(event) {
   			$(this).addClass('hidden');
   			$(this).off("webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend");

   			isInteractingWithActionsMenu = false;
   			actionsMenuIsOpen = false;
   			actionsMenuIsAnimating = false;
   			
  		});
	}

	function bindBodyClickDetection() {

		bodyClickActionHandler = function() {
			if(isInteractingWithActionsMenu == false) {
				hideActionsMenu();
			}	
		}

		$('body,html').bind("click", bodyClickActionHandler);
	}

	function unbindBodyClickDetection() {
		$('body,html').unbind("click", bodyClickActionHandler);
	}

/**************************************************************************
* HIDE/SHOW MAIN MENU
*/

	function showMenu() {
		if(!menu.length) {
			lookupElements();
		}
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

	function toggleActionsMenu() {
		if((actionsMenuIsOpen == false) && (actionsMenuIsAnimating == false)) {

			showActionsMenu();
				
		} 
		if((actionsMenuIsOpen == true) && (actionsMenuIsAnimating == false)) {

			hideActionsMenu();
			
		} 
	}

/**************************************************************************
* INIT NAV STATE
*/	
	function checkState() {
		var  hasClass = $('#primary-nav').hasClass('is-white');
		return hasClass;		
	}

	function lookupElements() {
		nav = $('#primary-nav');
		menu = $('#main-menu-wrapper');
		menuIcon = $('#menu-icon');
		profileIcon = $('#account-icon-wrapper').find('#log-in') //NEED TO CHANGE THIS!;
		actionsMenu = $('#logged-in-actions');
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
		
		//hide or show main menu
		$("body").on("click", '#menu-icon', function(e) {
			e.preventDefault();

			if(menuIsOpen == false) {
				showMenu();
				menuIsOpen = true;
			} else {
				hideMenu();
				menuIsOpen = false;
			}
		});

		//hide or show actions menui
		$("body").on("click", "#log-in", function(e) {
			e.preventDefault();
			toggleActionsMenu();
			
		});

		//check if is interacting with actions menu
		$("body").on("mouseenter", "#logged-in-actions", function() {
			isInteractingWithActionsMenu = true;
		});

		$("body").on("mouseleave", "#logged-in-actions", function() {
			isInteractingWithActionsMenu = false;
		});

		//close actions overlay if handheld
		$("body").on("click","#close-handheld-overlay", function() {
			toggleActionsMenu();
		});	

	}


/**************************************************************************
* INIT APPLICATION
*/

	obj.init = function() {
		lookupElements();
		checkInitNavState();
		bindEvents();
	}

/**************************************************************************
* RETURN SCOPE
*/

 	return obj;

});


