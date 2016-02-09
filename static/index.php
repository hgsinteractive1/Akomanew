<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=0" />
<link href='http://fonts.googleapis.com/css?family=Lato:300,400,700' rel='stylesheet' type='text/css'>
<link rel="stylesheet" type="text/css" href="stylesheets/screen.css">

<title>Home Template</title>


</head>
<body class="full-bleed">
<!--BEGIN HERO STORY-->
<?php include('includes/full_bleed_banner.php') ?>
<!--END HERO STORY-->

<!--BEGIN HERO STORY-->
<?php include('includes/main_story_feed.php') ?>
<!--END HERO STORY-->

<!--MAIN NAVIGATION-->
<?php include('includes/footer.php') ?>
<!--END-->

<!--MAIN NAVIGATION-->
<?php include('includes/nav_bar_white.php') ?>
<!--END-->

<!--MAIN MENU OVERLAY-->
<?php include('includes/main_menu.php') ?>
<!--END-->

<!--MAIN MENU ICON-->
<a href="#" id="menu-icon" class="is-white">
	<div id="relative">
		<div class="menu-bar one"></div>
		<div class="menu-bar two"></div>
		<div class="menu-bar three"></div>
	</div>
</a>
<!--END MENU-->

<!--INCLUDE REQUIRE/INIT MAIN SCRIPTS-->
<script src="js/require.js" data-main="js/core"></script>
<!--END-->
</body>
</html>