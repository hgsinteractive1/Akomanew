<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=0" />
<link href='http://fonts.googleapis.com/css?family=Lato:300,400,700' rel='stylesheet' type='text/css'>
<link rel="stylesheet" type="text/css" href="stylesheets/screen.css">

<title>Home Template</title>


</head>
<body class="detail">

<!--BEGIN STORY DETAIL -->
<div id="story-detail">
	<!--STORY INTRO AREA-->
	<div id="story-intro">
		<div class="edit-icon"></div>

		<!--REMOVE not-edited-yet class when user starts editing-->
		<!--This will remove the default grey-->
		<h2><div class="editable-wrapper not-edited-yet" contenteditable="true">Enter story title...</div></h2>
	</div>
	<!--END STORY INTRO AREA-->

	<!--BEGIN STORY IMAGE-->
	<div id="story-image">

		<!--
		<img src="images/placeholder_story_image.jpg">
		-->
		<div id="upload-container"></div>
	</div>
	<!--END STORY IMAGE-->
	<!--BEGIN STORY BODY-->
	<div id="story-body">
		<div class="edit-icon"></div>
		<div class="editable-wrapper not-edited-yet" contenteditable="true">
			<p>Enter story content...</p>
		</div>
	</div>
	<!--END STORY BODY-->



</div>
<!--END STORY DETAIL-->


<!--MAIN NAVIGATION-->
<?php include('includes/nav_bar_compose.php') ?>
<!--END-->

<!--MAIN MENU OVERLAY-->
<?php include('includes/main_menu.php') ?>
<!--END-->

<!--MAIN MENU ICON-->
<a href="#" id="menu-icon">
	<div id="relative">
		<div class="menu-bar one"></div>
		<div class="menu-bar two"></div>
		<div class="menu-bar three"></div>
	</div>
</a>
<!--END MENU-->

<!--MAIN NAVIGATION-->
<?php include('includes/compose_finish_overlay.php') ?>
<!--END-->

<!--INCLUDE REQUIRE/INIT MAIN SCRIPTS-->
<script src="js/require.js" data-main="js/core"></script>
<!--END-->
</body>
</html>