//configure paths

require.config({
  paths: {

  	//LIBRARIES
    "jquery": "libraries/jquery-1.11.0.min",

    //PRIMARY CONTROLLERS
    // global elements and core application states
    "main": "modules/main",

     // modules and components
    "storyShareTools": "modules/story_share"

    
  }

  
});



//configure paths
require(['main'], function() {

//application runs after requiring main
	
});