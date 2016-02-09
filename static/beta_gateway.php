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

<!--INCLUDE GATEWAY OVERLAY STATES-->

<div id="user-gate" class="fadedIn">
	<div id="overlay-background"></div>
	<div class="relative">
		
	<!--BEGIN SOCIAL SIGN IN-->
	
<!-- 	<div id="social-sign-in">
		<p class="sign-in">Sign in to Akoma</p>
		<a href="#" class="social-sign-in-button" id="tw-single-sign-on">Sign in with Twitter<div class="icon"></div></a>
		<a href="#" class="social-sign-in-button" id="fb-single-sign-on">Sign in with Facebook<div class="icon"></div></a>
		<p class="ss-info">We will never post to Twitter or Facebook without your permission.</p>
	</div> -->

	<!--END SOCIAL SIGN IN-->


	<!--BEGIN COMPOSE REQUEST PAGE-->

<div id="request-form">
		<p class="header">Only approved users can contribute
content during our beta launch.</p>
		<p class="subhead">Fill out the form below if you wish to write for aKoma</p>
		<div class="input-wrapper">
			<input type="text" value="Name">
			<div class="icon name"></div>
		</div>
		<div class="input-wrapper">
			<input type="text" value="Email">
			<div class="icon email"></div>
		</div>
		<textarea>Your reason for wanting to contribute...</textarea>
		<a href="#" class="send-request-button">Send Request<div class="icon"></div></a>
	</div>

	<!--END COMPOSE REQUEST PAGE-->

		<a href="#" id="gate-menu-icon">
			<div id="relative">
				<div class="menu-bar one"></div>
				<div class="menu-bar two"></div>
			</div>
		</a>
</div>



<!--END-->

<!--INCLUDE REQUIRE/INIT MAIN SCRIPTS-->
<script src="js/require.js" data-main="js/core"></script>
<!--END-->
</body>
</html>