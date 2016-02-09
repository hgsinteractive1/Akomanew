//configure paths

akomarequire.config({
  paths: {

    //LIBRARIES
    "jquery": "libraries/jquery-1.11.0.min",

     //MODULES AND COMPONENTS
    "mainNav": "modules/main_nav",
    "storyShareTools": "modules/story_share",
    "fullBleedHero": "modules/full_bleed_hero",
    "pagination": "modules/pagination",
    "editProfile": "modules/edit_profile",

    //PRIMARY CONTROLLERS
    // global elements and core application states
    "main": "modules/main"

     

    
  }

  
});



//configure paths
akomarequire(['jquery','main'], function($, main) { 
    $ = $ || window.$;
    $(document).ready(function() {
      main.init();
    });
});