-- MySQL dump 10.14  Distrib 5.5.44-MariaDB, for Linux (x86_64)
--
-- Host: localhost    Database: ghost
-- ------------------------------------------------------
-- Server version	5.5.44-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `accesstokens`
--

DROP TABLE IF EXISTS `accesstokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `accesstokens` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `token` varchar(255) NOT NULL,
  `user_id` int(10) unsigned NOT NULL,
  `client_id` int(10) unsigned NOT NULL,
  `expires` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `accesstokens_token_unique` (`token`),
  KEY `accesstokens_user_id_foreign` (`user_id`),
  KEY `accesstokens_client_id_foreign` (`client_id`),
  CONSTRAINT `accesstokens_client_id_foreign` FOREIGN KEY (`client_id`) REFERENCES `clients` (`id`),
  CONSTRAINT `accesstokens_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `accesstokens`
--

LOCK TABLES `accesstokens` WRITE;
/*!40000 ALTER TABLE `accesstokens` DISABLE KEYS */;
INSERT INTO `accesstokens` VALUES (44,'1hg8wmzviZ7mazNfpqTmCd8IBi2WVhMgDg9Q2leNCuG3Yz7X8boxEyjVbUBn0IcRC3LgKWkXDilqHUWXkSIlHSMfJTG2dbuY9w4fN7czqGvxDskiWgkXOWuzpvgDKqQbz15PNQlK5IkJOyFs3FXULUXuXpcSfe91w9s0Un6KibJuiYxU1TOewaPORC9eQ3HOYCZwKzTccIvlaDwvIcw9jhvmP4L6UcEkHloXP9ksZ1GZki7BfPx27EOO4Y3LCjs',15,1,1454537016801);
/*!40000 ALTER TABLE `accesstokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `app_fields`
--

DROP TABLE IF EXISTS `app_fields`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `app_fields` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `uuid` varchar(36) NOT NULL,
  `key` varchar(150) NOT NULL,
  `value` text,
  `type` varchar(150) NOT NULL DEFAULT 'html',
  `app_id` int(10) unsigned NOT NULL,
  `relatable_id` int(10) unsigned NOT NULL,
  `relatable_type` varchar(150) NOT NULL DEFAULT 'posts',
  `active` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` datetime NOT NULL,
  `created_by` int(11) NOT NULL,
  `updated_at` datetime DEFAULT NULL,
  `updated_by` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `app_fields_app_id_foreign` (`app_id`),
  CONSTRAINT `app_fields_app_id_foreign` FOREIGN KEY (`app_id`) REFERENCES `apps` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `app_fields`
--

LOCK TABLES `app_fields` WRITE;
/*!40000 ALTER TABLE `app_fields` DISABLE KEYS */;
/*!40000 ALTER TABLE `app_fields` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `app_settings`
--

DROP TABLE IF EXISTS `app_settings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `app_settings` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `uuid` varchar(36) NOT NULL,
  `key` varchar(150) NOT NULL,
  `value` text,
  `app_id` int(10) unsigned NOT NULL,
  `created_at` datetime NOT NULL,
  `created_by` int(11) NOT NULL,
  `updated_at` datetime DEFAULT NULL,
  `updated_by` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `app_settings_key_unique` (`key`),
  KEY `app_settings_app_id_foreign` (`app_id`),
  CONSTRAINT `app_settings_app_id_foreign` FOREIGN KEY (`app_id`) REFERENCES `apps` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `app_settings`
--

LOCK TABLES `app_settings` WRITE;
/*!40000 ALTER TABLE `app_settings` DISABLE KEYS */;
/*!40000 ALTER TABLE `app_settings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `apps`
--

DROP TABLE IF EXISTS `apps`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `apps` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `uuid` varchar(36) NOT NULL,
  `name` varchar(150) NOT NULL,
  `slug` varchar(150) NOT NULL,
  `version` varchar(150) NOT NULL,
  `status` varchar(150) NOT NULL DEFAULT 'inactive',
  `created_at` datetime NOT NULL,
  `created_by` int(11) NOT NULL,
  `updated_at` datetime DEFAULT NULL,
  `updated_by` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `apps_name_unique` (`name`),
  UNIQUE KEY `apps_slug_unique` (`slug`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `apps`
--

LOCK TABLES `apps` WRITE;
/*!40000 ALTER TABLE `apps` DISABLE KEYS */;
/*!40000 ALTER TABLE `apps` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `clients`
--

DROP TABLE IF EXISTS `clients`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `clients` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `uuid` varchar(36) NOT NULL,
  `name` varchar(150) NOT NULL,
  `slug` varchar(150) NOT NULL,
  `secret` varchar(150) NOT NULL,
  `created_at` datetime NOT NULL,
  `created_by` int(11) NOT NULL,
  `updated_at` datetime DEFAULT NULL,
  `updated_by` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `clients_name_unique` (`name`),
  UNIQUE KEY `clients_slug_unique` (`slug`),
  UNIQUE KEY `clients_secret_unique` (`secret`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clients`
--

LOCK TABLES `clients` WRITE;
/*!40000 ALTER TABLE `clients` DISABLE KEYS */;
INSERT INTO `clients` VALUES (1,'8fbf3c6d-4c71-4718-bba4-3c161ccc7817','Ghost Admin','ghost-admin','not_available','2015-04-28 16:52:42',1,'2015-04-28 16:52:42',1);
/*!40000 ALTER TABLE `clients` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `permissions`
--

DROP TABLE IF EXISTS `permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `permissions` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `uuid` varchar(36) NOT NULL,
  `name` varchar(150) NOT NULL,
  `object_type` varchar(150) NOT NULL,
  `action_type` varchar(150) NOT NULL,
  `object_id` int(11) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `created_by` int(11) NOT NULL,
  `updated_at` datetime DEFAULT NULL,
  `updated_by` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=61 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `permissions`
--

LOCK TABLES `permissions` WRITE;
/*!40000 ALTER TABLE `permissions` DISABLE KEYS */;
INSERT INTO `permissions` VALUES (31,'b975c971-b7cf-4be2-b764-04bffb9993bb','Export database','db','exportContent',NULL,'2015-06-03 01:02:30',1,'2015-06-03 01:02:30',1),(32,'9f90f50c-1318-4210-a0e1-7f8ef47d9e3b','Import database','db','importContent',NULL,'2015-06-03 01:02:30',1,'2015-06-03 01:02:30',1),(33,'36689990-3365-4849-b46c-e932ea0ecefd','Delete all content','db','deleteAllContent',NULL,'2015-06-03 01:02:30',1,'2015-06-03 01:02:30',1),(34,'4cfb3f5b-95da-4352-9e04-349e5c5abe74','Send mail','mail','send',NULL,'2015-06-03 01:02:30',1,'2015-06-03 01:02:30',1),(35,'7bd21a1a-6bb7-473a-9ee1-4eb945d1d6e8','Browse notifications','notification','browse',NULL,'2015-06-03 01:02:30',1,'2015-06-03 01:02:30',1),(36,'9224c0c6-ef95-4bcf-a803-35547c54fcd4','Add notifications','notification','add',NULL,'2015-06-03 01:02:30',1,'2015-06-03 01:02:30',1),(37,'ec68f6ae-74f8-48c0-8362-605222be130c','Delete notifications','notification','destroy',NULL,'2015-06-03 01:02:30',1,'2015-06-03 01:02:30',1),(38,'a8532bef-293b-488f-8283-574931fd0513','Browse posts','post','browse',NULL,'2015-06-03 01:02:30',1,'2015-06-03 01:02:30',1),(39,'ffb258ac-6a69-45ba-b341-92aba2c35cb4','Read posts','post','read',NULL,'2015-06-03 01:02:30',1,'2015-06-03 01:02:30',1),(40,'5d82b20a-8036-4c9d-8aa4-37ebd806d18c','Edit posts','post','edit',NULL,'2015-06-03 01:02:30',1,'2015-06-03 01:02:30',1),(41,'21abc693-65c4-490f-b5bd-dd3246280095','Add posts','post','add',NULL,'2015-06-03 01:02:30',1,'2015-06-03 01:02:30',1),(42,'de4f2e83-c6b8-499f-8356-ecd0b67906ca','Delete posts','post','destroy',NULL,'2015-06-03 01:02:30',1,'2015-06-03 01:02:30',1),(43,'4f7c8670-0fb1-4a05-8655-3a4497bd66f1','Browse settings','setting','browse',NULL,'2015-06-03 01:02:30',1,'2015-06-03 01:02:30',1),(44,'09e3abd4-a399-4945-ad33-c558e0f2e958','Read settings','setting','read',NULL,'2015-06-03 01:02:30',1,'2015-06-03 01:02:30',1),(45,'2abb0968-3bed-4303-87e6-5578711d192c','Edit settings','setting','edit',NULL,'2015-06-03 01:02:30',1,'2015-06-03 01:02:30',1),(46,'882506c6-64f5-41be-affb-27a3b300e9d7','Generate slugs','slug','generate',NULL,'2015-06-03 01:02:30',1,'2015-06-03 01:02:30',1),(47,'1d87c69b-4abb-492c-91bd-08bc1fba5c83','Browse tags','tag','browse',NULL,'2015-06-03 01:02:30',1,'2015-06-03 01:02:30',1),(48,'a631497e-1426-493d-b6fa-df9aa0159598','Read tags','tag','read',NULL,'2015-06-03 01:02:30',1,'2015-06-03 01:02:30',1),(49,'c56ba34e-0010-4e2b-8bcc-7b204938ae77','Edit tags','tag','edit',NULL,'2015-06-03 01:02:30',1,'2015-06-03 01:02:30',1),(50,'7799fca3-8f01-4a27-b96a-53bd42a28fcc','Add tags','tag','add',NULL,'2015-06-03 01:02:30',1,'2015-06-03 01:02:30',1),(51,'fde8f85f-4c3b-415e-9a95-23009d1d79dc','Delete tags','tag','destroy',NULL,'2015-06-03 01:02:30',1,'2015-06-03 01:02:30',1),(52,'c9c9e218-25e4-4b59-80d5-2b47b2dd23fd','Browse themes','theme','browse',NULL,'2015-06-03 01:02:30',1,'2015-06-03 01:02:30',1),(53,'29861ab3-e093-4e59-8ef2-9e96a8afcdfc','Edit themes','theme','edit',NULL,'2015-06-03 01:02:30',1,'2015-06-03 01:02:30',1),(54,'bb14abce-ca13-4702-8cc9-87c79575c90b','Browse users','user','browse',NULL,'2015-06-03 01:02:30',1,'2015-06-03 01:02:30',1),(55,'ce7bcb6d-d2e9-44ea-b84c-50489e959dd7','Read users','user','read',NULL,'2015-06-03 01:02:30',1,'2015-06-03 01:02:30',1),(56,'3969a651-c78c-4436-bae8-48aaf37d578c','Edit users','user','edit',NULL,'2015-06-03 01:02:30',1,'2015-06-03 01:02:30',1),(57,'17dc717d-7b7c-4205-9aba-ac81626fd4d7','Add users','user','add',NULL,'2015-06-03 01:02:30',1,'2015-06-03 01:02:30',1),(58,'75387bb7-d236-48de-bbbb-f014df680ebd','Delete users','user','destroy',NULL,'2015-06-03 01:02:30',1,'2015-06-03 01:02:30',1),(59,'81dd248a-11a5-4a88-acc0-9ec6e93de239','Assign a role','role','assign',NULL,'2015-06-03 01:02:30',1,'2015-06-03 01:02:30',1),(60,'65e103d4-5965-463a-a620-a3b942fd029c','Browse roles','role','browse',NULL,'2015-06-03 01:02:30',1,'2015-06-03 01:02:30',1);
/*!40000 ALTER TABLE `permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `permissions_apps`
--

DROP TABLE IF EXISTS `permissions_apps`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `permissions_apps` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `app_id` int(11) NOT NULL,
  `permission_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `permissions_apps`
--

LOCK TABLES `permissions_apps` WRITE;
/*!40000 ALTER TABLE `permissions_apps` DISABLE KEYS */;
/*!40000 ALTER TABLE `permissions_apps` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `permissions_roles`
--

DROP TABLE IF EXISTS `permissions_roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `permissions_roles` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `role_id` int(11) NOT NULL,
  `permission_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=125 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `permissions_roles`
--

LOCK TABLES `permissions_roles` WRITE;
/*!40000 ALTER TABLE `permissions_roles` DISABLE KEYS */;
INSERT INTO `permissions_roles` VALUES (63,1,31),(64,1,32),(65,1,33),(66,1,34),(67,1,35),(68,1,36),(69,1,37),(70,1,38),(71,1,39),(72,1,40),(73,1,41),(74,1,42),(75,1,43),(76,1,44),(77,1,45),(78,1,46),(79,1,47),(80,1,48),(81,1,49),(82,1,50),(83,1,51),(84,1,52),(85,1,53),(86,1,54),(87,1,55),(88,1,56),(89,1,57),(90,1,58),(91,1,59),(92,1,60),(93,2,38),(94,2,39),(95,2,40),(96,2,41),(97,2,42),(98,2,43),(99,2,44),(100,2,46),(101,2,47),(102,2,48),(103,2,49),(104,2,50),(105,2,51),(106,2,54),(107,2,55),(108,2,56),(109,2,57),(110,2,58),(111,2,59),(112,2,60),(113,3,38),(114,3,39),(115,3,41),(116,3,43),(117,3,44),(118,3,46),(119,3,47),(120,3,48),(121,3,50),(122,3,54),(123,3,55),(124,3,60);
/*!40000 ALTER TABLE `permissions_roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `permissions_users`
--

DROP TABLE IF EXISTS `permissions_users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `permissions_users` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `permission_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `permissions_users`
--

LOCK TABLES `permissions_users` WRITE;
/*!40000 ALTER TABLE `permissions_users` DISABLE KEYS */;
/*!40000 ALTER TABLE `permissions_users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `posts`
--

DROP TABLE IF EXISTS `posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `posts` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `uuid` varchar(36) NOT NULL,
  `title` varchar(150) NOT NULL,
  `slug` varchar(150) NOT NULL,
  `markdown` mediumtext,
  `html` mediumtext,
  `image` text,
  `featured` tinyint(1) NOT NULL DEFAULT '0',
  `page` tinyint(1) NOT NULL DEFAULT '0',
  `status` varchar(150) NOT NULL DEFAULT 'draft',
  `language` varchar(6) NOT NULL DEFAULT 'en_US',
  `meta_title` varchar(150) DEFAULT NULL,
  `meta_description` varchar(200) DEFAULT NULL,
  `meta_keywords` text,
  `abstract` text,
  `author_id` int(11) NOT NULL,
  `created_at` datetime NOT NULL,
  `created_by` int(11) NOT NULL,
  `updated_at` datetime DEFAULT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `published_at` datetime DEFAULT NULL,
  `published_by` int(11) DEFAULT NULL,
  `like_count` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `posts_slug_unique` (`slug`)
) ENGINE=InnoDB AUTO_INCREMENT=103 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `posts`
--

LOCK TABLES `posts` WRITE;
/*!40000 ALTER TABLE `posts` DISABLE KEYS */;
INSERT INTO `posts` VALUES (74,'40ef2768-bb87-4d37-a962-177ac8ef04af','demo post 1','demo-post-1-2','<p><strong>Lorem Ipsum</strong> is simply dummy text of \nthe printing and typesetting industry. Lorem Ipsum has been the \nindustry\'s standard dummy text ever since the 1500s, when an unknown \nprinter took a galley of type and scrambled it to make a type specimen \nbook. It has survived not only five centuries, but also the leap into \nelectronic typesetting, remaining essentially unchanged. It was \npopularised in the 1960s with the release of Letraset sheets containing \nLorem Ipsum passages, and more recently with desktop publishing software\n like Aldus PageMaker including versions of Lorem Ipsum.</p><div class=\"rc\"><p>It\n is a long established fact that a reader will be distracted by the \nreadable content of a page when looking at its layout. The point of \nusing Lorem Ipsum is that it has a more-or-less normal distribution of \nletters, as opposed to using \'Content here, content here\', making it \nlook like readable English. Many desktop publishing packages and web \npage editors now use Lorem Ipsum as their default model text, and a \nsearch for \'lorem ipsum\' will uncover many web sites still in their \ninfancy. Various versions have evolved over the years, sometimes by \naccident, sometimes on purpose (injected humour and the like).</p></div>','<p><p><strong>Lorem Ipsum</strong> is simply dummy text of <br />\nthe printing and typesetting industry. Lorem Ipsum has been the <br />\nindustry\'s standard dummy text ever since the 1500s, when an unknown <br />\nprinter took a galley of type and scrambled it to make a type specimen <br />\nbook. It has survived not only five centuries, but also the leap into <br />\nelectronic typesetting, remaining essentially unchanged. It was <br />\npopularised in the 1960s with the release of Letraset sheets containing <br />\nLorem Ipsum passages, and more recently with desktop publishing software <br />\n like Aldus PageMaker including versions of Lorem Ipsum.</p><div class=\"rc\"><p>It\n is a long established fact that a reader will be distracted by the \nreadable content of a page when looking at its layout. The point of <br />\nusing Lorem Ipsum is that it has a more-or-less normal distribution of <br />\nletters, as opposed to using \'Content here, content here\', making it <br />\nlook like readable English. Many desktop publishing packages and web <br />\npage editors now use Lorem Ipsum as their default model text, and a <br />\nsearch for \'lorem ipsum\' will uncover many web sites still in their <br />\ninfancy. Various versions have evolved over the years, sometimes by <br />\naccident, sometimes on purpose (injected humour and the like).</p></div></p>','/content/images/2016/01/flickr_grid-1.jpg',0,0,'published','en_US',NULL,NULL,NULL,NULL,15,'2016-01-13 12:41:51',15,'2016-01-13 14:54:51',15,'2016-01-13 12:41:51',15,1),(76,'152e60b1-a0c3-405f-93de-02bbe5029775','(Untitled)','untitled-2','<p>2</p>','<p>2</p>',NULL,0,0,'published','en_US',NULL,NULL,NULL,NULL,16,'2016-01-13 12:59:11',16,'2016-01-13 12:59:11',16,'2016-01-13 12:59:11',16,0),(77,'fa8c1c26-2bc0-4403-8f2d-cd5b7373372f','(Untitled)','untitled-3','<p>3</p>','<p>3</p>',NULL,0,0,'published','en_US',NULL,NULL,NULL,NULL,16,'2016-01-13 12:59:15',16,'2016-01-13 12:59:15',16,'2016-01-13 12:59:15',16,0),(78,'6a7fc286-78a9-4db7-8c12-c063c5e04d70','(Untitled)','untitled-4','<p>4</p>','<p>4</p>',NULL,0,0,'published','en_US',NULL,NULL,NULL,NULL,16,'2016-01-13 12:59:21',16,'2016-01-13 12:59:21',16,'2016-01-13 12:59:21',16,0),(79,'aa972a4a-8580-4aa6-b580-aea83d2e40da','(Untitled)','untitled-5','<p>5</p>','<p>5</p>',NULL,0,0,'published','en_US',NULL,NULL,NULL,NULL,16,'2016-01-13 12:59:26',16,'2016-01-18 08:04:29',15,'2016-01-13 12:59:26',16,0),(80,'cbd9575c-1e22-4514-a959-81b95fa1a719','(Untitled)','untitled-6','<p>6</p>','<p>6</p>',NULL,0,0,'published','en_US',NULL,NULL,NULL,NULL,16,'2016-01-13 12:59:33',16,'2016-01-13 12:59:33',16,'2016-01-13 12:59:33',16,0),(85,'6ef48ffd-ed26-4729-97d1-654f7f2c4b19','title','title','<p>test<br></p>','<p>test<br></p>','/content/images/2016/01/flickr_slide-2.jpg',0,0,'published','en_US',NULL,NULL,NULL,NULL,15,'2016-01-13 13:46:00',15,'2016-01-14 10:11:10',1,'2016-01-13 13:46:00',15,1),(86,'3d567dca-109e-44e1-9ba1-2e403cddaa83','(Untitled)','untitled','<p>test<br></p>','<p>test<br></p>',NULL,0,0,'published','en_US',NULL,NULL,NULL,NULL,15,'2016-01-13 14:13:55',15,'2016-01-26 15:11:45',1,'2016-01-13 14:13:55',15,1),(91,'8b4f7e43-1343-4d52-aa9f-7b23761e92b7','(Untitled)','untitled-11','<p>demo story <a href=\"http://www.hgsinteractive.com\">hgsinteractive</a></p>','<p>demo story <a href=\"http://www.hgsinteractive.com\">hgsinteractive</a></p>','/content/images/2016/01/1600x565.jpg',0,0,'draft','en_US',NULL,NULL,NULL,NULL,17,'2016-01-18 07:58:20',17,'2016-01-22 11:09:24',15,'2016-01-18 07:58:20',17,2),(93,'af395739-112f-4624-916a-f90295e6514b','test delete','test-delete','<p>this is post where&nbsp; i am experimenting like delete hide<br></p>','<p>this is post where&nbsp; i am experimenting like delete hide<br></p>','/content/images/2016/01/flickr_grid-3.jpg',0,0,'published','en_US',NULL,NULL,NULL,NULL,15,'2016-01-22 11:07:21',15,'2016-01-25 09:18:56',1,'2016-01-22 11:07:21',15,1),(94,'9606223d-f38b-4256-a25a-0ce42441e185','tag post','tag-post','<p>this post is not categorized <br></p>','<p>this post is not categorized <br></p>',NULL,0,0,'published','en_US',NULL,NULL,NULL,NULL,15,'2016-01-25 07:08:59',15,'2016-01-26 15:11:28',1,'2016-01-25 07:08:59',15,1),(95,'4edb3ebc-9260-4742-890b-4cee508393a5','(Untitled)','untitled-7','<p>te<br></p>','<p>te<br></p>',NULL,0,0,'published','en_US',NULL,NULL,NULL,NULL,15,'2016-01-25 08:23:34',15,'2016-01-25 08:23:34',15,'2016-01-25 08:23:34',15,0),(96,'1494649a-9586-4097-8ab2-b38b9fcadce4','story heading','story-heading','<p>story story<br></p>','<p>story story<br></p>',NULL,0,0,'published','en_US',NULL,NULL,NULL,NULL,15,'2016-01-25 09:28:59',15,'2016-01-25 09:28:59',15,'2016-01-25 09:28:59',15,0),(97,'ad9771d7-2a61-47e1-a3b3-1e101ff76e88','(Untitled)','untitled-10','<p>te<br></p>','<p>te<br></p>',NULL,0,0,'published','en_US',NULL,NULL,NULL,NULL,16,'2016-01-26 12:36:41',16,'2016-01-26 12:36:41',16,'2016-01-26 12:36:41',16,0),(99,'c39992c3-7a8e-47f7-a14a-458f74ce3837','trying to delete this post','trying-to-delete-this-post-2','<p>Test Admin<br></p>','<p>Test Admin<br></p>','/content/images/2016/01/doctor_2.jpg',0,0,'published','en_US',NULL,NULL,NULL,NULL,15,'2016-01-27 09:24:53',15,'2016-01-27 17:18:28',15,'2016-01-27 09:24:53',15,2),(100,'26f30208-9047-4316-b9e3-5fabbfea7b3f','(Untitled)','untitled-13','<p>ggg<br></p>','<p>ggg<br></p>','/content/images/2016/01/doctor.jpg',0,0,'published','en_US',NULL,NULL,NULL,NULL,15,'2016-01-27 09:30:15',15,'2016-01-27 09:30:15',15,'2016-01-27 09:30:15',15,0),(101,'7c86bbfa-0fe8-4a36-9e0e-7a2601e5af7f','(Untitled)','untitled-14','<p><br></p>','<p><br></p>','/content/images/2016/01/11923197_1040402012671621_2179611493241323230_n-1.jpg',0,0,'published','en_US',NULL,NULL,NULL,NULL,20,'2016-01-27 10:03:58',20,'2016-01-27 10:53:44',15,'2016-01-27 10:03:58',20,0),(102,'fe59d20e-d203-40f1-8b7f-0a17b908eeff','(Untitled)','untitled-15','<p><br></p>','<p><br></p>','/content/images/2016/01/Berger_1.png',0,0,'published','en_US',NULL,NULL,NULL,'\n                            <p><!---->ok<br></p>\n                        ',15,'2016-01-27 10:50:48',15,'2016-02-02 16:10:23',1,'2016-01-27 10:50:48',15,1);
/*!40000 ALTER TABLE `posts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `posts_tags`
--

DROP TABLE IF EXISTS `posts_tags`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `posts_tags` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `post_id` int(10) unsigned NOT NULL,
  `tag_id` int(10) unsigned NOT NULL,
  `sort_position` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `posts_tags_post_id_foreign` (`post_id`),
  KEY `posts_tags_tag_id_foreign` (`tag_id`),
  CONSTRAINT `posts_tags_post_id_foreign` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`),
  CONSTRAINT `posts_tags_tag_id_foreign` FOREIGN KEY (`tag_id`) REFERENCES `tags` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=227 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `posts_tags`
--

LOCK TABLES `posts_tags` WRITE;
/*!40000 ALTER TABLE `posts_tags` DISABLE KEYS */;
INSERT INTO `posts_tags` VALUES (185,74,11,0),(189,74,11,0),(199,74,11,0),(200,74,11,0),(201,74,11,0),(205,85,11,0),(215,85,11,0),(216,85,11,0),(217,85,11,0),(220,79,11,0),(223,94,11,0),(224,97,14,0),(226,101,11,0);
/*!40000 ALTER TABLE `posts_tags` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `refreshtokens`
--

DROP TABLE IF EXISTS `refreshtokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `refreshtokens` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `token` varchar(255) NOT NULL,
  `user_id` int(10) unsigned NOT NULL,
  `client_id` int(10) unsigned NOT NULL,
  `expires` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `refreshtokens_token_unique` (`token`),
  KEY `refreshtokens_user_id_foreign` (`user_id`),
  KEY `refreshtokens_client_id_foreign` (`client_id`),
  CONSTRAINT `refreshtokens_client_id_foreign` FOREIGN KEY (`client_id`) REFERENCES `clients` (`id`),
  CONSTRAINT `refreshtokens_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=571 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `refreshtokens`
--

LOCK TABLES `refreshtokens` WRITE;
/*!40000 ALTER TABLE `refreshtokens` DISABLE KEYS */;
INSERT INTO `refreshtokens` VALUES (570,'qr9CZIX0fSYzenkDUyDQbfipNgNLXX2UvWJAAeNuoiG9v7KqfYjKxHQJ0Xozs1yoQyS1FWq5QRdQdX8zGeoGNsAjG7PcLJKRI7rxTrNFLY4sqsULgxdUrZB3CArHcXd94LhNc4SEaM4uZAk0IwPCQvGMhBGO39FU0aLh3boC7T35LCH9l55XEU8D7Uq5zPMvkJh91Vkw7gUPqVntijtkgLZHEXfkmdTg0bS1e2cLiD8q3ISg9vPhVF70RhoDLX5',15,1,1454619816801);
/*!40000 ALTER TABLE `refreshtokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `roles` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `uuid` varchar(36) NOT NULL,
  `name` varchar(150) NOT NULL,
  `description` varchar(200) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `created_by` int(11) NOT NULL,
  `updated_at` datetime DEFAULT NULL,
  `updated_by` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'fe2e8818-412d-4211-ab3a-e9542a251dd0','Administrator','Administrators','2015-04-28 16:52:42',1,'2015-04-28 16:52:42',1),(2,'0affa9fd-1050-4f36-ae66-69eb4810db60','Editor','Editors','2015-04-28 16:52:42',1,'2015-04-28 16:52:42',1),(3,'50679eb1-ff68-4f39-9eba-05f848c0076d','Author','Authors','2015-04-28 16:52:42',1,'2015-04-28 16:52:42',1),(4,'f1c6ce85-5095-44f3-89ae-4290ebc5e33a','Owner','Blog Owner','2015-04-28 16:52:42',1,'2015-04-28 16:52:42',1),(5,'e227071e-80b8-4986-bfc2-189faad28d15','Reader','Content Consumers','2015-06-03 01:02:30',1,'2015-06-03 01:02:30',1);
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles_users`
--

DROP TABLE IF EXISTS `roles_users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `roles_users` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `role_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles_users`
--

LOCK TABLES `roles_users` WRITE;
/*!40000 ALTER TABLE `roles_users` DISABLE KEYS */;
INSERT INTO `roles_users` VALUES (1,1,1),(2,1,2),(3,3,3),(4,2,4),(5,3,5),(6,2,6),(7,1,7),(8,1,8),(9,3,9),(10,5,10),(11,5,11),(12,3,12),(13,5,13),(14,3,14),(15,1,15),(16,5,16),(17,5,17),(18,3,18),(19,3,19),(20,3,20);
/*!40000 ALTER TABLE `roles_users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `settings`
--

DROP TABLE IF EXISTS `settings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `settings` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `uuid` varchar(36) NOT NULL,
  `key` varchar(150) NOT NULL,
  `value` text,
  `type` varchar(150) NOT NULL DEFAULT 'core',
  `created_at` datetime NOT NULL,
  `created_by` int(11) NOT NULL,
  `updated_at` datetime DEFAULT NULL,
  `updated_by` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `settings_key_unique` (`key`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `settings`
--

LOCK TABLES `settings` WRITE;
/*!40000 ALTER TABLE `settings` DISABLE KEYS */;
INSERT INTO `settings` VALUES (1,'82261811-6c20-4929-8522-1dfb57d6b03c','databaseVersion','014','core','2015-04-28 16:52:42',1,'2015-04-28 16:52:42',1),(2,'dfecb414-5f10-40d5-96ac-e5a6c23231fb','dbHash','714f625d-c9b0-4aa2-81bf-f33162654a7f','core','2015-04-28 16:52:42',1,'2015-04-28 16:52:42',1),(3,'ed5219f3-d76f-4251-b6fd-0a34fcc88494','nextUpdateCheck','1454600316','core','2015-04-28 16:52:42',1,'2016-02-03 16:07:02',1),(4,'9ebe86f0-2e80-4e76-a5de-7eccbb4fb18e','displayUpdateNotification','0.5.0','core','2015-04-28 16:52:42',1,'2016-02-03 16:07:02',1),(5,'27611561-f9f5-4ec3-ae29-0ff85f9d425d','title','aKoma','blog','2015-04-28 16:52:42',1,'2015-06-14 16:51:35',2),(6,'9e132ce9-9444-4ca7-856b-2f7d7c2a8fa6','description','Thoughts, stories and ideas.','blog','2015-04-28 16:52:42',1,'2015-06-14 16:51:35',2),(7,'a76916e8-765d-4638-bff0-bcad4f7d1008','email','devops@akomanet.com','blog','2015-04-28 16:52:42',1,'2015-06-14 16:51:35',2),(8,'595d81ae-31a0-40e8-8178-c70486712041','logo','/content/images/2015/06/aKomalogo_full.png','blog','2015-04-28 16:52:42',1,'2015-06-14 16:51:35',2),(9,'1434758e-3edc-4d7f-8e52-1521bb52817f','cover','/content/images/2015/06/akomahome_image-1.jpeg','blog','2015-04-28 16:52:42',1,'2015-06-14 16:51:35',2),(10,'694d1a20-bcfe-4783-8666-fa63e8165d5c','defaultLang','en_US','blog','2015-04-28 16:52:42',1,'2015-06-14 16:51:35',2),(11,'221f1de6-def1-4d55-9d25-c627d545ee13','postsPerPage','4','blog','2015-04-28 16:52:42',1,'2015-06-14 16:51:35',2),(12,'9589459a-8165-439c-857f-d62fcf56c7a5','forceI18n','true','blog','2015-04-28 16:52:42',1,'2015-06-14 16:51:35',2),(13,'d652bd0e-be8a-462e-a8f6-321d2bf901fb','permalinks','/:slug/','blog','2015-04-28 16:52:42',1,'2015-06-14 16:51:35',2),(14,'c6ed846a-c472-403e-85d8-b39b4adf1cb5','ghost_head','','blog','2015-04-28 16:52:42',1,'2015-06-14 16:51:35',2),(15,'7daf058f-3ac8-44c6-8822-c40ffb34958c','ghost_foot','','blog','2015-04-28 16:52:42',1,'2015-06-14 16:51:35',2),(16,'92feda9b-c4a7-4caa-be9e-c076d1745f6e','labs','{}','blog','2015-04-28 16:52:42',1,'2015-06-14 16:51:35',2),(17,'69d31b4c-f607-4172-a81b-998ee6a7c296','navigation','[{\"label\":\"Home\",\"url\":\"/\"},{\"label\":\"Settings\",\"url\":\"/ghost/settings/\"},{\"label\":\"Signout\",\"url\":\"/ghost/signout/\"}]','blog','2015-04-28 16:52:42',1,'2015-06-14 16:51:35',2),(18,'7d5d6939-570c-4015-ac34-32674247dafd','activeApps','[]','app','2015-04-28 16:52:42',1,'2015-04-28 16:52:42',1),(19,'a4775fc2-767a-4645-a3dd-38902ff7ac40','installedApps','[]','app','2015-04-28 16:52:42',1,'2016-02-03 16:01:14',1),(20,'a74c4415-35bf-4d14-ba67-9bc266b187bf','activeTheme','akoma','theme','2015-04-28 16:52:42',1,'2015-06-14 16:51:35',2);
/*!40000 ALTER TABLE `settings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sso_users`
--

DROP TABLE IF EXISTS `sso_users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sso_users` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `social_id` varchar(255) DEFAULT NULL,
  `network` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `reason` varchar(255) DEFAULT NULL,
  `type_requested` varchar(255) DEFAULT NULL,
  `status` varchar(255) NOT NULL DEFAULT 'new',
  `status_date` datetime DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `created_by` int(11) NOT NULL,
  `updated_at` datetime DEFAULT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `uuid` varchar(36) NOT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sso_users`
--

LOCK TABLES `sso_users` WRITE;
/*!40000 ALTER TABLE `sso_users` DISABLE KEYS */;
INSERT INTO `sso_users` VALUES (1,'Ken','10153551057570695','facebook','kkoch986@gmail.com','I really want to contribute...',NULL,'approved','2015-06-03 01:05:41','2015-06-03 01:05:23',1,'2015-06-08 03:44:45',1,'1ae11e63-b13d-4e0b-945c-417c815bcc1e','https://graph.facebook.com/10153485695100695/picture?width=180&height=180'),(2,'Leonid Geller','849048765171848','facebook','ltgeller@gmail.com','Because I can!',NULL,'approved','2015-06-03 01:13:24','2015-06-03 01:13:05',1,'2015-06-08 03:52:54',1,'3fd31651-ca3c-4af9-8406-25c2efd9aa18','https://graph.facebook.com/834105993332792/picture?width=180&height=180'),(3,'Rob Hanley','136748375','twitter','robhanleyinteractive@gmail.com','Hey it\'s me Rob',NULL,'approved','2015-06-03 03:05:07','2015-06-03 01:37:10',1,'2015-06-18 04:28:43',1,'b63ac6f3-7ef0-4d87-8ca4-45cf55dfe7d1','https://pbs.twimg.com/profile_images/532008946710495232/Sh8Ndpxg.jpeg'),(4,'Johnny Akoma','3213649728','twitter','devops@akomanet.com','Because aKoma is awesome',NULL,'approved','2015-06-03 01:56:02','2015-06-03 01:55:17',1,'2015-06-20 00:29:25',1,'211a808d-137b-4335-8839-9712355efffa','https://pbs.twimg.com/profile_images/609792746883121152/zmvuTh0_.png'),(5,'Chidi Afulezi','5403292','twitter','chidi@akomanet.com','Because I am The Chidi.',NULL,'approved','2015-06-03 02:10:42','2015-06-03 02:07:33',1,'2015-06-21 14:52:16',1,'d93721ac-88f8-4894-888f-6643bad007fd','https://pbs.twimg.com/profile_images/576929589361930241/ee7Ihdtj.jpeg'),(6,'zain verjee ','22568011','twitter','zverjee@gmail.com','this is a test ... ',NULL,'approved','2015-06-05 23:07:28','2015-06-05 23:07:09',1,'2015-06-21 15:21:32',1,'fb0de3d1-7f28-4b9a-ba13-c01b62e8b8ee','https://pbs.twimg.com/profile_images/593846235187970050/yTiH6J2F.jpg'),(8,'Alanna Bass','163480799','twitter','alanna.bass@gmail.com','I love to write!',NULL,'approved','2015-06-10 12:49:11','2015-06-10 12:48:57',1,'2015-06-19 18:58:07',1,'55262d0d-68ac-4892-874c-1455609a66f1','https://pbs.twimg.com/profile_images/600720156260749312/453KKnVF.jpg'),(9,'akoma team','123696074629277','facebook','akoma@akomanet.com','because.',NULL,'approved','2015-06-11 12:49:09','2015-06-11 12:48:11',1,'2015-06-12 00:45:39',8,'39073360-1272-4dd4-b5ed-bf0e55757fca','https://graph.facebook.com/123696074629277/picture?width=180&height=180'),(12,'Naledi','16104256','twitter','naledi@akomanet.com','Please push through for testing',NULL,'approved','2015-06-12 16:00:01','2015-06-12 15:59:34',1,'2016-01-13 13:38:31',15,'ce468495-0514-4b77-be2d-2ba079c892be','https://pbs.twimg.com/profile_images/544001643415863296/EcS24WJ0.jpeg'),(15,'Lenny G','926316302','twitter','ltgeller@yahoo.com','Using my Twitter account',NULL,'approved','2015-06-14 17:14:57','2015-06-14 17:14:39',1,'2016-01-13 13:38:26',15,'7ea9602d-f5e7-41e1-9953-37f71aa8a02b','https://pbs.twimg.com/profile_images/378800000337246496/65e00e286e10251bdc033ace70608c78.jpeg'),(16,'Africa James','3254760826','twitter','ltgeller@comcast.net','testing new user email',NULL,'approved','2015-06-20 21:51:51','2015-06-20 21:51:05',1,'2015-06-21 00:18:34',1,'5a0cb8f2-9007-452a-8821-b27e8c10326b','https://abs.twimg.com/sticky/default_profile_images/default_profile_2.png'),(19,'vikram rajput','755527031219241','facebook','vikram@htmtinteractive.com','this is test message',NULL,'approved','2016-01-13 10:32:37','2016-01-13 10:31:56',1,'2016-01-13 10:35:37',1,'7aaca67e-17df-43ad-8609-b2667f994797','https://graph.facebook.com/755527031219241/picture?width=180&height=180'),(20,'csbug','585611951596348','facebook','csbug@outlook.com','this is test',NULL,'rejected','2016-01-13 11:30:19','2016-01-13 11:30:03',1,'2016-01-29 15:25:02',15,'6b3d33c7-c826-4a64-bc36-ace43c23f16d','https://graph.facebook.com/585611951596348/picture?width=180&height=180'),(21,'new user','10153857258475859','facebook','newuser@gmail.com','this is test',NULL,'approved','2016-01-13 14:16:13','2016-01-13 14:15:37',1,'2016-01-29 15:23:25',15,'8e9f5f16-7e8c-4fe1-af99-0b1f07c8adc7','https://graph.facebook.com/10153857258475859/picture?width=180&height=180'),(22,NULL,'128460540','twitter',NULL,NULL,NULL,'new','2016-01-18 07:34:10','2016-01-18 07:34:10',1,'2016-01-18 07:34:10',1,'4fa2b0d7-c324-44d6-8adf-76e071487d5a','https://pbs.twimg.com/profile_images/2766065306/639745ee312a55b2d50524173cae2014.png'),(23,'Priya Jadhav','440161412851746','facebook','pvolunteer14@gmail.com','I have to contribute to social cause.',NULL,'approved','2016-01-25 10:28:12','2016-01-25 10:26:37',1,'2016-01-27 09:58:23',15,'3da24867-e25d-4b88-91a1-3d262fef5dff','https://graph.facebook.com/440161412851746/picture?width=180&height=180'),(24,'sumit pathak','513730022142727','facebook','sumit.p@interactive.com','Test',NULL,'approved','2016-01-27 09:08:54','2016-01-27 09:08:27',1,'2016-01-27 09:23:30',15,'07789386-d804-4c1b-b39c-37acc06764b0','https://graph.facebook.com/513730022142727/picture?width=180&height=180'),(25,'kvolunteer14','1725350167681195','facebook','kvolunteer14@gmail.com','k.volunteer is under testing',NULL,'approved','2016-01-27 09:52:50','2016-01-27 09:52:03',1,'2016-01-27 10:01:17',15,'910a2478-1d34-4c32-b5d9-941ee252c568','https://graph.facebook.com/1725350167681195/picture?width=180&height=180');
/*!40000 ALTER TABLE `sso_users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tags`
--

DROP TABLE IF EXISTS `tags`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tags` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `uuid` varchar(36) NOT NULL,
  `name` varchar(150) NOT NULL,
  `slug` varchar(150) NOT NULL,
  `description` varchar(200) DEFAULT NULL,
  `image` text,
  `hidden` tinyint(1) NOT NULL DEFAULT '0',
  `parent_id` int(11) DEFAULT NULL,
  `meta_title` varchar(150) DEFAULT NULL,
  `meta_description` varchar(200) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `created_by` int(11) NOT NULL,
  `updated_at` datetime DEFAULT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `sortable` tinyint(1) NOT NULL DEFAULT '0',
  `in_menu` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `tags_slug_unique` (`slug`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tags`
--

LOCK TABLES `tags` WRITE;
/*!40000 ALTER TABLE `tags` DISABLE KEYS */;
INSERT INTO `tags` VALUES (11,'3b5839c2-9923-4211-a0ff-4d8fe9b47108','Faves','faves',NULL,NULL,0,NULL,NULL,NULL,'2016-01-13 14:54:39',15,'2016-01-13 14:54:39',15,0,0),(14,'168de2f3-5265-4347-9262-0a54fe34f04d','Live','live',NULL,NULL,0,NULL,NULL,NULL,'2016-01-26 12:36:41',16,'2016-01-26 12:36:41',16,0,0);
/*!40000 ALTER TABLE `tags` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_post_likes`
--

DROP TABLE IF EXISTS `user_post_likes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_post_likes` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `post_id` int(10) unsigned NOT NULL,
  `user_id` int(10) unsigned NOT NULL,
  `created_at` datetime NOT NULL,
  `created_by` int(11) NOT NULL,
  `updated_at` datetime DEFAULT NULL,
  `updated_by` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_post_likes_post_id_foreign` (`post_id`),
  KEY `user_post_likes_user_id_foreign` (`user_id`),
  CONSTRAINT `user_post_likes_post_id_foreign` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`),
  CONSTRAINT `user_post_likes_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_post_likes`
--

LOCK TABLES `user_post_likes` WRITE;
/*!40000 ALTER TABLE `user_post_likes` DISABLE KEYS */;
INSERT INTO `user_post_likes` VALUES (25,74,15,'2016-01-13 14:23:01',1,'2016-01-13 14:23:01',1),(26,85,15,'2016-01-14 10:11:10',1,'2016-01-14 10:11:10',1),(27,91,17,'2016-01-18 07:58:30',1,'2016-01-18 07:58:30',1),(28,91,15,'2016-01-20 15:06:48',1,'2016-01-20 15:06:48',1),(29,93,17,'2016-01-25 09:18:56',1,'2016-01-25 09:18:56',1),(30,94,15,'2016-01-26 15:11:28',1,'2016-01-26 15:11:28',1),(31,86,15,'2016-01-26 15:11:45',1,'2016-01-26 15:11:45',1),(34,99,15,'2016-01-27 17:02:33',1,'2016-01-27 17:02:33',1),(35,102,15,'2016-02-02 16:10:23',1,'2016-02-02 16:10:23',1);
/*!40000 ALTER TABLE `user_post_likes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `uuid` varchar(36) NOT NULL,
  `name` varchar(150) NOT NULL,
  `slug` varchar(150) NOT NULL,
  `password` varchar(60) NOT NULL,
  `email` varchar(254) NOT NULL,
  `image` text,
  `cover` text,
  `bio` varchar(200) DEFAULT NULL,
  `website` text,
  `location` text,
  `accessibility` text,
  `status` varchar(150) NOT NULL DEFAULT 'active',
  `language` varchar(6) NOT NULL DEFAULT 'en_US',
  `meta_title` varchar(150) DEFAULT NULL,
  `meta_description` varchar(200) DEFAULT NULL,
  `last_login` datetime DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `created_by` int(11) NOT NULL,
  `updated_at` datetime DEFAULT NULL,
  `updated_by` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_slug_unique` (`slug`),
  UNIQUE KEY `users_email_unique` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'f3b3ba2b-76af-444a-a8bc-8532225e421c','Ken','ken','$2a$10$NHR8VneQnrO0owy1eOheNuYFgHrD3GyVpqNp6jsnO3S3Degkii.tO','kkoch986@gmail.com','https://graph.facebook.com/10153485695100695/picture?width=180&height=180',NULL,'this is my bio, testing the edit functionality.',NULL,'Ethiopia',NULL,'active','en_US',NULL,NULL,'2015-06-21 15:11:05','2015-04-28 16:52:42',1,'2015-06-21 15:11:05',1),(2,'e0b92022-0782-49e1-b9ad-6c7d3a9aceb8','Leonid Geller','leonid','$2a$10$0eweAbo2yMUbOgUjbFQ2we5ss7C/0rrgufuLZxvO6guHRxud4BH/i','ltgeller@gmail.com','https://graph.facebook.com/834105993332792/picture?width=180&height=180',NULL,'This is a test bio for a test author',NULL,'US',NULL,'active','en_US',NULL,NULL,'2015-06-21 15:01:22','2015-05-09 18:12:17',1,'2015-06-21 15:01:22',2),(3,'b322ff49-8219-4bfe-a5a9-bc4e508d5440','zain verjee ','zain','$2a$10$1ZDbkTwMiaeEsKPNo1OpwOYmZevMfw0J9U.dAjV0KwZ4aimpqrfWC','zverjee@gmail.com','https://pbs.twimg.com/profile_images/593846235187970050/yTiH6J2F.jpg',NULL,' Zain Verjee is one of the worldâ€™s most respected and recognized journalists, with 14 years of experience at CNN as an anchor, reporter, and power interviewer.','http://www.akomanet.com','US',NULL,'active','en_US',NULL,NULL,'2015-06-21 15:21:34','2015-05-09 18:25:41',2,'2015-06-21 15:21:34',3),(5,'5d7db7a7-de3e-4a58-86ef-fd8aacdb88ed','Alanna Bass','alanna','$2a$10$JvjmUzvtVBlCb5J2FDpezOYQxTFXY0qLx32SalSiR6N0VUt42U9z2','alanna.bass@gmail.com','https://pbs.twimg.com/profile_images/600720156260749312/453KKnVF.jpg',NULL,'From Georgia living in NYC!! ðŸ’ƒðŸ½ðŸ’ƒðŸ½ðŸ’ƒðŸ½ðŸ˜˜',NULL,'Kenya',NULL,'reset_password','en_US',NULL,NULL,'2015-06-02 18:56:38','2015-05-09 18:47:47',2,'2015-06-19 18:58:07',1),(7,'4c4faebd-8e5a-4931-b930-2cbd365996ef','Johnny Akoma','johnny','$2a$10$5V4m9xenaBmsegUQvJPVcO2xQArxvwL8aJcK6l/Xtd6pp/MEnPjHO','devops@akomanet.com','https://pbs.twimg.com/profile_images/609792746883121152/zmvuTh0_.png',NULL,NULL,NULL,NULL,NULL,'reset_password','en_US',NULL,NULL,'2015-06-20 00:38:46','2015-06-03 01:56:03',1,'2015-06-20 00:38:46',7),(8,'320d6b50-67f7-405f-b070-4c8abfc38795','Chidi Afulezi','chidi-afulezi','$2a$10$CmCSGOLz6CEXr8YbqShh4.d3JajP6GlhG1/qIGqjWwWXM7D6TEVda','chidi@akomanet.com','https://pbs.twimg.com/profile_images/576929589361930241/ee7Ihdtj.jpeg',NULL,'I am The Chidi. ',NULL,'Nigeria',NULL,'active','en_US',NULL,NULL,'2015-06-21 14:52:26','2015-06-03 02:10:42',1,'2015-06-21 14:52:26',8),(9,'b74e5394-f4a5-453a-bb7d-a04c1005e878','Rob Hanley','rob','$2a$10$ogAu8TttixJD5cRF8RoZ2ujOWQA.zausvSFs5vh6B1QMAjpHhRdSC','robhanleyinteractive@gmail.com','https://pbs.twimg.com/profile_images/532008946710495232/Sh8Ndpxg.jpeg',NULL,NULL,NULL,NULL,NULL,'reset_password','en_US',NULL,NULL,'2015-06-17 17:24:23','2015-06-03 03:05:08',1,'2015-06-18 04:28:43',1),(10,'bafaf82e-e2ea-49d3-a104-11a909c67001','akoma team','akoma','$2a$10$UrzXHRSwy5lG4353sw0sX.aoFwavH303UpC9uAkNhxoWCnk4UGT0e','akoma@akomanet.com',NULL,NULL,NULL,NULL,NULL,NULL,'reset_password','en_US',NULL,NULL,NULL,'2015-06-11 12:49:09',1,'2015-06-12 00:45:39',8),(11,'4c328610-d66a-45b3-a54e-00ed71190dff','Naledi','naledi','$2a$10$ZO9AehBhm38CnQnPbbJWeeH8clo9EbDab5/xUWvMj0JxIbRgX.GDi','naledi@akomanet.com','https://pbs.twimg.com/profile_images/544001643415863296/EcS24WJ0.jpeg',NULL,NULL,NULL,NULL,NULL,'reset_password','en_US',NULL,NULL,'2015-06-19 17:54:35','2015-06-12 16:00:01',1,'2016-01-13 13:38:31',15),(13,'f91dfae6-4be4-4fe7-abe3-b592ea112e0a','Lenny G','lenny','$2a$10$zAWLa4ekvSS1C0lxQNKL2ely0lHxC5XH3WRYfxlU2e8IPeUvdpdoq','ltgeller@yahoo.com','https://pbs.twimg.com/profile_images/378800000337246496/65e00e286e10251bdc033ace70608c78.jpeg',NULL,NULL,NULL,NULL,NULL,'reset_password','en_US',NULL,NULL,'2015-06-14 17:31:01','2015-06-14 17:14:58',1,'2016-01-13 13:38:26',15),(14,'2cb2831d-e14e-47be-8b4e-b1f8c2ad4687','Africa James','africa','$2a$10$2w15nsMlUIMvtpOIjBxDOuHBHgEqjfUC7XZLNR54CzVN0D02UYxn6','ltgeller@comcast.net','https://abs.twimg.com/sticky/default_profile_images/default_profile_2.png',NULL,NULL,NULL,NULL,NULL,'active','en_US',NULL,NULL,'2015-06-21 00:18:36','2015-06-20 21:51:52',1,'2015-06-21 00:18:36',14),(15,'54dce0c2-95ec-4827-98e9-f27618986c1e','vikram rajput','vikram','$2a$10$QLht8o3nEDQUPJu0MHhvF.nSqiDsGBqagWkZ2V/yJGTWW3ReyqzHu','vikram@htmtinteractive.com','https://graph.facebook.com/755527031219241/picture?width=180&height=180',NULL,NULL,NULL,NULL,NULL,'active','en_US',NULL,NULL,'2016-02-03 16:03:36','2016-01-13 10:32:38',1,'2016-02-03 16:03:36',15),(16,'0ada42a9-8616-4524-81cf-d364dd122783','csbug','csbug','$2a$10$ZDM/xz4wFWUaMkhfUN7jiONFu903BS1y7RfpsyYJ59Ws8nLnnahe2','csbug@outlook.com','https://graph.facebook.com/585611951596348/picture?width=180&height=180',NULL,NULL,NULL,NULL,NULL,'active','en_US',NULL,NULL,'2016-01-27 16:18:24','2016-01-13 11:30:20',1,'2016-01-29 15:23:24',15),(17,'19b1f7fe-dfb2-4ed2-9df1-122926d8666f','new user','new','$2a$10$YhP1PTC24s.2frNkGVi3YejvPsVO6.cFvPp/bU43kni/NW6NZIHNq','newuser@gmail.com','https://graph.facebook.com/10153857258475859/picture?width=180&height=180',NULL,NULL,NULL,NULL,NULL,'active','en_US',NULL,NULL,'2016-01-29 15:23:35','2016-01-13 14:16:14',1,'2016-01-29 15:23:35',17),(18,'ef8a18b0-137b-4bf3-9015-ee3e170dc0ee','Priya Jadhav','priya','$2a$10$iJ41qhXkRhstyidgnoRh3OHYb7GHBGdi1j8Z0gCO5yAZ6M1D/MSye','pvolunteer14@gmail.com','https://graph.facebook.com/440161412851746/picture?width=180&height=180',NULL,NULL,NULL,NULL,NULL,'active','en_US',NULL,NULL,'2016-01-27 09:55:13','2016-01-25 10:28:13',1,'2016-01-27 09:58:23',15),(19,'9fce174b-07c4-42d3-9e1f-f7c6e2d11c18','sumit pathak','sumit','$2a$10$vXx1KMYHgvB3ECFpgIwU9.u33RKquu1bqCVu0je3eQuJdViWGC3HC','sumit.p@interactive.com','https://graph.facebook.com/513730022142727/picture?width=180&height=180',NULL,NULL,NULL,NULL,NULL,'active','en_US',NULL,NULL,'2016-01-27 11:02:00','2016-01-27 09:08:55',1,'2016-01-27 11:02:00',19),(20,'0e330b02-933e-4b81-b21b-34c5e84ed4a0','kvolunteer14','kvolunteer14','$2a$10$VWvCyYpG0OYizZo3vPnPwuNd5Pweb1lWj0fvF38qwbUR9.tgmaRBi','kvolunteer14@gmail.com','https://graph.facebook.com/1725350167681195/picture?width=180&height=180',NULL,NULL,NULL,NULL,NULL,'active','en_US',NULL,NULL,'2016-01-27 09:55:15','2016-01-27 09:52:51',1,'2016-01-27 10:01:17',15);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2016-02-09  7:35:27
