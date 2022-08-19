-- MySQL dump 10.13  Distrib 8.0.28, for Win64 (x86_64)
--
-- Host: i7e103.p.ssafy.io    Database: smnd
-- ------------------------------------------------------
-- Server version	8.0.30-0ubuntu0.20.04.2

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `accusation_infos`
--

DROP TABLE IF EXISTS `accusation_infos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `accusation_infos` (
  `uid` int NOT NULL AUTO_INCREMENT,
  `accusation_info` varchar(300) NOT NULL,
  `creater` varchar(20) DEFAULT NULL,
  `updater` varchar(20) DEFAULT NULL,
  `create_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`uid`,`accusation_info`),
  UNIQUE KEY `accusation_info` (`accusation_info`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `accusation_infos`
--

LOCK TABLES `accusation_infos` WRITE;
/*!40000 ALTER TABLE `accusation_infos` DISABLE KEYS */;
INSERT INTO `accusation_infos` VALUES (1,'의도적으로 게임을 망침',NULL,NULL,'2022-07-30 08:32:35','2022-07-30 08:32:35'),(2,'게임에서 탈주',NULL,NULL,'2022-07-30 08:32:35','2022-07-30 08:32:35'),(3,'폭언 욕설',NULL,NULL,'2022-07-30 08:32:35','2022-07-30 08:32:35');
/*!40000 ALTER TABLE `accusation_infos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `accusations`
--

DROP TABLE IF EXISTS `accusations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `accusations` (
  `uid` int NOT NULL AUTO_INCREMENT,
  `accusation_infos_uid` int DEFAULT NULL,
  `reporter_uid` int NOT NULL,
  `attacker_uid` int NOT NULL,
  `creater` varchar(20) DEFAULT NULL,
  `updater` varchar(20) DEFAULT NULL,
  `create_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `game_conference_room_uid` int DEFAULT '1',
  PRIMARY KEY (`uid`),
  KEY `accusations_accusation_infos_uid_idx` (`accusation_infos_uid`),
  KEY `accusations_users_uid_idx` (`reporter_uid`),
  KEY `accusations_users_uid2_idx` (`attacker_uid`),
  KEY `fk_accusations` (`game_conference_room_uid`),
  CONSTRAINT `accusations_accusations_infos_uid` FOREIGN KEY (`accusation_infos_uid`) REFERENCES `accusation_infos` (`uid`),
  CONSTRAINT `accusations_users_uid` FOREIGN KEY (`reporter_uid`) REFERENCES `users` (`uid`),
  CONSTRAINT `accusations_users_uid2` FOREIGN KEY (`attacker_uid`) REFERENCES `users` (`uid`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `accusations`
--

LOCK TABLES `accusations` WRITE;
/*!40000 ALTER TABLE `accusations` DISABLE KEYS */;
INSERT INTO `accusations` VALUES (1,1,61,63,NULL,NULL,'2022-07-30 08:34:29','2022-08-05 02:11:04',3),(2,1,62,63,NULL,NULL,'2022-07-30 08:34:29','2022-08-05 02:11:04',3),(3,1,64,63,NULL,NULL,'2022-07-30 08:34:29','2022-08-05 02:11:04',3),(4,2,65,63,NULL,NULL,'2022-07-30 08:34:29','2022-08-05 02:11:04',3);
/*!40000 ALTER TABLE `accusations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `board_category_large_info`
--

DROP TABLE IF EXISTS `board_category_large_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `board_category_large_info` (
  `uid` smallint NOT NULL,
  `category_large_name` varchar(60) NOT NULL,
  PRIMARY KEY (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `board_category_large_info`
--

LOCK TABLES `board_category_large_info` WRITE;
/*!40000 ALTER TABLE `board_category_large_info` DISABLE KEYS */;
INSERT INTO `board_category_large_info` VALUES (1,'커뮤니티'),(2,'뉴스'),(3,'가이드');
/*!40000 ALTER TABLE `board_category_large_info` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `board_category_middle_info`
--

DROP TABLE IF EXISTS `board_category_middle_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `board_category_middle_info` (
  `uid` smallint NOT NULL,
  `category_middle_name` varchar(60) NOT NULL,
  PRIMARY KEY (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `board_category_middle_info`
--

LOCK TABLES `board_category_middle_info` WRITE;
/*!40000 ALTER TABLE `board_category_middle_info` DISABLE KEYS */;
INSERT INTO `board_category_middle_info` VALUES (1,'자유게시글'),(2,'소식'),(3,'업데이트'),(4,'댓글');
/*!40000 ALTER TABLE `board_category_middle_info` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `boards`
--

DROP TABLE IF EXISTS `boards`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `boards` (
  `uid` int NOT NULL AUTO_INCREMENT,
  `category_large` int NOT NULL,
  `category_middle` int NOT NULL,
  `title` varchar(300) DEFAULT NULL,
  `content` varchar(3000) NOT NULL,
  `user_uid` int NOT NULL,
  `reg_time` timestamp NULL DEFAULT NULL,
  `view_count` int NOT NULL,
  `img` varchar(300) DEFAULT NULL,
  `creater` varchar(20) DEFAULT NULL,
  `updater` varchar(20) DEFAULT NULL,
  `create_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `board_list` int DEFAULT NULL,
  PRIMARY KEY (`uid`),
  KEY `boards_users_uid` (`user_uid`),
  KEY `FKq64pcckiie93y2xxriq500wii` (`board_list`),
  CONSTRAINT `boards_users_uid` FOREIGN KEY (`user_uid`) REFERENCES `users` (`uid`),
  CONSTRAINT `FKq64pcckiie93y2xxriq500wii` FOREIGN KEY (`board_list`) REFERENCES `users` (`uid`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `boards`
--

LOCK TABLES `boards` WRITE;
/*!40000 ALTER TABLE `boards` DISABLE KEYS */;
INSERT INTO `boards` VALUES (3,2,3,'바뀐 제목20220801 13:54','내용 확인 부탁부탁부탁11',31,NULL,0,NULL,NULL,NULL,'2022-07-29 07:32:31','2022-08-02 05:38:42',NULL),(4,2,3,'0.0.1 세모난다 업데이트 노트','세모난다 베타버전 출시일 18일 전',31,NULL,0,NULL,NULL,NULL,'2022-07-29 07:46:57','2022-07-29 07:46:57',NULL),(15,1,1,'sample_title1','sample content1 난 누구.. 여긴 어디',1,'2022-07-30 08:00:55',0,NULL,NULL,NULL,'2022-07-30 08:00:55','2022-07-30 08:00:55',NULL),(16,1,1,'sample_title2','sample content2 배고프다',1,'2022-07-30 08:00:55',0,NULL,NULL,NULL,'2022-07-30 08:00:55','2022-07-30 08:00:55',NULL),(17,1,1,'sample_title3','sample content3 할게 많군',1,'2022-07-30 08:00:55',0,NULL,NULL,NULL,'2022-07-30 08:00:55','2022-07-30 08:00:55',NULL),(18,1,1,'sample_title4','sample content4 쉬쉬',1,'2022-07-30 08:00:55',0,NULL,NULL,NULL,'2022-07-30 08:00:55','2022-07-30 08:00:55',NULL),(20,2,3,'0.0.1 세모난다 업데이트 노트','세모난다 베타버전 출시일 18일 전',31,NULL,0,NULL,NULL,NULL,'2022-08-01 02:42:58','2022-08-01 02:42:58',NULL),(22,1,3,'0.0.1 세모난다 업데이트 노트','세모난다 베타버전 출시일 18일 전',31,NULL,0,NULL,NULL,NULL,'2022-08-01 03:09:51','2022-08-01 03:09:51',NULL),(23,1,3,'0.0.1 세모난다 업데이트 노트22','세모난다 베타버전 출시일 18일 전',31,NULL,0,NULL,NULL,NULL,'2022-08-01 03:12:34','2022-08-01 03:12:34',NULL),(26,2,3,'0.0.1 세모난다 업데이트 노트','세모난다 베타버전 출시일 18일 전',40,NULL,0,NULL,NULL,NULL,'2022-08-02 02:51:04','2022-08-02 02:51:04',NULL),(27,2,3,'0.0.2 세모난다 업데이트 노트','세모난다 베타버전 출시일 18일 전',40,NULL,0,NULL,NULL,NULL,'2022-08-02 06:30:46','2022-08-02 06:30:46',NULL),(28,2,3,'0.0.1 세모난다 업데이트 노트','세모난다 베타버전 출시일 18일 전',34,NULL,0,NULL,NULL,NULL,'2022-08-02 06:34:33','2022-08-02 06:34:33',NULL),(29,2,3,'0.0.1 세모난다 업데이트 노트','세모난다 베타버전 출시일 18일 전',34,NULL,0,NULL,NULL,NULL,'2022-08-02 06:35:30','2022-08-02 06:35:30',NULL),(30,2,3,'0.0.1 세모난다 업데이트 노트','세모난다 베타버전 출시일 18일 전',34,NULL,0,NULL,NULL,NULL,'2022-08-02 06:38:19','2022-08-02 06:38:19',NULL),(31,2,3,'0.0.1 세모난다 업데이트 노트','세모난다 베타버전 출시일 18일 전',34,'2022-08-02 06:40:16',0,NULL,NULL,NULL,'2022-08-02 06:40:15','2022-08-02 06:40:15',NULL);
/*!40000 ALTER TABLE `boards` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `friends`
--

DROP TABLE IF EXISTS `friends`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `friends` (
  `uid` int NOT NULL AUTO_INCREMENT,
  `friend_requester_uid` int NOT NULL,
  `friend_receiver_uid` int NOT NULL,
  `creater` varchar(20) DEFAULT NULL,
  `updater` varchar(20) DEFAULT NULL,
  `create_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`uid`),
  KEY `friends_users_uid_idx` (`friend_requester_uid`),
  KEY `friends_users_uid2_idx` (`friend_receiver_uid`),
  CONSTRAINT `friends_users_uid` FOREIGN KEY (`friend_requester_uid`) REFERENCES `users` (`uid`),
  CONSTRAINT `friends_users_uid2` FOREIGN KEY (`friend_receiver_uid`) REFERENCES `users` (`uid`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `friends`
--

LOCK TABLES `friends` WRITE;
/*!40000 ALTER TABLE `friends` DISABLE KEYS */;
INSERT INTO `friends` VALUES (3,65,61,NULL,NULL,'2022-07-30 08:08:27','2022-07-30 08:08:27'),(4,61,65,NULL,NULL,'2022-07-30 08:08:27','2022-07-30 08:08:27'),(5,62,64,NULL,NULL,'2022-07-30 08:08:27','2022-07-30 08:08:27'),(6,62,65,NULL,NULL,'2022-07-30 08:08:27','2022-07-30 08:08:27'),(7,35,36,NULL,NULL,'2022-08-05 04:24:53','2022-08-05 04:24:53'),(8,35,36,NULL,NULL,'2022-08-07 07:01:37','2022-08-07 07:01:37'),(9,35,36,NULL,NULL,'2022-08-07 13:35:09','2022-08-07 13:35:09'),(10,31,34,NULL,NULL,'2022-08-07 13:41:00','2022-08-07 13:41:00'),(11,70,34,NULL,NULL,'2022-08-07 14:16:38','2022-08-07 14:16:38'),(12,35,34,NULL,NULL,'2022-08-07 14:54:03','2022-08-07 14:54:03'),(13,35,34,NULL,NULL,'2022-08-08 04:35:56','2022-08-08 04:35:56'),(14,31,34,NULL,NULL,'2022-08-08 04:36:23','2022-08-08 04:36:23');
/*!40000 ALTER TABLE `friends` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `game_categories`
--

DROP TABLE IF EXISTS `game_categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `game_categories` (
  `uid` int NOT NULL AUTO_INCREMENT,
  `subject` varchar(60) NOT NULL,
  `subject_count` int NOT NULL DEFAULT '0',
  `subject_img` varchar(300) DEFAULT NULL,
  `creater` varchar(20) DEFAULT NULL,
  `updater` varchar(20) DEFAULT NULL,
  `create_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`uid`),
  UNIQUE KEY `subject` (`subject`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `game_categories`
--

LOCK TABLES `game_categories` WRITE;
/*!40000 ALTER TABLE `game_categories` DISABLE KEYS */;
INSERT INTO `game_categories` VALUES (1,'1',2,'이미지',NULL,NULL,'2022-07-28 00:47:42','2022-08-09 02:28:35'),(2,'일상생활',38,'test img url',NULL,NULL,'2022-07-30 08:37:49','2022-08-19 00:26:17'),(3,'음식',3,'test img url',NULL,NULL,'2022-07-30 08:37:49','2022-08-18 00:25:19'),(4,'개발자',9,'test img url',NULL,NULL,'2022-07-30 08:37:49','2022-08-19 01:21:02'),(5,'MBTI',2,'test img url',NULL,NULL,'2022-07-30 08:37:49','2022-08-09 02:28:35'),(6,'연애',3,'test img url',NULL,NULL,'2022-07-30 08:37:49','2022-08-18 14:44:08'),(7,'normal',3,'이미지',NULL,NULL,'2022-08-05 07:15:55','2022-08-18 14:40:35'),(8,'극과 극',75,'test img url',NULL,NULL,'2022-08-08 04:47:20','2022-08-17 08:27:21'),(9,'교육',2,'test img url',NULL,NULL,'2022-08-08 04:47:26','2022-08-09 02:28:35');
/*!40000 ALTER TABLE `game_categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `game_category_topics`
--

DROP TABLE IF EXISTS `game_category_topics`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `game_category_topics` (
  `uid` int NOT NULL AUTO_INCREMENT,
  `category_uid` int NOT NULL,
  `topic` varchar(300) DEFAULT NULL,
  `answer_A` varchar(300) NOT NULL,
  `answer_B` varchar(300) NOT NULL,
  `team_A_win_count` int NOT NULL DEFAULT '0',
  `team_B_win_count` int NOT NULL DEFAULT '0',
  `creater` varchar(20) DEFAULT NULL,
  `updater` varchar(20) DEFAULT NULL,
  `create_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`uid`),
  KEY `game_category_topics_game_categories_uid_idx` (`uid`),
  KEY `game_category_topics_game_categories_subject` (`category_uid`),
  CONSTRAINT `game_category_topics_game_categories_subject` FOREIGN KEY (`category_uid`) REFERENCES `game_categories` (`uid`)
) ENGINE=InnoDB AUTO_INCREMENT=141 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `game_category_topics`
--

LOCK TABLES `game_category_topics` WRITE;
/*!40000 ALTER TABLE `game_category_topics` DISABLE KEYS */;
INSERT INTO `game_category_topics` VALUES (22,7,NULL,' ',' ',0,0,NULL,NULL,'2022-08-05 07:17:27','2022-08-05 07:17:27'),(23,2,'','여름에 히터 틀고 자기','겨울에 에어컨 켜고 자기',9,9,NULL,NULL,'2022-08-08 04:55:37','2022-08-19 00:29:54'),(24,2,'','자는데 모기 소리 들리기(물리지는 않음)','소리는 없는데 모기 물리기',9,4,NULL,NULL,'2022-08-08 04:56:35','2022-08-18 11:02:52'),(25,2,'','10년 전 과거로 가기','10년 후 미래로 가기',14,6,NULL,NULL,'2022-08-08 04:56:54','2022-08-19 00:30:48'),(26,2,'','항상 불 환하게 키고 자는 룸메(불 끄면 일어나서 다시 끔)','밤마다 몰래 타자기 두드리는 룸메(시끄럽지는 않은데 거슬림)',10,5,NULL,NULL,'2022-08-08 04:57:49','2022-08-19 00:29:44'),(27,2,'','똥 안 먹었는데 먹었다고 소문나기(전 세계 사람들이 다 알고 있음)','진짜로 먹었는데 아무도 모르기',11,7,NULL,NULL,'2022-08-08 05:05:29','2022-08-19 00:31:15'),(28,2,'','똥 맛 카레','카레 맛 똥',12,7,NULL,NULL,'2022-08-08 05:05:44','2022-08-18 12:56:53'),(30,2,'','토마토맛 토','토맛 토마토',8,7,NULL,NULL,'2022-08-08 05:07:03','2022-08-18 11:06:11'),(31,2,'둘 중 더 아까운 것은?','요플레 뚜껑 그냥 버리기','쭈쭈바 꼬다리 그냥 버리기',11,7,NULL,NULL,'2022-08-08 05:07:23','2022-08-19 00:30:17'),(32,2,'평생동안','손톱 3cm','발톱 3cm',13,8,NULL,NULL,'2022-08-08 05:07:49','2022-08-19 00:32:40'),(33,2,'둘 중 더 화나는 상황은?','비오는 날 젖은 양말','비오는 날 새신발',14,5,NULL,NULL,'2022-08-08 05:08:13','2022-08-19 00:31:46'),(34,2,'평생 둘 중 하나의 모습으로 살아야한다면?','키 100cm','몸무게 100kg',10,6,NULL,NULL,'2022-08-08 05:12:33','2022-08-18 12:56:24'),(35,3,'삼겹살에','쌍추','쌈무',5,6,NULL,NULL,'2022-08-08 05:13:58','2022-08-18 00:27:10'),(51,6,'결혼 전','동거 괜찮다','안 괜찮다',0,0,NULL,NULL,'2022-08-08 06:02:45','2022-08-08 06:02:45'),(52,6,'남녀 사이에 친구는','존재 한다','안 한다',0,0,NULL,NULL,'2022-08-08 06:03:03','2022-08-08 06:03:03'),(53,6,'내 애인이 이성친구와 단 둘이 영화를 보는 것','된다','안 된다',0,0,NULL,NULL,'2022-08-08 06:04:36','2022-08-08 06:04:36'),(54,6,'내 친구와의 술자리에서 나의 애인이 온다는 얘기를 듣고 화장을 고치거나 향수를 뿌리는 등 꾸미는 거','신경 쓰인다','안 쓰인다',1,0,NULL,NULL,'2022-08-08 06:05:22','2022-08-18 14:45:23'),(55,6,'다음 중 더 화나는 상황은?','애인 집에 내 친구','친구 집에 내 애인',0,1,NULL,NULL,'2022-08-08 06:06:00','2022-08-18 14:46:46'),(56,6,'나, 친구, 애인 이렇게 세 명이 밥을 상황에서 까먹기 귀찮은 새우가 나온다. \n    이런 상황에서 남자친구가 친구에게 새우를 먹기 편하게 까준다면?','까주도록 내버려 둔다','절대 안된다',0,0,NULL,NULL,'2022-08-08 06:17:46','2022-08-08 06:17:46'),(57,6,'','주위에 여사친 or 남사친 많은 애인','친구가 1도 없는 애인(하루라도 안 놀아주면 큰일 남)',0,1,NULL,NULL,'2022-08-08 06:17:46','2022-08-18 14:53:07'),(58,6,'','데이트 코스 1분 1초 단위로 계획하는 애인','아무 생각 없이 나오는 애인',0,1,NULL,NULL,'2022-08-08 06:17:47','2022-08-18 14:49:15'),(59,6,'','환승 이별','잠수 이별',1,0,NULL,NULL,'2022-08-08 06:17:47','2022-08-18 14:50:17'),(60,6,'','싸운 후 다 이야기하고 다니는 애인','싸운 후 전혀 타격감 없어 보이는 애인',0,0,NULL,NULL,'2022-08-08 06:17:47','2022-08-08 06:17:47'),(61,6,'매일봐도','설레는 연애','편안한 연애',0,0,NULL,NULL,'2022-08-08 06:17:47','2022-08-08 06:17:47'),(62,6,'','이상형 만나고 주변인과 연 끊기','평생 솔로로 지내며 친구와 지내기',1,0,NULL,NULL,'2022-08-08 06:17:47','2022-08-18 14:53:35'),(63,6,'','내가 좋아하는 사람이랑 연애','나를 좋아하는 사람이랑 연애',0,1,NULL,NULL,'2022-08-08 06:17:47','2022-08-18 14:52:12'),(64,6,'','1년 동안 10명 만난 애인','10년 동안 1명과 계속 만난 애인',1,0,NULL,NULL,'2022-08-08 06:17:47','2022-08-18 14:45:59'),(65,6,'','','',0,1,NULL,NULL,'2022-08-08 06:17:48','2022-08-18 14:44:42'),(66,7,'','주 3일 근무 월급 180','주 7일 근무 월급 650 (5년 이내 퇴사 불가)',0,0,NULL,NULL,'2022-08-08 06:24:45','2022-08-08 06:24:45'),(67,7,'','편의점에서 이어폰 꼽고 일해도 된다.','편의점에서 이어폰 꼽고 일하면 안 된다.',0,0,NULL,NULL,'2022-08-08 06:24:45','2022-08-08 06:24:45'),(68,7,'','5년동안 내가 하고 싶은 것만 하면서 살기','4년 동안 일만하고 집 사기',0,0,NULL,NULL,'2022-08-08 06:24:45','2022-08-08 06:24:45'),(69,7,'','연봉 100억 10년 살기','연봉 2000~4000 복불복 80 년 살기',0,0,NULL,NULL,'2022-08-08 06:24:46','2022-08-08 06:24:46'),(70,7,'','평생 매일 0.3인분 먹기','평생 매끼 5인분 먹기',0,0,NULL,NULL,'2022-08-08 06:24:46','2022-08-08 06:24:46'),(71,7,'','매일 5시간 이상 운동하는 애인','운동 안 하는 애인',0,0,NULL,NULL,'2022-08-08 06:24:46','2022-08-08 06:24:46'),(72,7,'사내 연애','공개','비공개',0,0,NULL,NULL,'2022-08-08 06:24:46','2022-08-08 06:24:46'),(73,7,'','100% 확률로 1억 받기','30% 확률로 100억 받기',0,0,NULL,NULL,'2022-08-08 06:24:46','2022-08-08 06:24:46'),(74,7,'','월급 500 2년마다 무조건 이직','월급 300 평생 직장',0,0,NULL,NULL,'2022-08-08 06:24:46','2022-08-08 06:24:46'),(75,7,'','폰 없이 1년 살기','친구 없이 1년 살기',0,0,NULL,NULL,'2022-08-08 06:24:46','2022-08-08 06:24:46'),(76,7,'','평생 애국가 외 음악 못 듣고 살기','평생 외국 못 나가기',0,0,NULL,NULL,'2022-08-08 06:24:47','2022-08-08 06:24:47'),(77,5,'기분이 우울해서 화분을 샀는데…','괜찮아?','무슨 화분?',0,0,NULL,NULL,'2022-08-08 06:25:33','2022-08-08 06:25:33'),(78,5,'기분이 우울해서 앞머리를 잘랐는데…','무슨일이야?','사진 보내봐',0,0,NULL,NULL,'2022-08-08 06:25:33','2022-08-08 06:25:33'),(79,5,'친구가 약속에 늦었을 때…','사과하면 용서해줌','늦은 이유를 말하면 용서해줌',0,0,NULL,NULL,'2022-08-08 06:25:33','2022-08-08 06:25:33'),(80,5,'관심이 없는 상대가 말할 때…','리액션을 안 함','질문을 안 함',0,0,NULL,NULL,'2022-08-08 06:25:33','2022-08-08 06:25:33'),(81,5,'','아무도 몰래 똥 먹기','똥 안 먹었는데 똥 먹었다고 소문나기',0,0,NULL,NULL,'2022-08-08 06:25:34','2022-08-08 06:25:34'),(82,5,'','마동석한테 맞고 이국종한테 수술받기','이국종한테 맞고 마동석한테 수술받기',0,0,NULL,NULL,'2022-08-08 06:25:34','2022-08-08 06:25:34'),(83,5,'다시태어난다면','원하는 얼굴','원하는 몸매',0,0,NULL,NULL,'2022-08-08 06:25:34','2022-08-08 06:25:34'),(84,5,'','잠수이별 당하기','환승이별 당하기',0,0,NULL,NULL,'2022-08-08 06:25:34','2022-08-08 06:25:34'),(85,5,'','전 애인의 절친과 사귀기','절친의 전 애인과 사귀기',0,0,NULL,NULL,'2022-08-08 06:25:34','2022-08-08 06:25:34'),(86,5,'','아무도 내 말을 못 듣기','나만 말할 수 있기',0,0,NULL,NULL,'2022-08-08 06:25:34','2022-08-08 06:25:34'),(87,5,'','평생 두통','평생 치통',0,0,NULL,NULL,'2022-08-08 06:25:34','2022-08-08 06:25:34'),(88,5,'','애인과 하루종일 데이트','원하는 연예인과 1시간 데이트',0,0,NULL,NULL,'2022-08-08 06:25:34','2022-08-08 06:25:34'),(89,5,'','조별과제 혼자하기','조원이 만들어준 보노보노ppt로 발표하기',0,0,NULL,NULL,'2022-08-08 06:25:35','2022-08-08 06:25:35'),(90,5,'','게임이야기만 하는 애인','애니메이션 이야기만 하는 애인',0,0,NULL,NULL,'2022-08-08 06:25:35','2022-08-08 06:25:35'),(91,5,'','옷 안 빨아 입는 애인','샤워 안 하는 애인',0,0,NULL,NULL,'2022-08-08 06:25:35','2022-08-08 06:25:35'),(92,5,'','웹엑스 음소거 불가',' 웹엑스 비디오 끄기 불가(가상배경도 안됨)',0,0,NULL,NULL,'2022-08-08 06:25:35','2022-08-08 06:25:35'),(93,5,'','1분마다 마우스 고장나기','1분마다 키보드 고장나기',0,0,NULL,NULL,'2022-08-08 06:25:35','2022-08-08 06:25:35'),(94,5,'','화상키보드로 코딩하기','노트에 손으로 코딩하기',0,0,NULL,NULL,'2022-08-08 06:25:35','2022-08-08 06:25:35'),(95,5,'','드라이기 없이 평생살기','고데기 없이 평생살기',0,0,NULL,NULL,'2022-08-08 06:25:35','2022-08-08 06:25:35'),(96,5,'','매일 층간소음 내는 윗집과 살기','아무소리 안 내도 매일 올라와서 시끄럽다 항의하는 아랫집과 살기',0,0,NULL,NULL,'2022-08-08 06:25:35','2022-08-08 06:25:35'),(97,5,'','마마보이(마마걸) 배우자와 살기','의처증(의부증) 배우자와 살기',0,0,NULL,NULL,'2022-08-08 06:25:36','2022-08-08 06:25:36'),(98,5,'','완벽한 상체에 병약한 하체 갖기','완벽한 하체에 병약한 상체 갖기',0,0,NULL,NULL,'2022-08-08 06:25:36','2022-08-08 06:25:36'),(99,5,'','샤워하다 불났을 때 얼굴만 가리고 나오기','몸만 가리고 나오기',0,0,NULL,NULL,'2022-08-08 06:25:36','2022-08-08 06:25:36'),(100,5,'','내 애인 몸에 내 친구이름 문신','내 친구 몸에 내 애인이름 문신',0,0,NULL,NULL,'2022-08-08 06:25:36','2022-08-08 06:25:36'),(101,5,'','24시간 바선생 관찰하기','24시간 바선생한테 관찰당하기',0,0,NULL,NULL,'2022-08-08 06:25:36','2022-08-08 06:25:36'),(102,5,'','한국드라마 소리,자막없이 보기','소리랑 자막만 보기',0,0,NULL,NULL,'2022-08-08 06:25:36','2022-08-08 06:25:36'),(103,5,'','단톡방에서 공개 고백받기','길거리에서 공개고백 받기',0,0,NULL,NULL,'2022-08-08 06:25:36','2022-08-08 06:25:36'),(104,5,'','지옥철 30분 서서 출퇴근','텅 빈 버스 앉아서 1시간30분 출퇴근',0,0,NULL,NULL,'2022-08-08 06:25:36','2022-08-08 06:25:36'),(105,5,'','기술적으로 배울 점이 많은 꼰대 상사','배울 점이 하나도 없는 착한 상사',0,0,NULL,NULL,'2022-08-08 06:25:37','2022-08-08 06:25:37'),(106,5,'',' 근무 중 상사한테 실수로 게임초대 문자 보내기','퇴근 후 술먹다 상사한테 실수로 험담 보내기',0,0,NULL,NULL,'2022-08-08 06:25:37','2022-08-08 06:25:37'),(107,5,'','대기업 면접에서 똥지리고 합격하기','대기업 면접에서 방구뀌고 떨어지기',0,0,NULL,NULL,'2022-08-08 06:25:37','2022-08-08 06:25:37'),(108,5,'','평생 탈모','평생 무좀',0,0,NULL,NULL,'2022-08-08 06:25:37','2022-08-08 06:25:37'),(109,8,'식물인간 안락사','찬성','반대',9,5,NULL,NULL,'2022-08-08 06:26:28','2022-08-17 08:27:44'),(110,8,'GMO 식품','먹어도 된다','먹으면 안된다',9,6,NULL,NULL,'2022-08-08 06:26:45','2022-08-17 08:29:32'),(111,8,'복제인간','찬성','반대',7,5,NULL,NULL,'2022-08-08 06:26:58','2022-08-17 08:28:18'),(112,8,'냉동인간','찬성','반대',6,2,NULL,NULL,'2022-08-08 06:27:02','2022-08-17 08:28:51'),(131,4,'어느 팀과 프로젝트를 할 것인가.ver1','프런트엔드만 5명','백엔드만 5명',1,0,NULL,NULL,'2022-08-18 15:16:19','2022-08-18 19:40:28'),(132,4,'어느 팀과 프로젝트를 할 것인가.ver2','프런트엔드만 5명','백엔드만 5명',1,0,NULL,NULL,'2022-08-18 15:16:20','2022-08-18 19:40:28'),(133,4,'어느 팀과 프로젝트를 할 것인가.ver3','프런트엔드만 5명','백엔드만 5명',1,0,NULL,NULL,'2022-08-18 15:16:20','2022-08-18 19:40:28'),(134,4,'어느 팀과 프로젝트를 할 것인가.ver4','프런트엔드만 5명','백엔드만 5명',0,0,NULL,NULL,'2022-08-18 15:16:21','2022-08-18 19:40:28'),(135,4,'어느 팀과 프로젝트를 할 것인가.ver5','프런트엔드만 5명','백엔드만 5명',1,0,NULL,NULL,'2022-08-18 15:16:22','2022-08-18 19:40:28'),(136,4,'어느 팀과 프로젝트를 할 것인가.ver6','프런트엔드만 5명','백엔드만 5명',1,0,NULL,NULL,'2022-08-18 15:16:23','2022-08-18 19:40:28'),(137,4,'어느 팀과 프로젝트를 할 것인가.ver7','프런트엔드만 5명','백엔드만 5명',0,0,NULL,NULL,'2022-08-18 15:16:30','2022-08-18 19:40:29'),(138,4,'어느 팀과 프로젝트를 할 것인가.ver8','프런트엔드만 5명','백엔드만 5명',0,0,NULL,NULL,'2022-08-18 15:16:35','2022-08-18 19:40:29'),(139,4,'어느 팀과 프로젝트를 할 것인가.ver9','프런트엔드만 5명','백엔드만 5명',1,0,NULL,NULL,'2022-08-18 15:16:37','2022-08-18 19:40:29'),(140,4,'어느 팀과 프로젝트를 할 것인가.ver10','프런트엔드만 5명','백엔드만 5명',2,0,NULL,NULL,'2022-08-18 15:16:39','2022-08-19 01:23:18');
/*!40000 ALTER TABLE `game_category_topics` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `game_conference_rooms`
--

DROP TABLE IF EXISTS `game_conference_rooms`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `game_conference_rooms` (
  `uid` int NOT NULL AUTO_INCREMENT,
  `is_normal` tinyint(1) NOT NULL,
  `game_categories_uid` int NOT NULL,
  `game_category_topics_uid` int DEFAULT NULL,
  `room_admin_user_uid` int NOT NULL,
  `conference_room_url` varchar(50) DEFAULT NULL,
  `start_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `end_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `custom_password` varchar(20) DEFAULT NULL,
  `title` varchar(150) NOT NULL,
  `custom_topic` varchar(300) DEFAULT NULL,
  `custom_answer_A` varchar(300) DEFAULT NULL,
  `custom_answer_B` varchar(300) DEFAULT NULL,
  `creater` varchar(20) DEFAULT NULL,
  `updater` varchar(20) DEFAULT NULL,
  `create_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `game_start` tinyint NOT NULL DEFAULT '0',
  `custom_passworrd` int DEFAULT NULL,
  `admin_nickname` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`uid`),
  UNIQUE KEY `conference_room_url` (`conference_room_url`),
  KEY `game_conference_rooms_game_categories_uid_idx` (`game_categories_uid`),
  KEY `game_conference_rooms_game_category_topics_uid_idx` (`uid`),
  KEY `game_conference_rooms_game_category_topics_uid` (`game_category_topics_uid`),
  CONSTRAINT `game_conference_rooms_game_categories_subject` FOREIGN KEY (`game_categories_uid`) REFERENCES `game_categories` (`uid`),
  CONSTRAINT `game_conference_rooms_game_category_topics_uid` FOREIGN KEY (`game_category_topics_uid`) REFERENCES `game_category_topics` (`uid`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `game_conference_rooms`
--

LOCK TABLES `game_conference_rooms` WRITE;
/*!40000 ALTER TABLE `game_conference_rooms` DISABLE KEYS */;
INSERT INTO `game_conference_rooms` VALUES (11,1,4,35,3,'Dx6Oo113PK1W2','2022-08-18 07:21:04',NULL,NULL,'권도건종',NULL,NULL,NULL,NULL,NULL,'2022-08-18 16:21:04','2022-08-18 16:21:04',0,NULL,'김유정'),(12,1,4,35,3,'sSI0py1Vv','2022-08-18 07:32:08',NULL,NULL,'권도건종2',NULL,NULL,NULL,NULL,NULL,'2022-08-18 16:32:07','2022-08-18 16:32:07',0,NULL,'김유정'),(14,0,1,22,4,'wFN0hr9y9','2022-08-18 08:37:21',NULL,'1234','자유방',NULL,NULL,NULL,NULL,NULL,'2022-08-18 17:37:20','2022-08-18 17:37:20',0,NULL,'박찬호'),(17,1,4,35,111,'P002Y8W','2022-08-18 09:45:57',NULL,NULL,'안녕하세요^^',NULL,NULL,NULL,NULL,NULL,'2022-08-18 18:45:57','2022-08-18 18:45:57',0,NULL,'세모야놀자3'),(18,1,4,35,111,'fdgt453','2022-08-18 09:45:57','2022-08-18 20:12:15',NULL,'고수만',NULL,NULL,NULL,NULL,NULL,'2022-08-18 20:12:15','2022-08-18 20:12:15',0,NULL,'박찬호'),(20,1,3,35,112,'P05w0M2','2022-08-18 11:27:17',NULL,NULL,'test방',NULL,NULL,NULL,NULL,NULL,'2022-08-18 20:27:16','2022-08-18 20:27:16',0,NULL,'김유됴미'),(22,0,1,22,3,'4g7m0Wv23558','2022-08-18 15:34:17',NULL,'','ㅇㅇㅇ',NULL,NULL,NULL,NULL,NULL,'2022-08-19 00:34:17','2022-08-19 00:34:17',0,NULL,'김유정'),(23,1,4,35,3,'3cs83P6Ry','2022-08-18 16:05:09',NULL,NULL,'시연방',NULL,NULL,NULL,NULL,NULL,'2022-08-19 01:05:08','2022-08-19 01:05:08',0,NULL,'김유정'),(24,1,4,35,3,'X9Sdn475x8S5Y','2022-08-18 16:08:44',NULL,NULL,'시연용2',NULL,NULL,NULL,NULL,NULL,'2022-08-19 01:08:44','2022-08-19 01:08:44',0,NULL,'김유정'),(25,1,4,135,1,'MVRmM','2022-08-18 16:12:17',NULL,NULL,'시연용방',NULL,NULL,NULL,NULL,NULL,'2022-08-19 01:12:16','2022-08-19 01:15:03',1,NULL,'병수1'),(26,1,4,132,1,'BmQw1P','2022-08-18 16:19:54',NULL,NULL,'시연용방2',NULL,NULL,NULL,NULL,NULL,'2022-08-19 01:19:54','2022-08-19 01:23:18',1,NULL,'병수1'),(27,0,1,22,1,'Ilw9v','2022-08-18 16:51:12',NULL,'23234','1212',NULL,NULL,NULL,NULL,NULL,'2022-08-19 01:51:11','2022-08-19 01:51:11',0,NULL,'병수1');
/*!40000 ALTER TABLE `game_conference_rooms` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `game_records`
--

DROP TABLE IF EXISTS `game_records`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `game_records` (
  `uid` int NOT NULL AUTO_INCREMENT,
  `user_uid` int NOT NULL,
  `total_goldfinch` int NOT NULL,
  `is_winner` tinyint NOT NULL,
  `game_conference_room_uid` int NOT NULL,
  `game_category_topics_uid` int NOT NULL,
  `start_time` datetime DEFAULT NULL,
  `end_time` datetime DEFAULT NULL,
  `creater` varchar(20) DEFAULT NULL,
  `updater` varchar(20) DEFAULT NULL,
  `create_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `player_uid` int DEFAULT NULL,
  PRIMARY KEY (`uid`),
  KEY `game_records_game_conference_rooms_uid_idx` (`game_conference_room_uid`),
  KEY `game_records_users_uid` (`user_uid`),
  CONSTRAINT `game_records_users_uid` FOREIGN KEY (`user_uid`) REFERENCES `users` (`uid`)
) ENGINE=InnoDB AUTO_INCREMENT=226 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `game_records`
--

LOCK TABLES `game_records` WRITE;
/*!40000 ALTER TABLE `game_records` DISABLE KEYS */;
INSERT INTO `game_records` VALUES (1,34,3,0,3,5,'2022-07-28 09:00:00','2022-08-03 01:56:35',NULL,NULL,'2022-08-03 01:56:34','2022-08-03 01:56:34',34),(2,35,3,0,3,5,'2022-07-28 09:00:00','2022-08-03 01:56:35',NULL,NULL,'2022-08-03 01:56:34','2022-08-03 01:56:34',35),(3,36,3,1,3,5,'2022-07-28 09:00:00','2022-08-03 01:56:35',NULL,NULL,'2022-08-03 01:56:34','2022-08-03 01:56:34',36),(4,37,3,0,3,5,'2022-07-28 09:00:00','2022-08-03 01:56:35',NULL,NULL,'2022-08-03 01:56:35','2022-08-03 01:56:35',37),(5,38,3,0,3,5,'2022-07-28 09:00:00','2022-08-03 01:56:35',NULL,NULL,'2022-08-03 01:56:35','2022-08-03 01:56:35',38),(6,39,3,0,3,5,'2022-07-28 09:00:00','2022-08-03 01:56:35',NULL,NULL,'2022-08-03 01:56:35','2022-08-03 01:56:35',39),(7,40,3,0,3,5,'2022-07-28 09:00:00','2022-08-03 01:56:35',NULL,NULL,'2022-08-03 01:56:35','2022-08-03 01:56:35',40),(8,41,3,0,3,5,'2022-07-28 09:00:00','2022-08-03 01:56:35',NULL,NULL,'2022-08-03 01:56:35','2022-08-03 01:56:35',41),(9,34,0,0,3,5,'2022-07-28 09:00:00','2022-08-03 01:59:36',NULL,NULL,'2022-08-03 01:59:36','2022-08-03 01:59:36',34),(10,35,0,0,3,5,'2022-07-28 09:00:00','2022-08-03 01:59:36',NULL,NULL,'2022-08-03 01:59:36','2022-08-03 01:59:36',35),(11,36,0,1,3,5,'2022-07-28 09:00:00','2022-08-03 01:59:36',NULL,NULL,'2022-08-03 01:59:36','2022-08-03 01:59:36',36),(12,37,0,0,3,5,'2022-07-28 09:00:00','2022-08-03 01:59:36',NULL,NULL,'2022-08-03 01:59:36','2022-08-03 01:59:36',37),(13,38,0,0,3,5,'2022-07-28 09:00:00','2022-08-03 01:59:36',NULL,NULL,'2022-08-03 01:59:36','2022-08-03 01:59:36',38),(14,39,0,0,3,5,'2022-07-28 09:00:00','2022-08-03 01:59:36',NULL,NULL,'2022-08-03 01:59:36','2022-08-03 01:59:36',39),(15,40,0,0,3,5,'2022-07-28 09:00:00','2022-08-03 01:59:36',NULL,NULL,'2022-08-03 01:59:36','2022-08-03 01:59:36',40),(16,41,0,0,3,5,'2022-07-28 09:00:00','2022-08-03 01:59:36',NULL,NULL,'2022-08-03 01:59:36','2022-08-03 01:59:36',41),(18,34,4,0,3,13,'2022-07-28 09:00:00','2022-08-03 08:00:42',NULL,NULL,'2022-08-03 08:00:42','2022-08-03 08:00:42',34),(19,35,4,0,3,13,'2022-07-28 09:00:00','2022-08-03 08:00:42',NULL,NULL,'2022-08-03 08:00:42','2022-08-03 08:00:42',35),(20,36,4,1,3,13,'2022-07-28 09:00:00','2022-08-03 08:00:42',NULL,NULL,'2022-08-03 08:00:42','2022-08-03 08:00:42',36),(21,37,4,0,3,13,'2022-07-28 09:00:00','2022-08-03 08:00:42',NULL,NULL,'2022-08-03 08:00:42','2022-08-03 08:00:42',37),(22,38,4,0,3,13,'2022-07-28 09:00:00','2022-08-03 08:00:42',NULL,NULL,'2022-08-03 08:00:42','2022-08-03 08:00:42',38),(23,39,4,0,3,13,'2022-07-28 09:00:00','2022-08-03 08:00:42',NULL,NULL,'2022-08-03 08:00:42','2022-08-03 08:00:42',39),(24,40,4,0,3,13,'2022-07-28 09:00:00','2022-08-03 08:00:42',NULL,NULL,'2022-08-03 08:00:42','2022-08-03 08:00:42',40),(25,41,4,0,3,13,'2022-07-28 09:00:00','2022-08-03 08:00:42',NULL,NULL,'2022-08-03 08:00:42','2022-08-03 08:00:42',41),(26,82,0,1,3,23,'2022-07-28 09:00:00','2022-08-08 06:51:49',NULL,NULL,'2022-08-08 06:51:48','2022-08-08 06:51:48',NULL),(27,87,0,0,3,23,'2022-07-28 09:00:00','2022-08-08 06:51:49',NULL,NULL,'2022-08-08 06:51:48','2022-08-08 06:51:48',NULL),(28,86,0,0,3,23,'2022-07-28 09:00:00','2022-08-08 06:51:49',NULL,NULL,'2022-08-08 06:51:48','2022-08-08 06:51:48',NULL),(29,82,6,1,3,30,'2022-07-28 09:00:00','2022-08-08 07:04:55',NULL,NULL,'2022-08-08 07:04:54','2022-08-08 07:04:54',NULL),(30,87,3,0,3,30,'2022-07-28 09:00:00','2022-08-08 07:04:55',NULL,NULL,'2022-08-08 07:04:54','2022-08-08 07:04:54',NULL),(31,86,5,0,3,30,'2022-07-28 09:00:00','2022-08-08 07:04:55',NULL,NULL,'2022-08-08 07:04:54','2022-08-08 07:04:54',NULL),(32,86,0,0,3,30,'2022-07-28 09:00:00','2022-08-08 07:19:33',NULL,NULL,'2022-08-08 07:19:33','2022-08-08 07:19:33',NULL),(33,87,0,0,3,30,'2022-07-28 09:00:00','2022-08-08 07:19:33',NULL,NULL,'2022-08-08 07:19:33','2022-08-08 07:19:33',NULL),(34,82,0,1,3,30,'2022-07-28 09:00:00','2022-08-08 07:19:33',NULL,NULL,'2022-08-08 07:19:33','2022-08-08 07:19:33',NULL),(35,86,0,1,3,30,'2022-07-28 09:00:00','2022-08-08 07:19:53',NULL,NULL,'2022-08-08 07:19:53','2022-08-08 07:19:53',NULL),(36,87,0,0,3,30,'2022-07-28 09:00:00','2022-08-08 07:19:53',NULL,NULL,'2022-08-08 07:19:53','2022-08-08 07:19:53',NULL),(37,82,0,0,3,30,'2022-07-28 09:00:00','2022-08-08 07:19:53',NULL,NULL,'2022-08-08 07:19:53','2022-08-08 07:19:53',NULL),(38,86,0,1,3,30,'2022-07-28 09:00:00','2022-08-08 07:25:09',NULL,NULL,'2022-08-08 07:25:09','2022-08-08 07:25:09',NULL),(39,87,0,0,3,30,'2022-07-28 09:00:00','2022-08-08 07:25:09',NULL,NULL,'2022-08-08 07:25:09','2022-08-08 07:25:09',NULL),(40,82,0,0,3,30,'2022-07-28 09:00:00','2022-08-08 07:25:09',NULL,NULL,'2022-08-08 07:25:09','2022-08-08 07:25:09',NULL),(41,86,0,1,3,30,'2022-07-28 09:00:00','2022-08-08 07:25:18',NULL,NULL,'2022-08-08 07:25:17','2022-08-08 07:25:17',NULL),(42,87,0,0,3,30,'2022-07-28 09:00:00','2022-08-08 07:25:18',NULL,NULL,'2022-08-08 07:25:17','2022-08-08 07:25:17',NULL),(43,82,0,0,3,30,'2022-07-28 09:00:00','2022-08-08 07:25:18',NULL,NULL,'2022-08-08 07:25:17','2022-08-08 07:25:17',NULL),(44,86,0,0,3,30,'2022-07-28 09:00:00','2022-08-08 07:26:01',NULL,NULL,'2022-08-08 07:26:01','2022-08-08 07:26:01',NULL),(45,87,0,0,3,30,'2022-07-28 09:00:00','2022-08-08 07:26:01',NULL,NULL,'2022-08-08 07:26:01','2022-08-08 07:26:01',NULL),(46,82,0,1,3,30,'2022-07-28 09:00:00','2022-08-08 07:26:01',NULL,NULL,'2022-08-08 07:26:01','2022-08-08 07:26:01',NULL),(47,82,5,0,3,34,'2022-07-28 09:00:00','2022-08-08 07:30:29',NULL,NULL,'2022-08-08 07:30:29','2022-08-08 07:30:29',NULL),(48,87,6,1,3,34,'2022-07-28 09:00:00','2022-08-08 07:30:29',NULL,NULL,'2022-08-08 07:30:29','2022-08-08 07:30:29',NULL),(49,86,3,0,3,34,'2022-07-28 09:00:00','2022-08-08 07:30:29',NULL,NULL,'2022-08-08 07:30:29','2022-08-08 07:30:29',NULL),(50,87,3,0,3,33,'2022-07-28 09:00:00','2022-08-08 07:38:29',NULL,NULL,'2022-08-08 07:38:28','2022-08-08 07:38:28',NULL),(51,82,6,1,3,33,'2022-07-28 09:00:00','2022-08-08 07:38:29',NULL,NULL,'2022-08-08 07:38:29','2022-08-08 07:38:29',NULL),(52,86,0,0,3,33,'2022-07-28 09:00:00','2022-08-08 07:38:29',NULL,NULL,'2022-08-08 07:38:29','2022-08-08 07:38:29',NULL),(53,82,7,1,3,24,'2022-07-28 09:00:00','2022-08-08 07:40:49',NULL,NULL,'2022-08-08 07:40:49','2022-08-08 07:40:49',NULL),(54,87,3,0,3,24,'2022-07-28 09:00:00','2022-08-08 07:40:49',NULL,NULL,'2022-08-08 07:40:49','2022-08-08 07:40:49',NULL),(55,86,0,0,3,24,'2022-07-28 09:00:00','2022-08-08 07:40:49',NULL,NULL,'2022-08-08 07:40:49','2022-08-08 07:40:49',NULL),(56,86,2,0,3,31,'2022-07-28 09:00:00','2022-08-09 02:30:17',NULL,NULL,'2022-08-09 02:30:16','2022-08-09 02:30:16',NULL),(57,84,6,1,3,31,'2022-07-28 09:00:00','2022-08-09 02:30:17',NULL,NULL,'2022-08-09 02:30:16','2022-08-09 02:30:16',NULL),(58,82,2,0,3,31,'2022-07-28 09:00:00','2022-08-09 02:30:17',NULL,NULL,'2022-08-09 02:30:16','2022-08-09 02:30:16',NULL),(59,84,3,0,3,23,'2022-07-28 09:00:00','2022-08-09 02:38:22',NULL,NULL,'2022-08-09 02:38:21','2022-08-09 02:38:21',NULL),(60,86,4,0,3,23,'2022-07-28 09:00:00','2022-08-09 02:38:22',NULL,NULL,'2022-08-09 02:38:21','2022-08-09 02:38:21',NULL),(61,82,6,1,3,23,'2022-07-28 09:00:00','2022-08-09 02:38:22',NULL,NULL,'2022-08-09 02:38:21','2022-08-09 02:38:21',NULL),(62,84,0,0,3,24,'2022-07-28 09:00:00','2022-08-09 02:53:00',NULL,NULL,'2022-08-09 02:53:00','2022-08-09 02:53:00',NULL),(63,86,4,0,3,24,'2022-07-28 09:00:00','2022-08-09 02:53:00',NULL,NULL,'2022-08-09 02:53:00','2022-08-09 02:53:00',NULL),(64,82,6,1,3,24,'2022-07-28 09:00:00','2022-08-09 02:53:00',NULL,NULL,'2022-08-09 02:53:00','2022-08-09 02:53:00',NULL),(65,84,0,0,245,112,'2022-08-10 00:51:57','2022-08-10 01:31:06',NULL,NULL,'2022-08-10 01:31:06','2022-08-10 01:31:06',NULL),(66,86,6,1,245,112,'2022-08-10 00:51:57','2022-08-10 01:31:06',NULL,NULL,'2022-08-10 01:31:06','2022-08-10 01:31:06',NULL),(67,82,5,0,245,112,'2022-08-10 00:51:57','2022-08-10 01:31:06',NULL,NULL,'2022-08-10 01:31:06','2022-08-10 01:31:06',NULL),(68,84,2,0,245,112,'2022-08-10 00:51:57','2022-08-10 03:07:33',NULL,NULL,'2022-08-10 03:07:33','2022-08-10 03:07:33',NULL),(69,86,7,1,245,112,'2022-08-10 00:51:57','2022-08-10 03:07:33',NULL,NULL,'2022-08-10 03:07:33','2022-08-10 03:07:33',NULL),(70,82,5,0,245,112,'2022-08-10 00:51:57','2022-08-10 03:07:33',NULL,NULL,'2022-08-10 03:07:33','2022-08-10 03:07:33',NULL),(71,84,2,0,245,112,'2022-08-10 00:51:57','2022-08-10 05:30:39',NULL,NULL,'2022-08-10 05:30:39','2022-08-10 05:30:39',NULL),(72,86,7,0,245,112,'2022-08-10 00:51:57','2022-08-10 05:30:39',NULL,NULL,'2022-08-10 05:30:39','2022-08-10 05:30:39',NULL),(73,82,5,1,245,112,'2022-08-10 00:51:57','2022-08-10 05:30:39',NULL,NULL,'2022-08-10 05:30:39','2022-08-10 05:30:39',NULL),(74,82,6,1,245,112,'2022-08-10 00:51:57','2022-08-10 05:53:22',NULL,NULL,'2022-08-10 05:53:21','2022-08-10 05:53:21',NULL),(75,84,9,0,245,112,'2022-08-10 00:51:57','2022-08-10 05:53:22',NULL,NULL,'2022-08-10 05:53:22','2022-08-10 05:53:22',NULL),(76,86,7,0,245,112,'2022-08-10 00:51:57','2022-08-10 05:53:22',NULL,NULL,'2022-08-10 05:53:22','2022-08-10 05:53:22',NULL),(77,84,2,0,245,109,'2022-08-10 00:51:57','2022-08-10 05:55:44',NULL,NULL,'2022-08-10 05:55:44','2022-08-10 05:55:44',NULL),(78,82,4,1,245,109,'2022-08-10 00:51:57','2022-08-10 05:55:44',NULL,NULL,'2022-08-10 05:55:44','2022-08-10 05:55:44',NULL),(79,86,4,0,245,109,'2022-08-10 00:51:57','2022-08-10 05:55:44',NULL,NULL,'2022-08-10 05:55:44','2022-08-10 05:55:44',NULL),(80,84,8,0,245,112,'2022-08-10 00:51:57','2022-08-10 05:58:08',NULL,NULL,'2022-08-10 05:58:08','2022-08-10 05:58:08',NULL),(81,82,6,1,245,112,'2022-08-10 00:51:57','2022-08-10 05:58:08',NULL,NULL,'2022-08-10 05:58:08','2022-08-10 05:58:08',NULL),(82,86,6,0,245,112,'2022-08-10 00:51:57','2022-08-10 05:58:08',NULL,NULL,'2022-08-10 05:58:08','2022-08-10 05:58:08',NULL),(83,84,1,0,245,111,'2022-08-10 00:51:57','2022-08-10 05:59:26',NULL,NULL,'2022-08-10 05:59:25','2022-08-10 05:59:25',NULL),(84,82,1,1,245,111,'2022-08-10 00:51:57','2022-08-10 05:59:26',NULL,NULL,'2022-08-10 05:59:25','2022-08-10 05:59:25',NULL),(85,86,2,0,245,111,'2022-08-10 00:51:57','2022-08-10 05:59:26',NULL,NULL,'2022-08-10 05:59:26','2022-08-10 05:59:26',NULL),(86,84,5,0,245,109,'2022-08-10 00:51:57','2022-08-10 07:41:07',NULL,NULL,'2022-08-10 07:41:07','2022-08-10 07:41:07',NULL),(87,82,2,1,245,109,'2022-08-10 00:51:57','2022-08-10 07:41:07',NULL,NULL,'2022-08-10 07:41:07','2022-08-10 07:41:07',NULL),(88,86,2,0,245,109,'2022-08-10 00:51:57','2022-08-10 07:41:07',NULL,NULL,'2022-08-10 07:41:07','2022-08-10 07:41:07',NULL),(89,84,3,0,245,109,'2022-08-10 00:51:57','2022-08-12 06:59:11',NULL,NULL,'2022-08-12 06:59:12','2022-08-12 06:59:12',NULL),(90,82,5,1,245,109,'2022-08-10 00:51:57','2022-08-12 06:59:11',NULL,NULL,'2022-08-12 06:59:12','2022-08-12 06:59:12',NULL),(91,86,5,0,245,109,'2022-08-10 00:51:57','2022-08-12 06:59:11',NULL,NULL,'2022-08-12 06:59:12','2022-08-12 06:59:12',NULL),(92,91,0,0,245,109,'2022-08-10 00:51:57','2022-08-12 06:59:11',NULL,NULL,'2022-08-12 06:59:12','2022-08-12 06:59:12',NULL),(93,86,9,1,261,111,'2022-08-12 06:07:12','2022-08-12 08:15:01',NULL,NULL,'2022-08-12 08:15:02','2022-08-12 08:15:02',NULL),(94,84,6,0,261,111,'2022-08-12 06:07:12','2022-08-12 08:15:01',NULL,NULL,'2022-08-12 08:15:02','2022-08-12 08:15:02',NULL),(95,82,4,0,261,111,'2022-08-12 06:07:12','2022-08-12 08:15:01',NULL,NULL,'2022-08-12 08:15:02','2022-08-12 08:15:02',NULL),(96,84,6,1,261,109,'2022-08-12 06:07:12','2022-08-12 08:29:55',NULL,NULL,'2022-08-12 08:29:56','2022-08-12 08:29:56',NULL),(97,82,5,0,261,109,'2022-08-12 06:07:12','2022-08-12 08:29:55',NULL,NULL,'2022-08-12 08:29:56','2022-08-12 08:29:56',NULL),(98,86,3,0,261,109,'2022-08-12 06:07:12','2022-08-12 08:29:55',NULL,NULL,'2022-08-12 08:29:56','2022-08-12 08:29:56',NULL),(99,82,1,1,246,34,'2022-08-10 00:52:09','2022-08-16 02:38:59',NULL,NULL,'2022-08-16 02:39:00','2022-08-16 02:39:00',NULL),(100,84,0,0,246,34,'2022-08-10 00:52:09','2022-08-16 02:38:59',NULL,NULL,'2022-08-16 02:39:00','2022-08-16 02:39:00',NULL),(101,86,0,0,246,34,'2022-08-10 00:52:09','2022-08-16 02:38:59',NULL,NULL,'2022-08-16 02:39:00','2022-08-16 02:39:00',NULL),(102,87,0,0,246,34,'2022-08-10 00:52:09','2022-08-16 02:38:59',NULL,NULL,'2022-08-16 02:39:00','2022-08-16 02:39:00',NULL),(103,88,0,0,246,34,'2022-08-10 00:52:09','2022-08-16 02:38:59',NULL,NULL,'2022-08-16 02:39:00','2022-08-16 02:39:00',NULL),(104,84,5,0,261,112,'2022-08-12 06:07:12','2022-08-16 02:40:10',NULL,NULL,'2022-08-16 02:40:11','2022-08-16 02:40:11',NULL),(105,82,5,0,261,112,'2022-08-12 06:07:12','2022-08-16 02:40:10',NULL,NULL,'2022-08-16 02:40:11','2022-08-16 02:40:11',NULL),(106,86,6,1,261,112,'2022-08-12 06:07:12','2022-08-16 02:40:10',NULL,NULL,'2022-08-16 02:40:11','2022-08-16 02:40:11',NULL),(107,82,6,1,261,109,'2022-08-12 06:07:12','2022-08-16 02:55:16',NULL,NULL,'2022-08-16 02:55:17','2022-08-16 02:55:17',NULL),(108,84,5,0,261,109,'2022-08-12 06:07:12','2022-08-16 02:55:16',NULL,NULL,'2022-08-16 02:55:17','2022-08-16 02:55:17',NULL),(109,86,6,0,261,109,'2022-08-12 06:07:12','2022-08-16 02:55:16',NULL,NULL,'2022-08-16 02:55:17','2022-08-16 02:55:17',NULL),(110,82,0,1,261,112,'2022-08-12 06:07:12','2022-08-16 03:01:15',NULL,NULL,'2022-08-16 03:01:14','2022-08-16 03:01:14',NULL),(111,84,0,0,261,112,'2022-08-12 06:07:12','2022-08-16 03:01:15',NULL,NULL,'2022-08-16 03:01:14','2022-08-16 03:01:14',NULL),(112,86,0,0,261,112,'2022-08-12 06:07:12','2022-08-16 03:01:15',NULL,NULL,'2022-08-16 03:01:14','2022-08-16 03:01:14',NULL),(113,82,2,1,261,110,'2022-08-12 06:07:12','2022-08-16 05:07:09',NULL,NULL,'2022-08-16 05:07:09','2022-08-16 05:07:09',NULL),(114,84,3,0,261,110,'2022-08-12 06:07:12','2022-08-16 05:07:09',NULL,NULL,'2022-08-16 05:07:09','2022-08-16 05:07:09',NULL),(115,86,3,0,261,110,'2022-08-12 06:07:12','2022-08-16 05:07:09',NULL,NULL,'2022-08-16 05:07:09','2022-08-16 05:07:09',NULL),(116,90,0,0,245,109,'2022-08-10 00:51:57','2022-08-16 05:10:54',NULL,NULL,'2022-08-16 05:10:53','2022-08-16 05:10:53',NULL),(117,87,0,0,349,35,'2022-08-16 05:04:35','2022-08-16 05:16:57',NULL,NULL,'2022-08-16 05:16:57','2022-08-16 05:16:57',NULL),(118,82,0,1,349,35,'2022-08-16 05:04:35','2022-08-16 05:16:57',NULL,NULL,'2022-08-16 05:16:57','2022-08-16 05:16:57',NULL),(119,87,0,0,349,35,'2022-08-16 05:04:35','2022-08-16 05:25:46',NULL,NULL,'2022-08-16 05:25:45','2022-08-16 05:25:45',NULL),(120,82,0,0,350,35,'2022-08-16 05:17:18','2022-08-16 05:25:50',NULL,NULL,'2022-08-16 05:25:50','2022-08-16 05:25:50',NULL),(121,82,0,1,351,35,'2022-08-16 05:26:00','2022-08-16 05:36:11',NULL,NULL,'2022-08-16 05:36:11','2022-08-16 05:36:11',NULL),(122,82,0,1,352,35,'2022-08-16 05:36:19','2022-08-16 05:38:43',NULL,NULL,'2022-08-16 05:38:42','2022-08-16 05:38:42',NULL),(123,82,0,1,353,35,'2022-08-16 05:38:11','2022-08-16 05:41:49',NULL,NULL,'2022-08-16 05:41:49','2022-08-16 05:41:49',NULL),(124,82,0,1,354,35,'2022-08-16 05:42:06','2022-08-16 05:45:02',NULL,NULL,'2022-08-16 05:45:02','2022-08-16 05:45:02',NULL),(125,82,0,1,355,35,'2022-08-16 05:45:11','2022-08-16 05:47:11',NULL,NULL,'2022-08-16 05:47:11','2022-08-16 05:47:11',NULL),(126,82,0,1,356,35,'2022-08-16 05:47:24','2022-08-16 05:58:51',NULL,NULL,'2022-08-16 05:58:51','2022-08-16 05:58:51',NULL),(127,82,0,1,357,35,'2022-08-16 05:58:58','2022-08-16 06:04:00',NULL,NULL,'2022-08-16 06:04:00','2022-08-16 06:04:00',NULL),(128,82,1,0,358,26,'2022-08-16 06:04:07','2022-08-16 06:12:17',NULL,NULL,'2022-08-16 06:12:16','2022-08-16 06:12:16',NULL),(129,35,5,0,358,26,'2022-08-16 06:04:07','2022-08-16 06:12:17',NULL,NULL,'2022-08-16 06:12:16','2022-08-16 06:12:16',NULL),(130,34,6,1,358,26,'2022-08-16 06:04:07','2022-08-16 06:12:17',NULL,NULL,'2022-08-16 06:12:16','2022-08-16 06:12:16',NULL),(131,98,1,1,371,31,'2022-08-16 09:18:14','2022-08-16 09:31:19',NULL,NULL,'2022-08-16 09:31:18','2022-08-16 09:31:18',NULL),(132,99,1,0,371,31,'2022-08-16 09:18:14','2022-08-16 09:31:19',NULL,NULL,'2022-08-16 09:31:18','2022-08-16 09:31:18',NULL),(133,98,4,0,372,33,'2022-08-16 09:31:37','2022-08-16 09:36:04',NULL,NULL,'2022-08-16 09:36:04','2022-08-16 09:36:04',NULL),(134,102,6,0,372,33,'2022-08-16 09:31:37','2022-08-16 09:36:04',NULL,NULL,'2022-08-16 09:36:04','2022-08-16 09:36:04',NULL),(136,101,5,0,372,33,'2022-08-16 09:31:37','2022-08-16 09:36:04',NULL,NULL,'2022-08-16 09:36:04','2022-08-16 09:36:04',NULL),(137,99,3,0,372,33,'2022-08-16 09:31:37','2022-08-16 09:36:04',NULL,NULL,'2022-08-16 09:36:04','2022-08-16 09:36:04',NULL),(138,103,7,1,372,33,'2022-08-16 09:31:37','2022-08-16 09:36:04',NULL,NULL,'2022-08-16 09:36:04','2022-08-16 09:36:04',NULL),(139,82,4,1,384,26,'2022-08-17 01:15:23','2022-08-17 04:18:07',NULL,NULL,'2022-08-17 04:18:08','2022-08-17 04:18:08',NULL),(140,84,3,0,384,26,'2022-08-17 01:15:23','2022-08-17 04:18:07',NULL,NULL,'2022-08-17 04:18:08','2022-08-17 04:18:08',NULL),(141,91,1,0,384,26,'2022-08-17 01:15:23','2022-08-17 04:18:07',NULL,NULL,'2022-08-17 04:18:08','2022-08-17 04:18:08',NULL),(142,82,0,1,411,35,'2022-08-17 05:19:29','2022-08-17 05:51:05',NULL,NULL,'2022-08-17 05:51:05','2022-08-17 05:51:05',NULL),(143,98,6,1,414,26,'2022-08-17 07:43:26','2022-08-17 07:47:35',NULL,NULL,'2022-08-17 07:47:34','2022-08-17 07:47:34',NULL),(144,103,3,0,414,26,'2022-08-17 07:43:26','2022-08-17 07:47:35',NULL,NULL,'2022-08-17 07:47:34','2022-08-17 07:47:34',NULL),(145,102,5,0,414,26,'2022-08-17 07:43:26','2022-08-17 07:47:35',NULL,NULL,'2022-08-17 07:47:34','2022-08-17 07:47:34',NULL),(146,102,5,0,441,47,'2022-08-17 23:56:17','2022-08-18 00:17:32',NULL,NULL,'2022-08-18 00:17:32','2022-08-18 00:17:32',NULL),(147,1,6,1,441,47,'2022-08-17 23:56:17','2022-08-18 00:17:32',NULL,NULL,'2022-08-18 00:17:32','2022-08-18 00:17:32',NULL),(148,101,4,0,441,47,'2022-08-17 23:56:17','2022-08-18 00:17:32',NULL,NULL,'2022-08-18 00:17:32','2022-08-18 00:17:32',NULL),(149,98,5,0,441,47,'2022-08-17 23:56:17','2022-08-18 00:17:32',NULL,NULL,'2022-08-18 00:17:32','2022-08-18 00:17:32',NULL),(150,102,8,1,443,35,'2022-08-18 00:24:59','2022-08-18 00:27:10',NULL,NULL,'2022-08-18 00:27:10','2022-08-18 00:27:10',NULL),(151,1,3,0,443,35,'2022-08-18 00:24:59','2022-08-18 00:27:10',NULL,NULL,'2022-08-18 00:27:10','2022-08-18 00:27:10',NULL),(152,101,2,0,443,35,'2022-08-18 00:24:59','2022-08-18 00:27:10',NULL,NULL,'2022-08-18 00:27:10','2022-08-18 00:27:10',NULL),(153,99,4,0,443,35,'2022-08-18 00:24:59','2022-08-18 00:27:10',NULL,NULL,'2022-08-18 00:27:10','2022-08-18 00:27:10',NULL),(154,98,5,0,443,35,'2022-08-18 00:24:59','2022-08-18 00:27:10',NULL,NULL,'2022-08-18 00:27:10','2022-08-18 00:27:10',NULL),(175,1,1,0,7,24,'2022-08-18 08:42:54','2022-08-18 09:02:37',NULL,NULL,'2022-08-18 09:02:36','2022-08-18 09:02:36',NULL),(176,5,1,0,7,24,'2022-08-18 08:42:54','2022-08-18 09:02:37',NULL,NULL,'2022-08-18 09:02:36','2022-08-18 09:02:36',NULL),(177,4,4,1,7,24,'2022-08-18 08:42:54','2022-08-18 09:02:37',NULL,NULL,'2022-08-18 09:02:36','2022-08-18 09:02:36',NULL),(178,1,2,1,10,33,'2022-08-18 10:50:07','2022-08-18 10:56:30',NULL,NULL,'2022-08-18 10:56:30','2022-08-18 10:56:30',NULL),(179,3,2,0,10,33,'2022-08-18 10:50:07','2022-08-18 10:56:30',NULL,NULL,'2022-08-18 10:56:30','2022-08-18 10:56:30',NULL),(180,5,2,0,10,33,'2022-08-18 10:50:07','2022-08-18 10:56:30',NULL,NULL,'2022-08-18 10:56:30','2022-08-18 10:56:30',NULL),(181,1,4,1,14,26,'2022-08-18 10:57:05','2022-08-18 10:59:55',NULL,NULL,'2022-08-18 10:59:54','2022-08-18 10:59:54',NULL),(182,3,3,0,14,26,'2022-08-18 10:57:05','2022-08-18 10:59:55',NULL,NULL,'2022-08-18 10:59:54','2022-08-18 10:59:54',NULL),(183,5,1,0,14,26,'2022-08-18 10:57:05','2022-08-18 10:59:55',NULL,NULL,'2022-08-18 10:59:54','2022-08-18 10:59:54',NULL),(184,1,0,0,15,28,'2022-08-18 11:01:27','2022-08-18 11:03:18',NULL,NULL,'2022-08-18 11:03:17','2022-08-18 11:03:17',NULL),(185,5,4,1,15,28,'2022-08-18 11:01:27','2022-08-18 11:03:18',NULL,NULL,'2022-08-18 11:03:17','2022-08-18 11:03:17',NULL),(186,3,2,0,15,28,'2022-08-18 11:01:27','2022-08-18 11:03:18',NULL,NULL,'2022-08-18 11:03:17','2022-08-18 11:03:17',NULL),(187,1,2,0,16,31,'2022-08-18 11:04:02','2022-08-18 11:06:12',NULL,NULL,'2022-08-18 11:06:11','2022-08-18 11:06:11',NULL),(188,5,4,1,16,31,'2022-08-18 11:04:02','2022-08-18 11:06:12',NULL,NULL,'2022-08-18 11:06:11','2022-08-18 11:06:11',NULL),(189,3,1,0,16,31,'2022-08-18 11:04:02','2022-08-18 11:06:12',NULL,NULL,'2022-08-18 11:06:11','2022-08-18 11:06:11',NULL),(190,1,1,0,17,23,'2022-08-18 12:46:14','2022-08-18 12:57:07',NULL,NULL,'2022-08-18 12:57:07','2022-08-18 12:57:07',NULL),(191,3,3,0,17,23,'2022-08-18 12:46:14','2022-08-18 12:57:07',NULL,NULL,'2022-08-18 12:57:07','2022-08-18 12:57:07',NULL),(192,107,4,1,17,23,'2022-08-18 12:46:14','2022-08-18 12:57:07',NULL,NULL,'2022-08-18 12:57:07','2022-08-18 12:57:07',NULL),(193,3,1,1,18,25,'2022-08-18 13:03:46','2022-08-18 13:22:43',NULL,NULL,'2022-08-18 13:22:42','2022-08-18 13:22:42',NULL),(194,1,0,1,8,25,'2022-08-18 09:07:50','2022-08-18 13:23:01',NULL,NULL,'2022-08-18 13:23:01','2022-08-18 13:23:01',NULL),(195,1,0,1,2,26,'2022-08-18 07:47:50','2022-08-18 13:23:10',NULL,NULL,'2022-08-18 13:23:10','2022-08-18 13:23:10',NULL),(196,1,0,1,9,33,'2022-08-18 09:22:00','2022-08-18 13:23:21',NULL,NULL,'2022-08-18 13:23:20','2022-08-18 13:23:20',NULL),(197,2,3,0,19,114,'2022-08-18 14:08:29','2022-08-18 14:25:09',NULL,NULL,'2022-08-18 14:25:09','2022-08-18 14:25:09',NULL),(198,1,4,0,19,114,'2022-08-18 14:08:29','2022-08-18 14:25:09',NULL,NULL,'2022-08-18 14:25:09','2022-08-18 14:25:09',NULL),(199,3,5,1,19,114,'2022-08-18 14:08:29','2022-08-18 14:25:09',NULL,NULL,'2022-08-18 14:25:09','2022-08-18 14:25:09',NULL),(200,4,1,0,19,114,'2022-08-18 14:08:29','2022-08-18 14:25:09',NULL,NULL,'2022-08-18 14:25:09','2022-08-18 14:25:09',NULL),(201,107,5,0,19,114,'2022-08-18 14:08:29','2022-08-18 14:25:09',NULL,NULL,'2022-08-18 14:25:09','2022-08-18 14:25:09',NULL),(202,2,2,0,1,115,'2022-08-18 14:27:20','2022-08-18 14:34:27',NULL,NULL,'2022-08-18 14:34:26','2022-08-18 14:34:26',NULL),(203,107,1,0,1,115,'2022-08-18 14:27:20','2022-08-18 14:34:27',NULL,NULL,'2022-08-18 14:34:26','2022-08-18 14:34:26',NULL),(204,1,2,0,1,115,'2022-08-18 14:27:20','2022-08-18 14:34:27',NULL,NULL,'2022-08-18 14:34:26','2022-08-18 14:34:26',NULL),(205,3,4,0,1,115,'2022-08-18 14:27:20','2022-08-18 14:34:27',NULL,NULL,'2022-08-18 14:34:26','2022-08-18 14:34:26',NULL),(206,4,4,1,1,115,'2022-08-18 14:27:20','2022-08-18 14:34:27',NULL,NULL,'2022-08-18 14:34:26','2022-08-18 14:34:26',NULL),(207,108,1,0,1,115,'2022-08-18 14:27:20','2022-08-18 14:34:27',NULL,NULL,'2022-08-18 14:34:26','2022-08-18 14:34:26',NULL),(208,107,0,1,2,75,'2022-08-18 14:35:28','2022-08-18 14:43:53',NULL,NULL,'2022-08-18 14:43:53','2022-08-18 14:43:53',NULL),(209,5,3,0,4,51,'2022-08-18 14:43:07','2022-08-18 14:53:36',NULL,NULL,'2022-08-18 14:53:36','2022-08-18 14:53:36',NULL),(210,4,5,1,4,51,'2022-08-18 14:43:07','2022-08-18 14:53:36',NULL,NULL,'2022-08-18 14:53:36','2022-08-18 14:53:36',NULL),(211,1,3,0,4,51,'2022-08-18 14:43:07','2022-08-18 14:53:36',NULL,NULL,'2022-08-18 14:53:36','2022-08-18 14:53:36',NULL),(212,108,5,0,4,51,'2022-08-18 14:43:07','2022-08-18 14:53:36',NULL,NULL,'2022-08-18 14:53:36','2022-08-18 14:53:36',NULL),(213,3,3,0,4,51,'2022-08-18 14:43:07','2022-08-18 14:53:36',NULL,NULL,'2022-08-18 14:53:36','2022-08-18 14:53:36',NULL),(214,2,2,0,4,51,'2022-08-18 14:43:07','2022-08-18 14:53:36',NULL,NULL,'2022-08-18 14:53:36','2022-08-18 14:53:36',NULL),(215,5,2,0,5,115,'2022-08-18 14:56:09','2022-08-18 15:10:15',NULL,NULL,'2022-08-18 15:10:14','2022-08-18 15:10:14',NULL),(216,3,2,0,5,115,'2022-08-18 14:56:09','2022-08-18 15:10:15',NULL,NULL,'2022-08-18 15:10:14','2022-08-18 15:10:14',NULL),(217,1,3,0,5,115,'2022-08-18 14:56:09','2022-08-18 15:10:15',NULL,NULL,'2022-08-18 15:10:14','2022-08-18 15:10:14',NULL),(218,4,4,1,5,115,'2022-08-18 14:56:09','2022-08-18 15:10:15',NULL,NULL,'2022-08-18 15:10:14','2022-08-18 15:10:14',NULL),(219,108,3,0,5,115,'2022-08-18 14:56:09','2022-08-18 15:10:15',NULL,NULL,'2022-08-18 15:10:14','2022-08-18 15:10:14',NULL),(220,1,0,1,10,30,'2022-08-18 16:04:59','2022-08-18 16:08:50',NULL,NULL,'2022-08-18 16:08:50','2022-08-18 16:08:50',NULL),(221,4,4,1,13,138,'2022-08-18 16:32:39','2022-08-18 16:40:17',NULL,NULL,'2022-08-18 16:40:16','2022-08-18 16:40:16',NULL),(222,1,3,0,13,138,'2022-08-18 16:32:39','2022-08-18 16:40:17',NULL,NULL,'2022-08-18 16:40:16','2022-08-18 16:40:16',NULL),(223,5,5,1,21,34,'2022-08-19 00:24:06','2022-08-19 00:32:41',NULL,NULL,'2022-08-19 00:32:40','2022-08-19 00:32:40',NULL),(224,3,3,0,21,34,'2022-08-19 00:24:06','2022-08-19 00:32:41',NULL,NULL,'2022-08-19 00:32:40','2022-08-19 00:32:40',NULL),(225,2,1,0,21,34,'2022-08-19 00:24:06','2022-08-19 00:32:41',NULL,NULL,'2022-08-19 00:32:40','2022-08-19 00:32:40',NULL);
/*!40000 ALTER TABLE `game_records` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `players`
--

DROP TABLE IF EXISTS `players`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `players` (
  `uid` int NOT NULL AUTO_INCREMENT,
  `users_uid` int NOT NULL,
  `game_conference_room_uid` int NOT NULL,
  `goldfinch` int NOT NULL,
  `role_uid` int DEFAULT '0',
  `king_count` int NOT NULL DEFAULT '0',
  `team` varchar(30) NOT NULL DEFAULT 'A',
  `accusation_count` int NOT NULL DEFAULT '0',
  `total_goldfinch` int NOT NULL DEFAULT '0',
  `random_king` tinyint NOT NULL DEFAULT '0',
  `ready_state` tinyint NOT NULL DEFAULT '0',
  `creater` varchar(20) DEFAULT NULL,
  `updater` varchar(20) DEFAULT NULL,
  `create_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `is_muted` tinyint NOT NULL DEFAULT '0',
  `is_cam_off` tinyint NOT NULL DEFAULT '0',
  `is_change_voice` tinyint NOT NULL DEFAULT '0',
  PRIMARY KEY (`uid`),
  UNIQUE KEY `users_uid` (`users_uid`),
  KEY `players_users_uid_idx` (`users_uid`),
  KEY `players_game_conference_rooms_uid_idx` (`game_conference_room_uid`),
  KEY `players_roles_role_idx` (`role_uid`),
  CONSTRAINT `players_game_conference_rooms_uid` FOREIGN KEY (`game_conference_room_uid`) REFERENCES `game_conference_rooms` (`uid`),
  CONSTRAINT `players_roles_role_uid` FOREIGN KEY (`role_uid`) REFERENCES `roles` (`uid`),
  CONSTRAINT `players_users_uid` FOREIGN KEY (`users_uid`) REFERENCES `users` (`uid`)
) ENGINE=InnoDB AUTO_INCREMENT=118 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `players`
--

LOCK TABLES `players` WRITE;
/*!40000 ALTER TABLE `players` DISABLE KEYS */;
INSERT INTO `players` VALUES (84,111,17,0,2,0,'A',0,0,0,1,NULL,NULL,'2022-08-18 18:45:57','2022-08-18 18:45:57',0,0,0),(87,112,17,0,2,0,'A',0,0,0,0,NULL,NULL,'2022-08-18 20:12:50','2022-08-18 20:12:50',0,0,0);
/*!40000 ALTER TABLE `players` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role`
--

DROP TABLE IF EXISTS `role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `role` (
  `uid` int NOT NULL AUTO_INCREMENT,
  `role` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role`
--

LOCK TABLES `role` WRITE;
/*!40000 ALTER TABLE `role` DISABLE KEYS */;
/*!40000 ALTER TABLE `role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `uid` int NOT NULL AUTO_INCREMENT,
  `role` varchar(30) NOT NULL,
  `creater` varchar(20) DEFAULT NULL,
  `updater` varchar(20) DEFAULT NULL,
  `create_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`uid`),
  UNIQUE KEY `role` (`role`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'왕',NULL,NULL,'2022-07-27 08:14:23','2022-07-27 08:14:23'),(2,'신하',NULL,NULL,'2022-07-27 08:14:26','2022-07-27 08:14:26'),(3,'king',NULL,NULL,'2022-07-30 08:31:26','2022-07-30 08:31:26'),(4,'servant',NULL,NULL,'2022-07-30 08:31:26','2022-07-30 08:31:26');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `selected_topics`
--

DROP TABLE IF EXISTS `selected_topics`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `selected_topics` (
  `uid` int NOT NULL AUTO_INCREMENT,
  `game_conference_rooms_uid` int DEFAULT NULL,
  `game_category_topics_uid` int DEFAULT NULL,
  `creater` varchar(20) DEFAULT NULL,
  `updater` varchar(20) DEFAULT NULL,
  `create_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`uid`),
  KEY `selected_topics_game_conference_rooms_uid_idx` (`game_conference_rooms_uid`),
  KEY `selected_topics_game_category_topics_uid_idx` (`game_category_topics_uid`),
  CONSTRAINT `selected_topics_game_category_topics_uid` FOREIGN KEY (`game_category_topics_uid`) REFERENCES `game_category_topics` (`uid`),
  CONSTRAINT `selected_topics_game_conference_rooms_uid` FOREIGN KEY (`game_conference_rooms_uid`) REFERENCES `game_conference_rooms` (`uid`)
) ENGINE=InnoDB AUTO_INCREMENT=440 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `selected_topics`
--

LOCK TABLES `selected_topics` WRITE;
/*!40000 ALTER TABLE `selected_topics` DISABLE KEYS */;
INSERT INTO `selected_topics` VALUES (301,442,27,NULL,NULL,'2022-08-18 00:22:18','2022-08-18 00:22:18'),(302,442,32,NULL,NULL,'2022-08-18 00:22:22','2022-08-18 00:22:22'),(303,442,34,NULL,NULL,'2022-08-18 00:22:41','2022-08-18 00:22:41'),(304,442,28,NULL,NULL,'2022-08-18 00:23:38','2022-08-18 00:23:38'),(322,444,23,NULL,NULL,'2022-08-18 01:49:56','2022-08-18 01:49:56'),(323,446,32,NULL,NULL,'2022-08-18 05:18:00','2022-08-18 05:18:00'),(324,446,34,NULL,NULL,'2022-08-18 05:21:11','2022-08-18 05:21:11'),(325,446,33,NULL,NULL,'2022-08-18 05:24:21','2022-08-18 05:24:21'),(326,446,28,NULL,NULL,'2022-08-18 05:24:58','2022-08-18 05:24:58'),(327,446,26,NULL,NULL,'2022-08-18 05:25:06','2022-08-18 05:25:06'),(328,446,31,NULL,NULL,'2022-08-18 05:25:18','2022-08-18 05:25:18'),(329,446,30,NULL,NULL,'2022-08-18 05:25:25','2022-08-18 05:25:25'),(330,446,27,NULL,NULL,'2022-08-18 05:28:32','2022-08-18 05:28:32'),(331,446,24,NULL,NULL,'2022-08-18 05:31:37','2022-08-18 05:31:37'),(332,446,25,NULL,NULL,'2022-08-18 05:31:50','2022-08-18 05:31:50'),(437,25,135,NULL,NULL,'2022-08-19 01:15:03','2022-08-19 01:15:03'),(438,26,140,NULL,NULL,'2022-08-19 01:21:02','2022-08-19 01:21:02'),(439,26,132,NULL,NULL,'2022-08-19 01:23:18','2022-08-19 01:23:18');
/*!40000 ALTER TABLE `selected_topics` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `uid` int NOT NULL AUTO_INCREMENT,
  `id` varchar(20) NOT NULL,
  `name` varchar(60) NOT NULL,
  `password` varchar(60) NOT NULL,
  `phonenumber` varchar(11) NOT NULL,
  `rankpoint` int NOT NULL DEFAULT '0',
  `nickname` varchar(60) NOT NULL,
  `img` varchar(300) DEFAULT NULL,
  `description` varchar(300) DEFAULT NULL,
  `creater` varchar(20) DEFAULT NULL,
  `updater` varchar(20) DEFAULT NULL,
  `create_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `number_of_wins` int NOT NULL DEFAULT '0',
  `number_of_loses` int NOT NULL DEFAULT '0',
  `authority` varchar(40) NOT NULL DEFAULT 'general',
  PRIMARY KEY (`uid`),
  UNIQUE KEY `nickname` (`nickname`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `nickname_UNIQUE` (`nickname`)
) ENGINE=InnoDB AUTO_INCREMENT=113 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'rkdqudtn1','병수1','$2a$10$.DpEs9sjsjJtD3Jl1lds1.JShX/vrqBApDsqX1Y8n.beXq19A2ttS','01000000000',270,'병수1',NULL,NULL,NULL,NULL,'2022-08-18 07:40:00','2022-08-18 16:40:16',6,9,'GENERAL'),(2,'kjmk1007','권도건','$2a$10$yiEfyKS6KlfZk0EOb0Uvfusj7rUBZuVZH8qA1oySZkMvOMMcEZM3i','01067531007',30,'권도건',NULL,NULL,NULL,NULL,'2022-08-18 07:40:03','2022-08-19 00:32:40',0,4,'GENERAL'),(3,'jeong746','김유정','$2a$10$61fn.wrd2vqBbS2KC7OKR.XMZUmI1VvXyOir.VHKBLBUYpMzT5/1u','01012348526',230,'김유정',NULL,'난 개멋져',NULL,NULL,'2022-08-18 07:40:12','2022-08-19 00:32:40',2,9,'GENERAL'),(4,'chanho','박찬호','$2a$10$hyP3qBQSuI02gK8jdplbZea/.qdukV1t9MAKCxsufpjaIZo9Oowuu','12345678901',320,'박찬호',NULL,NULL,NULL,NULL,'2022-08-18 07:40:12','2022-08-18 16:40:16',5,1,'GENERAL'),(5,'ehddn5252','김동우','$2a$10$/syuBl8I3SGYPm2s5VslUeEIM3zCHd2GmG4VVS8PQDgwGdgNIwdW6','01054771122',250,'김동우',NULL,NULL,NULL,NULL,'2022-08-18 07:41:37','2022-08-19 00:32:40',3,5,'GENERAL'),(101,'test103','테스트','$2a$10$w4sPekWKUHD7l7H1jEeEzOlssZ5/Yy0Jiy9855iDw5ER.VwXaVMUm','01012341234',0,'테스트',NULL,NULL,NULL,NULL,'2022-08-18 08:56:43','2022-08-18 08:56:43',0,0,'GENERAL'),(102,'rkdqudtn3','병수3','$2a$10$gF..dVXrtBqoRBA/VYWHM.kAfgltpPCNvj3cq/PrSXZ4C7IbaQup2','12412312412',0,'병수3',NULL,NULL,NULL,NULL,'2022-08-18 09:06:06','2022-08-18 09:06:06',0,0,'GENERAL'),(103,'rkdqudtn4','병수4','$2a$10$1xVDnAJ6MgTbzxUm3XBVz.UHodUUTAnT89mNk8u.ByIif7ynXzwxO','124123123',0,'병수4',NULL,NULL,NULL,NULL,'2022-08-18 09:06:59','2022-08-18 09:06:59',0,0,'GENERAL'),(104,'rkdqudtn5','병수5','$2a$10$YeXuPw1TMrErDt3ctTXHAOuSf4bnS4vlk7YgGkWiJVSxJWkbQNwSi','12345678912',0,'병수5',NULL,NULL,NULL,NULL,'2022-08-18 09:07:38','2022-08-18 09:07:38',0,0,'GENERAL'),(105,'dbwjd123','박유정','$2a$10$WSpveyzy2GfxmOK90SIMvuivNyAQZqPbm3WpfXjpBe191LuGqlwy.','01025887789',0,'바규정',NULL,NULL,NULL,NULL,'2022-08-18 10:29:22','2022-08-18 10:29:22',0,0,'GENERAL'),(106,'admin','관리자','$2a$10$w53928EkBdJHZStBbiDwHOXcX6zB0PrmMgTf7IDTOBPQQS/oZZhUO','01012341234',0,'관리자',NULL,NULL,NULL,NULL,'2022-08-18 11:51:06','2022-08-18 11:52:08',0,0,'MANAGER'),(107,'test12345','시연자1','$2a$10$iJIcoFZuAT30bBbCAV3EuOL08tGYfKVM9ObeF7vaZTeGhm8Vf8pzu','01012341234',130,'세모논다왕',NULL,NULL,NULL,NULL,'2022-08-18 12:22:27','2022-08-18 14:43:53',2,2,'GENERAL'),(108,'jeong','정찬우','$2a$10$a80Fpjo/QWMdSx9OtPfPseLhYqEtz6UDfrLLnHPI8zhJYjanaEdTC','01012341234',50,'찬우',NULL,NULL,NULL,NULL,'2022-08-18 14:26:00','2022-08-18 15:10:14',0,3,'GENERAL'),(109,'test123123','시연자','$2a$10$2JQyVcHVSCD2HeMhVwBHJeZPl64q6AAV9XHIUhQyT4BZ93AdQe3Y6','01012341234',0,'세모야놀자',NULL,NULL,NULL,NULL,'2022-08-18 15:31:03','2022-08-18 15:31:03',0,0,'GENERAL'),(110,'TEST123','시연자','$2a$10$li.1ZRK3WrsWveIQt8PxROLs4jdY.dpeEBYUdHslTKEu0Jxi7mlRa','01012341234',0,'세모야놀자2',NULL,NULL,NULL,NULL,'2022-08-18 17:37:56','2022-08-18 17:37:56',0,0,'GENERAL'),(111,'TEST1234','시연자3131','$2a$10$zrINEf0eTp6Ur7fjqALhMO3T5XzeJsDOO9migjLnhjWkEQLyDgrJO','01012341233',0,'세모야놀자3',NULL,'ㅁㄴㅇ',NULL,NULL,'2022-08-18 17:43:07','2022-08-19 02:04:53',0,0,'GENERAL'),(112,'dbwjd','김유됴미','$2a$10$N8oXm4NuFISX1kT6tsHriu6lJdEOFIEN94HrYkzGyh.BZbOj.h/sq','01078945612',0,'김유됴미',NULL,NULL,NULL,NULL,'2022-08-18 20:08:03','2022-08-18 20:08:03',0,0,'GENERAL');
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

-- Dump completed on 2022-08-19 11:33:53
