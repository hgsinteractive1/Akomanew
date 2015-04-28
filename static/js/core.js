//configure paths

require.config({
  paths: {

  	//LIBRARIES
    "jquery": "libraries/jquery-1.11.0.min",

    //PRIMARY CONTROLLERS
    // global elements and core application states
    "main": "modules/main"

    
  }

  
});



//configure paths
require(['main'], function() {

//application runs after requiring main
	
});