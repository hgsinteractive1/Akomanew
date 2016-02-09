//configure paths
akomadefine(['jquery'], function($) {
	$ = $ || window.$;
 	
 	return {
 		init: function(){
			$("body").on("click", "[data-pagination-link]", function(e){
				e.preventDefault();
				var self = $(this);
				var parent = self.parent();
				$.get($(this).attr("href") + "?ajax=true", {}, function(data){
					self.replaceWith("<div class='ajax-wrapper'>" + data + "</div>");
					var new_wrapper = $(".ajax-wrapper").last();
					new_wrapper.hide();
					new_wrapper.fadeIn();
				});
			});
		}
 	};
});