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

<!--BEGIN USER PROFILE-->
<div id="user-profile-wrapper">
	<div id="profile-overview">
		<div id="avatar-wrapper">
			<div id="avatar"></div>
		</div>
		<div id="profile-summary">
			
			<h3 id="username">Timothy Johnson</h3>
			<input type="text" id="username-input" value="Timothy Johnson">
	
			<div class="overview">from <span id="country-text">Nigeria</span>
				<select id="country">
	  				<option value="country">Country</option>
	  				<option value="country">Country</option>
	  				<option value="country">Country</option>
	  				<option value="country">Country</option>
					</select>
					| 231 posts
			</div>
			<p id="bio">Hello. I’m Tim, a college student from Nigeria. I enjoy writing about politics and sports.</p>
			<textarea id="bio-textarea">Hello. I’m Tim, a college student from Nigeria. I enjoy writing about politics and sports.</textarea>
		</div>
		<div class="clear"></div>	
	</div>
	<div id="profile-stats">
		<ul id="stats-list">
			<li>
				<h4>Followers</h4>
				<p class="stat">27</p>
			</li>
			<li>
				<h4>Following</h4>
				<p class="stat">13</p>
			</li>
			<li class="social">
				<h4>On Social</h4>
				<!--<a href="#" id="on-social-twitter"></a>-->
				<a href="#" id="on-social-facebook"></a>
			</li>
			<li class="primary-action">

					<!--FOLLOW ICON-->
					
					<!--<a id="author-action">
						<div class="relative">
							Follow
							<div class="icon follow">
								<div class="bar-one"></div>
								<div class="bar-two"></div>
							</div>
						</div>
					</a>-->
					<!--END FOLLOW ICON-->

					<!--FOLLOWING ICON-->
					
					<!--<a id="author-action">
						<div class="relative">
							Following
							<div class="icon following">
								
							</div>
						</div>
					</a>-->

					<!--END FOLLOWING ICON-->

					<!--BEGIN EDIT PROFILE ICON-->
					<a id="author-action" class="edit-profile-button">
						<div class="relative">
							Edit Profile
							<div class="icon edit-profile">
								
							</div>
						</div>
					</a>
					<!--END EDIT PROFILE ICON-->
					<!--BEGIN SAVE/EDIT BUTTONS-->
					<ul id="manage-edits-buttons">
						<li class="manage-edit-button-list"><a href="#" class="manage-edits-button" id="cancel-edits">Cancel</a></li>
						<li class="manage-edit-button-list no-margin"><a href="#" class="manage-edits-button" id="save-edits">Save</a></li>
					</ul>
					<!--END SAVE/EDIT BUTTONS-->

			</li>
		</ul>
	</div>
	<div id="recommended-header">
		<h3>You've Recommended <span>24</span> stories</h3>
	</div>
</div>
<!--END-->

<!--BEGIN HERO STORY-->
<?php include('includes/main_story_feed.php') ?>
<!--END HERO STORY-->

<!--MAIN NAVIGATION-->
<?php include('includes/footer.php') ?>
<!--END-->

<!--MAIN NAVIGATION-->
<?php include('includes/nav_bar.php') ?>
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

<!--INCLUDE REQUIRE/INIT MAIN SCRIPTS-->
<script src="js/require.js" data-main="js/core"></script>
<!--END-->
</body>
</html>