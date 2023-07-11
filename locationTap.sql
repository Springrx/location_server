-- MySQL dump 10.13  Distrib 5.7.37, for Linux (x86_64)
--
-- Host: localhost    Database: workorder_db
-- ------------------------------------------------------
-- Server version	5.7.37-0ubuntu0.18.04.1

--
-- Table structure for table `locationTap`
--
SET NAMES utf8mb4;

DROP SCHEMA IF EXISTS `locationTap` ;
CREATE SCHEMA IF NOT EXISTS `locationTap` DEFAULT CHARACTER SET utf8mb4;
USE `locationTap`;

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS  `locationTap`.`user`;
CREATE TABLE `locationTap`.`user` (
  `user_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(16) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `avatar_url` varchar(200) NOT NULL,
  `is_manager` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

BEGIN;
INSERT INTO `user` VALUES(1,"kc","kctest","https://p.qqan.com/up/2020-12/16070652276806379.jpg",0,'2022/11/08 08:08:08', '2022/11/08 08:08:08');
INSERT INTO `user` VALUES(2,"admin","loca123","https://www.y-droid.com/userStudy/ava.png",1,'2022/12/08 08:08:08', '2022/12/08 08:08:08');
INSERT INTO `user` VALUES(3,"fjj","fjjtest","https://p.qqan.com/up/2021-3/16151771636852522.jpg",0,'2022/11/09 08:08:08', '2022/11/09 08:08:08');
COMMIT;

-- ----------------------------
-- Table structure for post
-- ----------------------------
DROP TABLE IF EXISTS  `locationTap`.`post`;
CREATE TABLE `locationTap`.`post` (
  `post_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(10) unsigned NOT NULL,
  -- `location` point NOT NULL,
  `location_x` DECIMAL(8,5) NOT NULL,
  `location_y` DECIMAL(7,5) NOT NULL,
  `text` varchar(2000) DEFAULT NULL,
  `video_url` varchar(200) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`post_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

BEGIN;
INSERT INTO `post` VALUES(1,1,120.32145,30.12345,"kctest",'https://assets.mixkit.co/videos/preview/mixkit-pet-owner-playing-with-a-cute-cat-1779-large.mp4','2022/11/08 08:08:08', '2022/11/08 08:08:08');
INSERT INTO `post` VALUES(2,1,120.32245,30.12345,"loca123",'','2022/12/08 08:08:08', '2022/12/08 08:08:08');
INSERT INTO `post` VALUES(3,3,120.32155,30.12345,"fjjtest",'','2022/11/09 08:08:08', '2022/11/09 08:08:08');
COMMIT;


-- ----------------------------
-- Table structure for photo
-- ----------------------------
DROP TABLE IF EXISTS  `locationTap`.`photo`;
CREATE TABLE `locationTap`.`photo` (
  `photo_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `post_id` int(10) unsigned NOT NULL,
  `url` varchar(200) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`photo_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

BEGIN;
INSERT INTO `photo` VALUES(1,1,'https://www.qqkw.com/d/file/p/2018/07-23/05df08cf165170a227437ec529901bcd.jpg','2022/11/08 08:08:08', '2022/11/08 08:08:08');
INSERT INTO `photo` VALUES(2,1,'https://tupian.qqw21.com/article/UploadPic/2021-1/20211722215735941.jpg','2022/11/08 08:08:08', '2022/11/08 08:08:08');
INSERT INTO `photo` VALUES(3,1,'https://pic.qqtn.com/up/2017-12/2017120910404438304.jpg','2022/11/08 08:08:08', '2022/11/08 08:08:08');
INSERT INTO `photo` VALUES(4,1,'https://tupian.qqw21.com/article/UploadPic/2021-1/20211722215735941.jpg','2022/11/08 08:08:08', '2022/11/08 08:08:08');
INSERT INTO `photo` VALUES(5,3,'https://pic.qqtn.com/up/2017-12/2017120910404438304.jpg','2022/11/08 08:08:08', '2022/11/08 08:08:08');
INSERT INTO `photo` VALUES(6,3,'https://tupian.qqw21.com/article/UploadPic/2021-1/20211722215735941.jpg','2022/11/08 08:08:08', '2022/11/08 08:08:08');
COMMIT;

-- ----------------------------
-- Table structure for comment
-- ----------------------------
DROP TABLE IF EXISTS  `locationTap`.`comment`;
CREATE TABLE `locationTap`.`comment` (
  `comment_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `post_id` int(10) unsigned NOT NULL,
  `user_id` int(10) unsigned NOT NULL,
  `text` varchar(2000) NOT NULL,
  `media_url` varchar(200) NOT NULL,
  `media_type` varchar(200) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`comment_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

BEGIN;
INSERT INTO `comment` VALUES(1,1,1,"这是一条评论",'https://pic.qqtn.com/up/2017-12/2017120910404438304.jpg','image','2022/11/08 08:08:08', '2022/11/08 08:08:08');
INSERT INTO `comment` VALUES(2,2,1,"",'https://assets.mixkit.co/videos/preview/mixkit-pet-owner-playing-with-a-cute-cat-1779-large.mp4','video','2022/11/08 08:08:08', '2022/11/08 08:08:08');
COMMIT;