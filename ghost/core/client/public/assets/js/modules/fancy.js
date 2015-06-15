

akomarequire(["jquery"], function($){
	$ = $ || window.$;

	$(document).on("click", "[data-like-post].recommend-button", function(e){
		e.preventDefault();
		var post_id = $(this).attr("data-like-post");
		var like = !$(this).is(".active");
		var self = $(this);
		var url = like ? "/post/like/" + post_id : "/post/unlike/" + post_id;
		$.get(url, {}, function(data){
			if(data.like_count) {
				if(like) {
					$("[data-like-post=" + post_id +"]").addClass("active");
					self.text("Fancied");
				} else {
					$("[data-like-post=" + post_id +"]").removeClass("active");
					self.text("Fancy This");
				}

				$("[data-like-post=" + post_id +"]").each(function(i, item){
					$(".count", item.closest(".recommend")).html(data.like_count);
				});
			}
		});
	});

});