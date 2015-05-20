//configure paths
akomadefine(['jquery'], function($) {
	$ = $ || window.$;
 	
/**************************************************************************
* DECLARE SCOPES
*/
	obj = {};
	var module;
	var heroImage;

/**************************************************************************
* DECLARE MEMBER VARS
*/	
	
	var initialSizeSet = false;

	var maskSize = {
		'width'  : null,
		'height' : null
	}

	var imageSize = {
		'width'  : null,
		'height' : null
	}

/**************************************************************************
* FUNCTION SIZE IMAGE TO MASK
*/

	function sizeImageToMask() {
		maskSize.width = module.width();
		maskSize.height = module.outerHeight();
		imageSize.width = heroImage.width();
		imageSize.height = heroImage.height();

		if(maskSize.width > imageSize.width) {
			checkMaskGreaterThanImageWidth();
		}

		if(maskSize.width < imageSize.width) {
			checkImageGreaterThanMaskWidth()
		} 
 

		if(maskSize.height > imageSize.height) {
			checkAndSetHeight();
		}

		heroImage.height(imageSize.height);
		heroImage.width(imageSize.width);
		heroImage.css({
			'marginLeft' :  - imageSize.width * 0.5,
			'marginTop' :  - imageSize.height * 0.5,
			'opacity' : 1
		})

		initialSizeSet = true;

	}

	function checkMaskGreaterThanImageWidth() {
		var adjustMultiplier = maskSize.width/imageSize.width;
		imageSize.width = imageSize.width * adjustMultiplier;
		imageSize.height = imageSize.height * adjustMultiplier;
	}


	function checkImageGreaterThanMaskWidth() {
		//var scaleMultiplier = imageSize.width/maskSize.width;
		var originalWidth = imageSize.width;
		imageSize.width = maskSize.width;
		imageSize.height = (imageSize.width * imageSize.height) / originalWidth;
		
	}


	function checkAndSetHeight() {
		var adjustMultiplier = maskSize.height/imageSize.height;
		imageSize.width = imageSize.width * adjustMultiplier;
		imageSize.height = imageSize.height * adjustMultiplier;
	}

/**************************************************************************
* FUNCTION BIND EVENTS
*/

	$(window).resize(function() {
		sizeImageToMask();
	}); 


/**************************************************************************
* INIT APPLICATION
*/

	obj.init = function() {
		module = $('#full-bleed-hero');
		heroImage = module.find('#fluid-image img');
		sizeImageToMask();

	}


/**************************************************************************
* RETURN SCOPE
*/

 	return obj;

});



