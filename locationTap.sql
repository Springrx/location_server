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
  `password` varchar(16) DEFAULT NULL,
  `avatar_url` varchar(200) NOT NULL,
  `is_manager` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

BEGIN;
INSERT INTO `user` VALUES(1,"kc","kctest","",0,'2022/11/08 08:08:08', '2022/11/08 08:08:08');
INSERT INTO `user` VALUES(2,"admin","loca123","",1,'2022/12/08 08:08:08', '2022/12/08 08:08:08');
INSERT INTO `user` VALUES(3,"fjj","fjjtest","",0,'2022/11/09 08:08:08', '2022/11/09 08:08:08');
COMMIT;

-- ----------------------------
-- Table structure for post
-- ----------------------------
DROP TABLE IF EXISTS  `locationTap`.`post`;
CREATE TABLE `locationTap`.`post` (
  `post_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(10) unsigned NOT NULL,
  `location_x` DECIMAL(8,5) NOT NULL,
  `location_y` DECIMAL(7,5) NOT NULL,
  `text` varchar(2000) DEFAULT NULL,
  `video_url` varchar(200) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`post_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

BEGIN;
INSERT INTO `post` VALUES(1,1,128.32145,35.12345,"kctest","kctestvideo",'2022/11/08 08:08:08', '2022/11/08 08:08:08');
-- INSERT INTO `post` VALUES(2,1,"loca123",1,'2022/12/08 08:08:08', '2022/12/08 08:08:08');
-- INSERT INTO `post` VALUES(3,3,"fjjtest",0,'2022/11/09 08:08:08', '2022/11/09 08:08:08');
COMMIT;


-- ----------------------------
-- Table structure for video
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
INSERT INTO `photo` VALUES(1,1,'xxx','2022/11/08 08:08:08', '2022/11/08 08:08:08');
INSERT INTO `photo` VALUES(2,2,'xxx','2022/11/08 08:08:08', '2022/11/08 08:08:08');
COMMIT;