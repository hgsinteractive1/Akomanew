//configure paths

akomarequire.config({
  paths: {
     //MODULES AND COMPONENTS
    "mainNav": "modules/main_nav",
    "storyShareTools": "modules/story_share",

    //PRIMARY CONTROLLERS
    // global elements and core application states
    "main": "modules/main",
    "jquery": "./jqueryhack"
  }

  
});

//configure paths
akomarequire(['jquery', 'main'], function($, main) { 
    $ = $ || window.$;
    $(document).ready(function() {
      main.init();
    });
    window.main = main;
});