//configure paths
akomadefine(['jquery'], function($) {
	$ = $ || window.$;
 	
/**************************************************************************
* DECLARE SCOPE
*/
	obj = {};

/**************************************************************************
* DECLARE APPLICATION VARS
*/
	var module;

/**************************************************************************
* MAIN FUNCTIONS
*/

	function startEditing() {
		module.addClass('is-editable');
		$("#country").val($("#country-text").text());
		$('#is-editing-profile-overlay').removeClass('is-hidden');
		$('#recommended-header').hide();
	}

	function endEditing() {
		module.removeClass('is-editable');
		$('#is-editing-profile-overlay').addClass('is-hidden');
		$('#recommended-header').show();
	}

	function saveEdits() {
		// Gather the values and submit the form
		var bio = $("#bio-textarea").val();
		var name = $("#username-input").val();
		var location = $("#country").val();

		$.post("/user/update", {"name": name, "bio": bio, "location":location}, function(data){
			window.location.reload();
		});
	}
	


/**************************************************************************
* BIND EVENTS
*/
	function bindEvents() {
		module.find(".edit-profile-button").on("click", function() {
			startEditing();
		});

		module.find("#save-edits").on("click", function() {
			saveEdits();
		});

		module.find("#cancel-edits").on("click", function() {
			endEditing();
		});
	}


/**************************************************************************
* INIT APPLICATION
*/

	obj.init = function() {
		module = $('#user-profile-wrapper');
		bindEvents();
	}

/**************************************************************************
* RETURN SCOPE
*/

 	return obj;

});



