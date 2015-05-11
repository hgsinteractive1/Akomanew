//configure paths

require.config({
  paths: {

    //LIBRARIES
    "jquery": "libraries/jquery-1.11.0.min",

     //MODULES AND COMPONENTS
    "mainNav": "modules/main_nav",
    "storyShareTools": "modules/story_share",

    //PRIMARY CONTROLLERS
    // global elements and core application states
    "main": "modules/main"

     

    
  }

  
});



//configure paths
require(['jquery','main'], function($, main) {


  if($("body").attr("data-lazy-load-ghost")) {
    window.main = main;
    $("body").append("<script src='/ghost/vendor.js'></script>");
    $("body").append("<script src='/ghost/ghost.js'></script>");
  } else {
    // application runs after requiring main
    $(document).ready(function() {
      main.init();
    });
  }
  
});