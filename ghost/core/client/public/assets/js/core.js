//configure paths

akomarequire.config({
  paths: {

    // //LIBRARIES
    "jquery": "libraries/jquery-1.11.0.min",

     //MODULES AND COMPONENTS
    "mainNav": "modules/main_nav",
    "storyShareTools": "modules/story_share",
    "fullBleedHero": "modules/full_bleed_hero",
    "pagination": "modules/pagination",
    "ensure_auth": "modules/ensure_auth",
    "editProfile": "modules/edit_profile",

    //PRIMARY CONTROLLERS
    // global elements and core application states
    "main": "modules/main"    
  }

  
});



//configure paths
akomarequire(['jquery','main','ensure_auth'], function($, main, ensure_auth) { 
    $ = $ || window.$;
    $(document).ready(function() {
      main.init();
    });

    $(document).on("click", "[data-like-post].recommend-button", function(e){
      e.preventDefault();
      var post_id = $(this).attr("data-like-post");
      var self = $(this);
      $.get("/post/like/" + post_id, {}, function(data){
        if(data.like_count) {
          $("[data-like-post=" + post_id +"]").addClass("active");

          $("[data-like-post=" + post_id +"]").each(function(i, item){
            $(".count", item.closest(".recommend")).html(data.like_count);
          });
        }
      });
    });
});