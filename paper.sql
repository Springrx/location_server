
-- ----------------------------
-- Table structure for paper
-- ----------------------------
DROP TABLE IF EXISTS  `paper`;
CREATE TABLE `paper` (`id` int(11) unsigned NOT NULL AUTO_INCREMENT,`owner_id` int(11) NOT NULL,`type` int(11) NOT NULL,`author` varchar(200) DEFAULT NULL,`title` varchar(200) DEFAULT NULL,`howpublished` varchar(200) NOT NULL,`year` varchar(20) NOT NULL,`month` varchar(20) NOT NULL,`volume` varchar(20) NOT NULL,`number` varchar(20) NOT NULL,`pp` varchar(20) NOT NULL,`location` varchar(100) NOT NULL,`publisher` varchar(200) NOT NULL,`url` varchar(200) NOT NULL,`DOI` varchar(200) NOT NULL,`create_date` varchar(100) NOT NULL,`hash` varchar(200) NOT NULL,`storage` varchar(200) NOT NULL,`dup` varchar(100) NOT NULL,`reserved` varchar(200) NOT NULL,`created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,`updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,PRIMARY KEY (`id`)) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


-- ----------------------------
-- Table structure for profolio
-- ----------------------------
DROP TABLE IF EXISTS  `profolio`;
CREATE TABLE `profolio` (`id` int(11) unsigned NOT NULL AUTO_INCREMENT,`owner_id` int(11) NOT NULL,`rwid` varchar(200) DEFAULT NULL,`rid` varchar(200) DEFAULT NULL,`name` varchar(200) NOT NULL,`paper_list` varchar(200) NOT NULL,`description` varchar(200) NOT NULL,`create_date` varchar(200) NOT NULL,`reserved` varchar(200) NOT NULL,`created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,`updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, PRIMARY KEY (`id`)) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;