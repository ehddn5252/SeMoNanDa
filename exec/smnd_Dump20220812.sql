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
INSERT INTO `game_categories` VALUES (1,'1',2,'이미지',NULL,NULL,'2022-07-28 00:47:42','2022-08-09 02:28:35'),(2,'일상생활',2,'test img url',NULL,NULL,'2022-07-30 08:37:49','2022-08-09 02:28:35'),(3,'음식',2,'test img url',NULL,NULL,'2022-07-30 08:37:49','2022-08-09 02:28:35'),(4,'개발자',2,'test img url',NULL,NULL,'2022-07-30 08:37:49','2022-08-09 02:28:35'),(5,'MBTI',2,'test img url',NULL,NULL,'2022-07-30 08:37:49','2022-08-09 02:28:35'),(6,'연애',2,'test img url',NULL,NULL,'2022-07-30 08:37:49','2022-08-09 02:28:35'),(7,'normal',2,'이미지',NULL,NULL,'2022-08-05 07:15:55','2022-08-09 02:28:35'),(8,'극과 극',60,'test img url',NULL,NULL,'2022-08-08 04:47:20','2022-08-12 08:22:21'),(9,'교육',2,'test img url',NULL,NULL,'2022-08-08 04:47:26','2022-08-09 02:28:35');
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
) ENGINE=InnoDB AUTO_INCREMENT=113 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `game_category_topics`
--

LOCK TABLES `game_category_topics` WRITE;
/*!40000 ALTER TABLE `game_category_topics` DISABLE KEYS */;
INSERT INTO `game_category_topics` VALUES (22,7,NULL,' ',' ',0,0,NULL,NULL,'2022-08-05 07:17:27','2022-08-05 07:17:27'),(23,2,'','여름에 히터 틀고 자기','겨울에 에어컨 켜고 자기',4,4,NULL,NULL,'2022-08-08 04:55:37','2022-08-09 02:36:02'),(24,2,'','자는데 모기 소리 들리기(물리지는 않음)','소리는 없는데 모기 물리기',4,2,NULL,NULL,'2022-08-08 04:56:35','2022-08-09 02:47:27'),(25,2,'','10년 전 과거로 가기','10년 후 미래로 가기',8,2,NULL,NULL,'2022-08-08 04:56:54','2022-08-09 02:52:48'),(26,2,'','항상 불 환하게 키고 자는 룸메(불 끄면 일어나서 다시 끔)','밤마다 몰래 타자기 두드리는 룸메(시끄럽지는 않은데 거슬림)',5,2,NULL,NULL,'2022-08-08 04:57:49','2022-08-09 02:52:22'),(27,2,'','똥 안 먹었는데 먹었다고 소문나기(전 세계 사람들이 다 알고 있음)','진짜로 먹었는데 아무도 모르기',6,2,NULL,NULL,'2022-08-08 05:05:29','2022-08-09 02:36:15'),(28,2,'','똥 맛 카레','카레 맛 똥',8,3,NULL,NULL,'2022-08-08 05:05:44','2022-08-09 02:47:18'),(30,2,'','토마토맛 토','토맛 토마토',2,5,NULL,NULL,'2022-08-08 05:07:03','2022-08-09 02:38:12'),(31,2,'둘 중 더 아까운 것은?','요플레 뚜껑 그냥 버리기','쭈쭈바 꼬다리 그냥 버리기',3,4,NULL,NULL,'2022-08-08 05:07:23','2022-08-09 02:52:15'),(32,2,'평생동안','손톱 3cm','발톱 3cm',5,4,NULL,NULL,'2022-08-08 05:07:49','2022-08-09 02:52:30'),(33,2,'둘 중 더 화나는 상황은?','비오는 날 젖은 양말','비오는 날 새신발',8,0,NULL,NULL,'2022-08-08 05:08:13','2022-08-09 02:52:59'),(34,2,'평생 둘 중 하나의 모습으로 살아야한다면?','키 100cm','몸무게 100kg',5,3,NULL,NULL,'2022-08-08 05:12:33','2022-08-09 02:52:35'),(35,3,'삼겹살에','쌍추','쌈무',0,0,NULL,NULL,'2022-08-08 05:13:58','2022-08-08 05:13:58'),(36,4,'웹 프로젝트','프론트 6명이 개발','백 6명이 개발',0,0,NULL,NULL,'2022-08-08 05:14:45','2022-08-08 05:14:45'),(37,4,'','서류 탈락 100번','최종 탈락 10번',0,0,NULL,NULL,'2022-08-08 05:14:59','2022-08-08 05:14:59'),(38,4,'','40대에 은퇴하기','120살까지 코딩하기',0,0,NULL,NULL,'2022-08-08 05:15:13','2022-08-08 05:15:13'),(39,4,'','공기업','대기업',0,0,NULL,NULL,'2022-08-08 05:15:23','2022-08-08 05:15:23'),(40,4,'','세전 3000 칼취직하기','싸피 8기로 유급하기',0,0,NULL,NULL,'2022-08-08 05:15:33','2022-08-08 05:15:33'),(41,4,'','ctrl s 안 쓰기','ctrl c, ctrl v 안 쓰기',0,0,NULL,NULL,'2022-08-08 05:15:51','2022-08-08 05:15:51'),(42,4,'','스마트폰 키보드 + 외장 모니터','외장 키보드 + 스마트폰 모니터',0,0,NULL,NULL,'2022-08-08 05:16:13','2022-08-08 05:16:13'),(43,4,'','2분마다 꺼지는 컴퓨터로 코딩하기','한 타 치는데 2초 걸리는 컴퓨터로 코딩하기',0,0,NULL,NULL,'2022-08-08 05:16:29','2022-08-08 05:16:29'),(44,4,'','5분마다 “어?” 하는 동료 옆자리','5분마다 인터넷 끊기는 자리',0,0,NULL,NULL,'2022-08-08 05:17:14','2022-08-08 05:17:14'),(45,4,'','왜 안 되지?','이게 왜 되지?',0,0,NULL,NULL,'2022-08-08 05:17:28','2022-08-08 05:17:28'),(46,4,'','개발자만 있는 곳에서 일하기','나만 개발자인 곳에서 일하기',0,0,NULL,NULL,'2022-08-08 05:17:43','2022-08-08 05:17:43'),(47,4,'','웹엑스 음소거 불가','웹엑스 비디오 끄기 불가(가상배경도 안됨)',0,0,NULL,NULL,'2022-08-08 05:18:14','2022-08-08 05:18:14'),(48,4,'','음성 인식으로 코딩하기','천지인으로 코딩하기',0,0,NULL,NULL,'2022-08-08 05:18:29','2022-08-08 05:18:29'),(49,4,'','구글링 없기 코딩하기','복붙 없이 코딩하기',0,0,NULL,NULL,'2022-08-08 05:18:42','2022-08-08 05:18:42'),(50,4,'','내 나이 보다 평균 연령 30살 높은 곳에서 일하기','내 나이보다 평균 연령 10살 낮은 곳에서 일하기',0,0,NULL,NULL,'2022-08-08 05:21:15','2022-08-08 05:21:15'),(51,6,'결혼 전','동거 괜찮다','안 괜찮다',0,0,NULL,NULL,'2022-08-08 06:02:45','2022-08-08 06:02:45'),(52,6,'남녀 사이에 친구는','존재 한다','안 한다',0,0,NULL,NULL,'2022-08-08 06:03:03','2022-08-08 06:03:03'),(53,6,'내 애인이 이성친구와 단 둘이 영화를 보는 것','된다','안 된다',0,0,NULL,NULL,'2022-08-08 06:04:36','2022-08-08 06:04:36'),(54,6,'내 친구와의 술자리에서 나의 애인이 온다는 얘기를 듣고 화장을 고치거나 향수를 뿌리는 등 꾸미는 거','신경 쓰인다','안 쓰인다',0,0,NULL,NULL,'2022-08-08 06:05:22','2022-08-08 06:05:22'),(55,6,'다음 중 더 화나는 상황은?','애인 집에 내 친구','친구 집에 내 애인',0,0,NULL,NULL,'2022-08-08 06:06:00','2022-08-08 06:06:00'),(56,6,'나, 친구, 애인 이렇게 세 명이 밥을 상황에서 까먹기 귀찮은 새우가 나온다. \n    이런 상황에서 남자친구가 친구에게 새우를 먹기 편하게 까준다면?','까주도록 내버려 둔다','절대 안된다',0,0,NULL,NULL,'2022-08-08 06:17:46','2022-08-08 06:17:46'),(57,6,'','주위에 여사친 or 남사친 많은 애인','친구가 1도 없는 애인(하루라도 안 놀아주면 큰일 남)',0,0,NULL,NULL,'2022-08-08 06:17:46','2022-08-08 06:17:46'),(58,6,'','데이트 코스 1분 1초 단위로 계획하는 애인','아무 생각 없이 나오는 애인',0,0,NULL,NULL,'2022-08-08 06:17:47','2022-08-08 06:17:47'),(59,6,'','환승 이별','잠수 이별',0,0,NULL,NULL,'2022-08-08 06:17:47','2022-08-08 06:17:47'),(60,6,'','싸운 후 다 이야기하고 다니는 애인','싸운 후 전혀 타격감 없어 보이는 애인',0,0,NULL,NULL,'2022-08-08 06:17:47','2022-08-08 06:17:47'),(61,6,'매일봐도','설레는 연애','편안한 연애',0,0,NULL,NULL,'2022-08-08 06:17:47','2022-08-08 06:17:47'),(62,6,'','이상형 만나고 주변인과 연 끊기','평생 솔로로 지내며 친구와 지내기',0,0,NULL,NULL,'2022-08-08 06:17:47','2022-08-08 06:17:47'),(63,6,'','내가 좋아하는 사람이랑 연애','나를 좋아하는 사람이랑 연애',0,0,NULL,NULL,'2022-08-08 06:17:47','2022-08-08 06:17:47'),(64,6,'','1년 동안 10명 만난 애인','10년 동안 1명과 계속 만난 애인',0,0,NULL,NULL,'2022-08-08 06:17:47','2022-08-08 06:17:47'),(65,6,'','','',0,0,NULL,NULL,'2022-08-08 06:17:48','2022-08-08 06:17:48'),(66,7,'','주 3일 근무 월급 180','주 7일 근무 월급 650 (5년 이내 퇴사 불가)',0,0,NULL,NULL,'2022-08-08 06:24:45','2022-08-08 06:24:45'),(67,7,'','편의점에서 이어폰 꼽고 일해도 된다.','편의점에서 이어폰 꼽고 일하면 안 된다.',0,0,NULL,NULL,'2022-08-08 06:24:45','2022-08-08 06:24:45'),(68,7,'','5년동안 내가 하고 싶은 것만 하면서 살기','4년 동안 일만하고 집 사기',0,0,NULL,NULL,'2022-08-08 06:24:45','2022-08-08 06:24:45'),(69,7,'','연봉 100억 10년 살기','연봉 2000~4000 복불복 80 년 살기',0,0,NULL,NULL,'2022-08-08 06:24:46','2022-08-08 06:24:46'),(70,7,'','평생 매일 0.3인분 먹기','평생 매끼 5인분 먹기',0,0,NULL,NULL,'2022-08-08 06:24:46','2022-08-08 06:24:46'),(71,7,'','매일 5시간 이상 운동하는 애인','운동 안 하는 애인',0,0,NULL,NULL,'2022-08-08 06:24:46','2022-08-08 06:24:46'),(72,7,'사내 연애','공개','비공개',0,0,NULL,NULL,'2022-08-08 06:24:46','2022-08-08 06:24:46'),(73,7,'','100% 확률로 1억 받기','30% 확률로 100억 받기',0,0,NULL,NULL,'2022-08-08 06:24:46','2022-08-08 06:24:46'),(74,7,'','월급 500 2년마다 무조건 이직','월급 300 평생 직장',0,0,NULL,NULL,'2022-08-08 06:24:46','2022-08-08 06:24:46'),(75,7,'','폰 없이 1년 살기','친구 없이 1년 살기',0,0,NULL,NULL,'2022-08-08 06:24:46','2022-08-08 06:24:46'),(76,7,'','평생 애국가 외 음악 못 듣고 살기','평생 외국 못 나가기',0,0,NULL,NULL,'2022-08-08 06:24:47','2022-08-08 06:24:47'),(77,5,'기분이 우울해서 화분을 샀는데…','괜찮아?','무슨 화분?',0,0,NULL,NULL,'2022-08-08 06:25:33','2022-08-08 06:25:33'),(78,5,'기분이 우울해서 앞머리를 잘랐는데…','무슨일이야?','사진 보내봐',0,0,NULL,NULL,'2022-08-08 06:25:33','2022-08-08 06:25:33'),(79,5,'친구가 약속에 늦었을 때…','사과하면 용서해줌','늦은 이유를 말하면 용서해줌',0,0,NULL,NULL,'2022-08-08 06:25:33','2022-08-08 06:25:33'),(80,5,'관심이 없는 상대가 말할 때…','리액션을 안 함','질문을 안 함',0,0,NULL,NULL,'2022-08-08 06:25:33','2022-08-08 06:25:33'),(81,5,'','아무도 몰래 똥 먹기','똥 안 먹었는데 똥 먹었다고 소문나기',0,0,NULL,NULL,'2022-08-08 06:25:34','2022-08-08 06:25:34'),(82,5,'','마동석한테 맞고 이국종한테 수술받기','이국종한테 맞고 마동석한테 수술받기',0,0,NULL,NULL,'2022-08-08 06:25:34','2022-08-08 06:25:34'),(83,5,'다시태어난다면','원하는 얼굴','원하는 몸매',0,0,NULL,NULL,'2022-08-08 06:25:34','2022-08-08 06:25:34'),(84,5,'','잠수이별 당하기','환승이별 당하기',0,0,NULL,NULL,'2022-08-08 06:25:34','2022-08-08 06:25:34'),(85,5,'','전 애인의 절친과 사귀기','절친의 전 애인과 사귀기',0,0,NULL,NULL,'2022-08-08 06:25:34','2022-08-08 06:25:34'),(86,5,'','아무도 내 말을 못 듣기','나만 말할 수 있기',0,0,NULL,NULL,'2022-08-08 06:25:34','2022-08-08 06:25:34'),(87,5,'','평생 두통','평생 치통',0,0,NULL,NULL,'2022-08-08 06:25:34','2022-08-08 06:25:34'),(88,5,'','애인과 하루종일 데이트','원하는 연예인과 1시간 데이트',0,0,NULL,NULL,'2022-08-08 06:25:34','2022-08-08 06:25:34'),(89,5,'','조별과제 혼자하기','조원이 만들어준 보노보노ppt로 발표하기',0,0,NULL,NULL,'2022-08-08 06:25:35','2022-08-08 06:25:35'),(90,5,'','게임이야기만 하는 애인','애니메이션 이야기만 하는 애인',0,0,NULL,NULL,'2022-08-08 06:25:35','2022-08-08 06:25:35'),(91,5,'','옷 안 빨아 입는 애인','샤워 안 하는 애인',0,0,NULL,NULL,'2022-08-08 06:25:35','2022-08-08 06:25:35'),(92,5,'','웹엑스 음소거 불가',' 웹엑스 비디오 끄기 불가(가상배경도 안됨)',0,0,NULL,NULL,'2022-08-08 06:25:35','2022-08-08 06:25:35'),(93,5,'','1분마다 마우스 고장나기','1분마다 키보드 고장나기',0,0,NULL,NULL,'2022-08-08 06:25:35','2022-08-08 06:25:35'),(94,5,'','화상키보드로 코딩하기','노트에 손으로 코딩하기',0,0,NULL,NULL,'2022-08-08 06:25:35','2022-08-08 06:25:35'),(95,5,'','드라이기 없이 평생살기','고데기 없이 평생살기',0,0,NULL,NULL,'2022-08-08 06:25:35','2022-08-08 06:25:35'),(96,5,'','매일 층간소음 내는 윗집과 살기','아무소리 안 내도 매일 올라와서 시끄럽다 항의하는 아랫집과 살기',0,0,NULL,NULL,'2022-08-08 06:25:35','2022-08-08 06:25:35'),(97,5,'','마마보이(마마걸) 배우자와 살기','의처증(의부증) 배우자와 살기',0,0,NULL,NULL,'2022-08-08 06:25:36','2022-08-08 06:25:36'),(98,5,'','완벽한 상체에 병약한 하체 갖기','완벽한 하체에 병약한 상체 갖기',0,0,NULL,NULL,'2022-08-08 06:25:36','2022-08-08 06:25:36'),(99,5,'','샤워하다 불났을 때 얼굴만 가리고 나오기','몸만 가리고 나오기',0,0,NULL,NULL,'2022-08-08 06:25:36','2022-08-08 06:25:36'),(100,5,'','내 애인 몸에 내 친구이름 문신','내 친구 몸에 내 애인이름 문신',0,0,NULL,NULL,'2022-08-08 06:25:36','2022-08-08 06:25:36'),(101,5,'','24시간 바선생 관찰하기','24시간 바선생한테 관찰당하기',0,0,NULL,NULL,'2022-08-08 06:25:36','2022-08-08 06:25:36'),(102,5,'','한국드라마 소리,자막없이 보기','소리랑 자막만 보기',0,0,NULL,NULL,'2022-08-08 06:25:36','2022-08-08 06:25:36'),(103,5,'','단톡방에서 공개 고백받기','길거리에서 공개고백 받기',0,0,NULL,NULL,'2022-08-08 06:25:36','2022-08-08 06:25:36'),(104,5,'','지옥철 30분 서서 출퇴근','텅 빈 버스 앉아서 1시간30분 출퇴근',0,0,NULL,NULL,'2022-08-08 06:25:36','2022-08-08 06:25:36'),(105,5,'','기술적으로 배울 점이 많은 꼰대 상사','배울 점이 하나도 없는 착한 상사',0,0,NULL,NULL,'2022-08-08 06:25:37','2022-08-08 06:25:37'),(106,5,'',' 근무 중 상사한테 실수로 게임초대 문자 보내기','퇴근 후 술먹다 상사한테 실수로 험담 보내기',0,0,NULL,NULL,'2022-08-08 06:25:37','2022-08-08 06:25:37'),(107,5,'','대기업 면접에서 똥지리고 합격하기','대기업 면접에서 방구뀌고 떨어지기',0,0,NULL,NULL,'2022-08-08 06:25:37','2022-08-08 06:25:37'),(108,5,'','평생 탈모','평생 무좀',0,0,NULL,NULL,'2022-08-08 06:25:37','2022-08-08 06:25:37'),(109,8,'식물인간 안락사','찬성','반대',7,4,NULL,NULL,'2022-08-08 06:26:28','2022-08-12 08:25:47'),(110,8,'GMO 식품','먹어도 된다','먹으면 안된다',8,4,NULL,NULL,'2022-08-08 06:26:45','2022-08-12 08:29:55'),(111,8,'복제인간','찬성','반대',7,4,NULL,NULL,'2022-08-08 06:26:58','2022-08-12 08:29:47'),(112,8,'냉동인간','찬성','반대',5,1,NULL,NULL,'2022-08-08 06:27:02','2022-08-12 08:16:02');
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
) ENGINE=InnoDB AUTO_INCREMENT=298 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `game_conference_rooms`
--

LOCK TABLES `game_conference_rooms` WRITE;
/*!40000 ALTER TABLE `game_conference_rooms` DISABLE KEYS */;
INSERT INTO `game_conference_rooms` VALUES (245,1,8,109,35,'pm9A7Q363','2022-08-09 15:51:57',NULL,NULL,'초보만',NULL,NULL,NULL,NULL,NULL,'2022-08-10 00:51:57','2022-08-12 06:59:12',0,NULL,'싸피'),(246,1,2,35,35,'jQF5LW11','2022-08-09 15:52:09',NULL,NULL,'고수만',NULL,NULL,NULL,NULL,NULL,'2022-08-10 00:52:09','2022-08-10 00:52:09',0,NULL,'싸피'),(247,1,5,35,35,'0Tr35X','2022-08-09 15:52:32',NULL,NULL,'3명방 임당~',NULL,NULL,NULL,NULL,NULL,'2022-08-10 00:52:32','2022-08-10 00:52:32',0,NULL,'싸피'),(248,1,7,35,35,'8a1E40u0','2022-08-09 16:44:45',NULL,NULL,'아무나',NULL,NULL,NULL,NULL,NULL,'2022-08-10 01:44:44','2022-08-10 01:44:44',0,NULL,'싸피'),(250,1,3,35,1,'R3n4XLXm33','2022-08-09 16:48:19',NULL,NULL,'10:48아무나',NULL,NULL,NULL,NULL,NULL,'2022-08-10 01:48:19','2022-08-10 01:48:19',0,NULL,'james'),(251,1,3,35,1,'VxBE9wGj1P','2022-08-09 16:48:33',NULL,NULL,'10:48아무나',NULL,NULL,NULL,NULL,NULL,'2022-08-10 01:48:32','2022-08-10 01:48:32',0,NULL,'james'),(252,1,3,35,1,'8S81UA689','2022-08-09 16:48:42',NULL,NULL,'10:48아무나',NULL,NULL,NULL,NULL,NULL,'2022-08-10 01:48:41','2022-08-10 01:48:41',0,NULL,'james'),(253,1,4,35,35,'6B3xk4bQ1','2022-08-10 20:04:14',NULL,NULL,'고수말고요~',NULL,NULL,NULL,NULL,NULL,'2022-08-11 05:04:14','2022-08-11 05:04:14',0,NULL,'싸피'),(254,1,8,35,35,'2jaAgo4','2022-08-10 20:30:10',NULL,NULL,'제발 초보만!!',NULL,NULL,NULL,NULL,NULL,'2022-08-11 05:30:11','2022-08-11 05:30:11',0,NULL,'싸피'),(255,1,4,35,81,'ONqDBCc','2022-08-10 23:46:28',NULL,NULL,'123',NULL,NULL,NULL,NULL,NULL,'2022-08-11 08:46:27','2022-08-11 08:46:27',0,NULL,'mm'),(256,1,4,35,81,'puJmwf2UPW','2022-08-10 23:46:32',NULL,NULL,'123',NULL,NULL,NULL,NULL,NULL,'2022-08-11 08:46:32','2022-08-11 08:46:32',0,NULL,'mm'),(257,1,4,35,81,'AkYAcBx37Y','2022-08-10 23:46:40',NULL,NULL,'123',NULL,NULL,NULL,NULL,NULL,'2022-08-11 08:46:39','2022-08-11 08:46:39',0,NULL,'mm'),(258,1,4,35,81,'WcG1bBT','2022-08-10 23:46:41',NULL,NULL,'123',NULL,NULL,NULL,NULL,NULL,'2022-08-11 08:46:40','2022-08-11 08:46:40',0,NULL,'mm'),(259,1,4,35,81,'f69Gt9aFUdU','2022-08-10 23:46:42',NULL,NULL,'123',NULL,NULL,NULL,NULL,NULL,'2022-08-11 08:46:41','2022-08-11 08:46:41',0,NULL,'mm'),(260,1,7,35,35,'B2J8bViK9bh','2022-08-11 20:39:25',NULL,NULL,'찬호',NULL,NULL,NULL,NULL,NULL,'2022-08-12 05:39:25','2022-08-12 05:39:25',0,NULL,'싸피'),(261,1,8,109,35,'gCUm1dPcj','2022-08-11 21:07:12',NULL,NULL,'도건',NULL,NULL,NULL,NULL,NULL,'2022-08-12 06:07:11','2022-08-12 08:29:56',0,NULL,'싸피'),(262,1,2,35,92,'tIwM2C7Y','2022-08-11 21:27:29',NULL,NULL,'ㄴㅇㄹ',NULL,NULL,NULL,NULL,NULL,'2022-08-12 06:27:29','2022-08-12 06:27:29',0,NULL,'김싸피'),(263,1,2,35,92,'Q0OW','2022-08-11 21:27:30',NULL,NULL,'ㄴㅇㄹ',NULL,NULL,NULL,NULL,NULL,'2022-08-12 06:27:30','2022-08-12 06:27:30',0,NULL,'김싸피'),(264,1,2,35,92,'5rGe4LJNw1','2022-08-11 21:27:31',NULL,NULL,'ㄴㅇㄹ',NULL,NULL,NULL,NULL,NULL,'2022-08-12 06:27:30','2022-08-12 06:27:30',0,NULL,'김싸피'),(265,1,4,35,92,'2PLhqhH5M6','2022-08-11 21:27:43',NULL,NULL,'ㅈㄷㄱ',NULL,NULL,NULL,NULL,NULL,'2022-08-12 06:27:43','2022-08-12 06:27:43',0,NULL,'김싸피'),(267,1,4,35,35,'8djKvtv7PVW','2022-08-11 21:47:33',NULL,NULL,'찬우',NULL,NULL,NULL,NULL,NULL,'2022-08-12 06:47:33','2022-08-12 06:47:33',0,NULL,'싸피'),(268,1,2,35,35,'WyOJC6h6H','2022-08-11 21:50:42',NULL,NULL,'동우',NULL,NULL,NULL,NULL,NULL,'2022-08-12 06:50:41','2022-08-12 06:50:41',0,NULL,'싸피'),(269,1,2,35,35,'euI10a4','2022-08-11 21:51:24',NULL,NULL,'동우',NULL,NULL,NULL,NULL,NULL,'2022-08-12 06:51:23','2022-08-12 06:51:23',0,NULL,'싸피'),(270,1,7,35,35,'Kk0mX5nSkBn2','2022-08-11 21:59:51',NULL,NULL,'하하하',NULL,NULL,NULL,NULL,NULL,'2022-08-12 06:59:51','2022-08-12 06:59:51',0,NULL,'싸피'),(271,1,8,35,35,'CP5aeBmwwy','2022-08-11 22:01:38',NULL,NULL,'마나나',NULL,NULL,NULL,NULL,NULL,'2022-08-12 07:01:37','2022-08-12 07:01:37',0,NULL,'싸피'),(272,1,8,35,35,'Q99xL4A','2022-08-11 22:01:52',NULL,NULL,'마나나',NULL,NULL,NULL,NULL,NULL,'2022-08-12 07:01:51','2022-08-12 07:01:51',0,NULL,'싸피'),(273,1,8,35,35,'4wk77pGLK','2022-08-11 22:03:34',NULL,NULL,'마나나',NULL,NULL,NULL,NULL,NULL,'2022-08-12 07:03:34','2022-08-12 07:03:34',0,NULL,'싸피'),(274,1,8,35,35,'0C95Fb8Fx5','2022-08-11 22:04:35',NULL,NULL,'마나나',NULL,NULL,NULL,NULL,NULL,'2022-08-12 07:04:34','2022-08-12 07:04:34',0,NULL,'싸피'),(275,1,3,35,35,'V0Ea4J54K1XO','2022-08-11 22:04:44',NULL,NULL,'qpqpqpqp',NULL,NULL,NULL,NULL,NULL,'2022-08-12 07:04:43','2022-08-12 07:04:43',0,NULL,'싸피'),(276,1,2,35,35,'dL','2022-08-11 22:06:19',NULL,NULL,'12312asd',NULL,NULL,NULL,NULL,NULL,'2022-08-12 07:06:19','2022-08-12 07:06:19',0,NULL,'싸피'),(277,1,3,35,35,'yd0D23uI9','2022-08-11 22:07:13',NULL,NULL,'12312asd',NULL,NULL,NULL,NULL,NULL,'2022-08-12 07:07:13','2022-08-12 07:07:13',0,NULL,'싸피'),(281,1,2,35,35,'BPiphVihy4N','2022-08-12 04:13:54',NULL,NULL,'ddd',NULL,NULL,NULL,NULL,NULL,'2022-08-12 13:13:53','2022-08-12 13:13:53',0,NULL,'싸피'),(282,1,2,35,35,'avT3mx4YdyE','2022-08-12 04:28:03',NULL,NULL,'ddd',NULL,NULL,NULL,NULL,NULL,'2022-08-12 13:28:03','2022-08-12 13:28:03',0,NULL,'싸피'),(283,1,2,35,35,'66FBYTo','2022-08-12 04:43:33',NULL,NULL,'ddd123',NULL,NULL,NULL,NULL,NULL,'2022-08-12 13:43:33','2022-08-12 13:43:33',0,NULL,'싸피'),(284,1,2,35,35,'q3k2APLLCc1Q','2022-08-12 04:45:52',NULL,NULL,'ddd123',NULL,NULL,NULL,NULL,NULL,'2022-08-12 13:45:51','2022-08-12 13:45:51',0,NULL,'싸피'),(285,1,5,35,35,'R0Bg7wP','2022-08-12 04:47:04',NULL,NULL,'11',NULL,NULL,NULL,NULL,NULL,'2022-08-12 13:47:04','2022-08-12 13:47:04',0,NULL,'싸피'),(286,1,7,35,35,'nglR8wv883U4','2022-08-12 04:48:56',NULL,NULL,'111231',NULL,NULL,NULL,NULL,NULL,'2022-08-12 13:48:56','2022-08-12 13:48:56',0,NULL,'싸피'),(287,1,5,35,35,'m21oXe','2022-08-12 04:52:23',NULL,NULL,'fkfkf',NULL,NULL,NULL,NULL,NULL,'2022-08-12 13:52:22','2022-08-12 13:52:22',0,NULL,'싸피'),(288,1,2,35,35,'lhx1onU','2022-08-12 04:53:34',NULL,NULL,'fkfkf1111',NULL,NULL,NULL,NULL,NULL,'2022-08-12 13:53:34','2022-08-12 13:53:34',0,NULL,'싸피'),(290,0,1,22,34,'DuG4etjb','2022-08-12 05:02:12',NULL,NULL,'커스텀방입니다',NULL,NULL,NULL,NULL,NULL,'2022-08-12 14:02:13','2022-08-12 14:02:13',0,NULL,'woodong'),(291,0,1,22,34,'LKHOm','2022-08-12 05:04:08',NULL,'','커스텀방입니다',NULL,NULL,NULL,NULL,NULL,'2022-08-12 14:04:09','2022-08-12 14:04:09',0,NULL,'woodong'),(294,0,1,22,35,'8Ctd0FP','2022-08-12 05:06:25',NULL,'dfdf','1111',NULL,NULL,NULL,NULL,NULL,'2022-08-12 14:06:25','2022-08-12 14:06:25',0,NULL,'싸피'),(295,1,3,35,35,'DEv3KB6','2022-08-12 05:12:24',NULL,NULL,'22',NULL,NULL,NULL,NULL,NULL,'2022-08-12 14:12:24','2022-08-12 14:12:24',0,NULL,'싸피'),(296,1,5,35,35,'0PD3Rv2sa','2022-08-12 05:14:10',NULL,NULL,'ddd',NULL,NULL,NULL,NULL,NULL,'2022-08-12 14:14:10','2022-08-12 14:14:10',0,NULL,'싸피'),(297,1,7,35,35,'U0gm1M1uAN','2022-08-12 05:14:27',NULL,NULL,'11',NULL,NULL,NULL,NULL,NULL,'2022-08-12 14:14:26','2022-08-12 14:14:26',0,NULL,'싸피');
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
) ENGINE=InnoDB AUTO_INCREMENT=99 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `game_records`
--

LOCK TABLES `game_records` WRITE;
/*!40000 ALTER TABLE `game_records` DISABLE KEYS */;
INSERT INTO `game_records` VALUES (1,34,3,0,3,5,'2022-07-28 09:00:00','2022-08-03 01:56:35',NULL,NULL,'2022-08-03 01:56:34','2022-08-03 01:56:34',34),(2,35,3,0,3,5,'2022-07-28 09:00:00','2022-08-03 01:56:35',NULL,NULL,'2022-08-03 01:56:34','2022-08-03 01:56:34',35),(3,36,3,1,3,5,'2022-07-28 09:00:00','2022-08-03 01:56:35',NULL,NULL,'2022-08-03 01:56:34','2022-08-03 01:56:34',36),(4,37,3,0,3,5,'2022-07-28 09:00:00','2022-08-03 01:56:35',NULL,NULL,'2022-08-03 01:56:35','2022-08-03 01:56:35',37),(5,38,3,0,3,5,'2022-07-28 09:00:00','2022-08-03 01:56:35',NULL,NULL,'2022-08-03 01:56:35','2022-08-03 01:56:35',38),(6,39,3,0,3,5,'2022-07-28 09:00:00','2022-08-03 01:56:35',NULL,NULL,'2022-08-03 01:56:35','2022-08-03 01:56:35',39),(7,40,3,0,3,5,'2022-07-28 09:00:00','2022-08-03 01:56:35',NULL,NULL,'2022-08-03 01:56:35','2022-08-03 01:56:35',40),(8,41,3,0,3,5,'2022-07-28 09:00:00','2022-08-03 01:56:35',NULL,NULL,'2022-08-03 01:56:35','2022-08-03 01:56:35',41),(9,34,0,0,3,5,'2022-07-28 09:00:00','2022-08-03 01:59:36',NULL,NULL,'2022-08-03 01:59:36','2022-08-03 01:59:36',34),(10,35,0,0,3,5,'2022-07-28 09:00:00','2022-08-03 01:59:36',NULL,NULL,'2022-08-03 01:59:36','2022-08-03 01:59:36',35),(11,36,0,1,3,5,'2022-07-28 09:00:00','2022-08-03 01:59:36',NULL,NULL,'2022-08-03 01:59:36','2022-08-03 01:59:36',36),(12,37,0,0,3,5,'2022-07-28 09:00:00','2022-08-03 01:59:36',NULL,NULL,'2022-08-03 01:59:36','2022-08-03 01:59:36',37),(13,38,0,0,3,5,'2022-07-28 09:00:00','2022-08-03 01:59:36',NULL,NULL,'2022-08-03 01:59:36','2022-08-03 01:59:36',38),(14,39,0,0,3,5,'2022-07-28 09:00:00','2022-08-03 01:59:36',NULL,NULL,'2022-08-03 01:59:36','2022-08-03 01:59:36',39),(15,40,0,0,3,5,'2022-07-28 09:00:00','2022-08-03 01:59:36',NULL,NULL,'2022-08-03 01:59:36','2022-08-03 01:59:36',40),(16,41,0,0,3,5,'2022-07-28 09:00:00','2022-08-03 01:59:36',NULL,NULL,'2022-08-03 01:59:36','2022-08-03 01:59:36',41),(18,34,4,0,3,13,'2022-07-28 09:00:00','2022-08-03 08:00:42',NULL,NULL,'2022-08-03 08:00:42','2022-08-03 08:00:42',34),(19,35,4,0,3,13,'2022-07-28 09:00:00','2022-08-03 08:00:42',NULL,NULL,'2022-08-03 08:00:42','2022-08-03 08:00:42',35),(20,36,4,1,3,13,'2022-07-28 09:00:00','2022-08-03 08:00:42',NULL,NULL,'2022-08-03 08:00:42','2022-08-03 08:00:42',36),(21,37,4,0,3,13,'2022-07-28 09:00:00','2022-08-03 08:00:42',NULL,NULL,'2022-08-03 08:00:42','2022-08-03 08:00:42',37),(22,38,4,0,3,13,'2022-07-28 09:00:00','2022-08-03 08:00:42',NULL,NULL,'2022-08-03 08:00:42','2022-08-03 08:00:42',38),(23,39,4,0,3,13,'2022-07-28 09:00:00','2022-08-03 08:00:42',NULL,NULL,'2022-08-03 08:00:42','2022-08-03 08:00:42',39),(24,40,4,0,3,13,'2022-07-28 09:00:00','2022-08-03 08:00:42',NULL,NULL,'2022-08-03 08:00:42','2022-08-03 08:00:42',40),(25,41,4,0,3,13,'2022-07-28 09:00:00','2022-08-03 08:00:42',NULL,NULL,'2022-08-03 08:00:42','2022-08-03 08:00:42',41),(26,82,0,1,3,23,'2022-07-28 09:00:00','2022-08-08 06:51:49',NULL,NULL,'2022-08-08 06:51:48','2022-08-08 06:51:48',NULL),(27,87,0,0,3,23,'2022-07-28 09:00:00','2022-08-08 06:51:49',NULL,NULL,'2022-08-08 06:51:48','2022-08-08 06:51:48',NULL),(28,86,0,0,3,23,'2022-07-28 09:00:00','2022-08-08 06:51:49',NULL,NULL,'2022-08-08 06:51:48','2022-08-08 06:51:48',NULL),(29,82,6,1,3,30,'2022-07-28 09:00:00','2022-08-08 07:04:55',NULL,NULL,'2022-08-08 07:04:54','2022-08-08 07:04:54',NULL),(30,87,3,0,3,30,'2022-07-28 09:00:00','2022-08-08 07:04:55',NULL,NULL,'2022-08-08 07:04:54','2022-08-08 07:04:54',NULL),(31,86,5,0,3,30,'2022-07-28 09:00:00','2022-08-08 07:04:55',NULL,NULL,'2022-08-08 07:04:54','2022-08-08 07:04:54',NULL),(32,86,0,0,3,30,'2022-07-28 09:00:00','2022-08-08 07:19:33',NULL,NULL,'2022-08-08 07:19:33','2022-08-08 07:19:33',NULL),(33,87,0,0,3,30,'2022-07-28 09:00:00','2022-08-08 07:19:33',NULL,NULL,'2022-08-08 07:19:33','2022-08-08 07:19:33',NULL),(34,82,0,1,3,30,'2022-07-28 09:00:00','2022-08-08 07:19:33',NULL,NULL,'2022-08-08 07:19:33','2022-08-08 07:19:33',NULL),(35,86,0,1,3,30,'2022-07-28 09:00:00','2022-08-08 07:19:53',NULL,NULL,'2022-08-08 07:19:53','2022-08-08 07:19:53',NULL),(36,87,0,0,3,30,'2022-07-28 09:00:00','2022-08-08 07:19:53',NULL,NULL,'2022-08-08 07:19:53','2022-08-08 07:19:53',NULL),(37,82,0,0,3,30,'2022-07-28 09:00:00','2022-08-08 07:19:53',NULL,NULL,'2022-08-08 07:19:53','2022-08-08 07:19:53',NULL),(38,86,0,1,3,30,'2022-07-28 09:00:00','2022-08-08 07:25:09',NULL,NULL,'2022-08-08 07:25:09','2022-08-08 07:25:09',NULL),(39,87,0,0,3,30,'2022-07-28 09:00:00','2022-08-08 07:25:09',NULL,NULL,'2022-08-08 07:25:09','2022-08-08 07:25:09',NULL),(40,82,0,0,3,30,'2022-07-28 09:00:00','2022-08-08 07:25:09',NULL,NULL,'2022-08-08 07:25:09','2022-08-08 07:25:09',NULL),(41,86,0,1,3,30,'2022-07-28 09:00:00','2022-08-08 07:25:18',NULL,NULL,'2022-08-08 07:25:17','2022-08-08 07:25:17',NULL),(42,87,0,0,3,30,'2022-07-28 09:00:00','2022-08-08 07:25:18',NULL,NULL,'2022-08-08 07:25:17','2022-08-08 07:25:17',NULL),(43,82,0,0,3,30,'2022-07-28 09:00:00','2022-08-08 07:25:18',NULL,NULL,'2022-08-08 07:25:17','2022-08-08 07:25:17',NULL),(44,86,0,0,3,30,'2022-07-28 09:00:00','2022-08-08 07:26:01',NULL,NULL,'2022-08-08 07:26:01','2022-08-08 07:26:01',NULL),(45,87,0,0,3,30,'2022-07-28 09:00:00','2022-08-08 07:26:01',NULL,NULL,'2022-08-08 07:26:01','2022-08-08 07:26:01',NULL),(46,82,0,1,3,30,'2022-07-28 09:00:00','2022-08-08 07:26:01',NULL,NULL,'2022-08-08 07:26:01','2022-08-08 07:26:01',NULL),(47,82,5,0,3,34,'2022-07-28 09:00:00','2022-08-08 07:30:29',NULL,NULL,'2022-08-08 07:30:29','2022-08-08 07:30:29',NULL),(48,87,6,1,3,34,'2022-07-28 09:00:00','2022-08-08 07:30:29',NULL,NULL,'2022-08-08 07:30:29','2022-08-08 07:30:29',NULL),(49,86,3,0,3,34,'2022-07-28 09:00:00','2022-08-08 07:30:29',NULL,NULL,'2022-08-08 07:30:29','2022-08-08 07:30:29',NULL),(50,87,3,0,3,33,'2022-07-28 09:00:00','2022-08-08 07:38:29',NULL,NULL,'2022-08-08 07:38:28','2022-08-08 07:38:28',NULL),(51,82,6,1,3,33,'2022-07-28 09:00:00','2022-08-08 07:38:29',NULL,NULL,'2022-08-08 07:38:29','2022-08-08 07:38:29',NULL),(52,86,0,0,3,33,'2022-07-28 09:00:00','2022-08-08 07:38:29',NULL,NULL,'2022-08-08 07:38:29','2022-08-08 07:38:29',NULL),(53,82,7,1,3,24,'2022-07-28 09:00:00','2022-08-08 07:40:49',NULL,NULL,'2022-08-08 07:40:49','2022-08-08 07:40:49',NULL),(54,87,3,0,3,24,'2022-07-28 09:00:00','2022-08-08 07:40:49',NULL,NULL,'2022-08-08 07:40:49','2022-08-08 07:40:49',NULL),(55,86,0,0,3,24,'2022-07-28 09:00:00','2022-08-08 07:40:49',NULL,NULL,'2022-08-08 07:40:49','2022-08-08 07:40:49',NULL),(56,86,2,0,3,31,'2022-07-28 09:00:00','2022-08-09 02:30:17',NULL,NULL,'2022-08-09 02:30:16','2022-08-09 02:30:16',NULL),(57,84,6,1,3,31,'2022-07-28 09:00:00','2022-08-09 02:30:17',NULL,NULL,'2022-08-09 02:30:16','2022-08-09 02:30:16',NULL),(58,82,2,0,3,31,'2022-07-28 09:00:00','2022-08-09 02:30:17',NULL,NULL,'2022-08-09 02:30:16','2022-08-09 02:30:16',NULL),(59,84,3,0,3,23,'2022-07-28 09:00:00','2022-08-09 02:38:22',NULL,NULL,'2022-08-09 02:38:21','2022-08-09 02:38:21',NULL),(60,86,4,0,3,23,'2022-07-28 09:00:00','2022-08-09 02:38:22',NULL,NULL,'2022-08-09 02:38:21','2022-08-09 02:38:21',NULL),(61,82,6,1,3,23,'2022-07-28 09:00:00','2022-08-09 02:38:22',NULL,NULL,'2022-08-09 02:38:21','2022-08-09 02:38:21',NULL),(62,84,0,0,3,24,'2022-07-28 09:00:00','2022-08-09 02:53:00',NULL,NULL,'2022-08-09 02:53:00','2022-08-09 02:53:00',NULL),(63,86,4,0,3,24,'2022-07-28 09:00:00','2022-08-09 02:53:00',NULL,NULL,'2022-08-09 02:53:00','2022-08-09 02:53:00',NULL),(64,82,6,1,3,24,'2022-07-28 09:00:00','2022-08-09 02:53:00',NULL,NULL,'2022-08-09 02:53:00','2022-08-09 02:53:00',NULL),(65,84,0,0,245,112,'2022-08-10 00:51:57','2022-08-10 01:31:06',NULL,NULL,'2022-08-10 01:31:06','2022-08-10 01:31:06',NULL),(66,86,6,1,245,112,'2022-08-10 00:51:57','2022-08-10 01:31:06',NULL,NULL,'2022-08-10 01:31:06','2022-08-10 01:31:06',NULL),(67,82,5,0,245,112,'2022-08-10 00:51:57','2022-08-10 01:31:06',NULL,NULL,'2022-08-10 01:31:06','2022-08-10 01:31:06',NULL),(68,84,2,0,245,112,'2022-08-10 00:51:57','2022-08-10 03:07:33',NULL,NULL,'2022-08-10 03:07:33','2022-08-10 03:07:33',NULL),(69,86,7,1,245,112,'2022-08-10 00:51:57','2022-08-10 03:07:33',NULL,NULL,'2022-08-10 03:07:33','2022-08-10 03:07:33',NULL),(70,82,5,0,245,112,'2022-08-10 00:51:57','2022-08-10 03:07:33',NULL,NULL,'2022-08-10 03:07:33','2022-08-10 03:07:33',NULL),(71,84,2,0,245,112,'2022-08-10 00:51:57','2022-08-10 05:30:39',NULL,NULL,'2022-08-10 05:30:39','2022-08-10 05:30:39',NULL),(72,86,7,0,245,112,'2022-08-10 00:51:57','2022-08-10 05:30:39',NULL,NULL,'2022-08-10 05:30:39','2022-08-10 05:30:39',NULL),(73,82,5,1,245,112,'2022-08-10 00:51:57','2022-08-10 05:30:39',NULL,NULL,'2022-08-10 05:30:39','2022-08-10 05:30:39',NULL),(74,82,6,1,245,112,'2022-08-10 00:51:57','2022-08-10 05:53:22',NULL,NULL,'2022-08-10 05:53:21','2022-08-10 05:53:21',NULL),(75,84,9,0,245,112,'2022-08-10 00:51:57','2022-08-10 05:53:22',NULL,NULL,'2022-08-10 05:53:22','2022-08-10 05:53:22',NULL),(76,86,7,0,245,112,'2022-08-10 00:51:57','2022-08-10 05:53:22',NULL,NULL,'2022-08-10 05:53:22','2022-08-10 05:53:22',NULL),(77,84,2,0,245,109,'2022-08-10 00:51:57','2022-08-10 05:55:44',NULL,NULL,'2022-08-10 05:55:44','2022-08-10 05:55:44',NULL),(78,82,4,1,245,109,'2022-08-10 00:51:57','2022-08-10 05:55:44',NULL,NULL,'2022-08-10 05:55:44','2022-08-10 05:55:44',NULL),(79,86,4,0,245,109,'2022-08-10 00:51:57','2022-08-10 05:55:44',NULL,NULL,'2022-08-10 05:55:44','2022-08-10 05:55:44',NULL),(80,84,8,0,245,112,'2022-08-10 00:51:57','2022-08-10 05:58:08',NULL,NULL,'2022-08-10 05:58:08','2022-08-10 05:58:08',NULL),(81,82,6,1,245,112,'2022-08-10 00:51:57','2022-08-10 05:58:08',NULL,NULL,'2022-08-10 05:58:08','2022-08-10 05:58:08',NULL),(82,86,6,0,245,112,'2022-08-10 00:51:57','2022-08-10 05:58:08',NULL,NULL,'2022-08-10 05:58:08','2022-08-10 05:58:08',NULL),(83,84,1,0,245,111,'2022-08-10 00:51:57','2022-08-10 05:59:26',NULL,NULL,'2022-08-10 05:59:25','2022-08-10 05:59:25',NULL),(84,82,1,1,245,111,'2022-08-10 00:51:57','2022-08-10 05:59:26',NULL,NULL,'2022-08-10 05:59:25','2022-08-10 05:59:25',NULL),(85,86,2,0,245,111,'2022-08-10 00:51:57','2022-08-10 05:59:26',NULL,NULL,'2022-08-10 05:59:26','2022-08-10 05:59:26',NULL),(86,84,5,0,245,109,'2022-08-10 00:51:57','2022-08-10 07:41:07',NULL,NULL,'2022-08-10 07:41:07','2022-08-10 07:41:07',NULL),(87,82,2,1,245,109,'2022-08-10 00:51:57','2022-08-10 07:41:07',NULL,NULL,'2022-08-10 07:41:07','2022-08-10 07:41:07',NULL),(88,86,2,0,245,109,'2022-08-10 00:51:57','2022-08-10 07:41:07',NULL,NULL,'2022-08-10 07:41:07','2022-08-10 07:41:07',NULL),(89,84,3,0,245,109,'2022-08-10 00:51:57','2022-08-12 06:59:11',NULL,NULL,'2022-08-12 06:59:12','2022-08-12 06:59:12',NULL),(90,82,5,1,245,109,'2022-08-10 00:51:57','2022-08-12 06:59:11',NULL,NULL,'2022-08-12 06:59:12','2022-08-12 06:59:12',NULL),(91,86,5,0,245,109,'2022-08-10 00:51:57','2022-08-12 06:59:11',NULL,NULL,'2022-08-12 06:59:12','2022-08-12 06:59:12',NULL),(92,91,0,0,245,109,'2022-08-10 00:51:57','2022-08-12 06:59:11',NULL,NULL,'2022-08-12 06:59:12','2022-08-12 06:59:12',NULL),(93,86,9,1,261,111,'2022-08-12 06:07:12','2022-08-12 08:15:01',NULL,NULL,'2022-08-12 08:15:02','2022-08-12 08:15:02',NULL),(94,84,6,0,261,111,'2022-08-12 06:07:12','2022-08-12 08:15:01',NULL,NULL,'2022-08-12 08:15:02','2022-08-12 08:15:02',NULL),(95,82,4,0,261,111,'2022-08-12 06:07:12','2022-08-12 08:15:01',NULL,NULL,'2022-08-12 08:15:02','2022-08-12 08:15:02',NULL),(96,84,6,1,261,109,'2022-08-12 06:07:12','2022-08-12 08:29:55',NULL,NULL,'2022-08-12 08:29:56','2022-08-12 08:29:56',NULL),(97,82,5,0,261,109,'2022-08-12 06:07:12','2022-08-12 08:29:55',NULL,NULL,'2022-08-12 08:29:56','2022-08-12 08:29:56',NULL),(98,86,3,0,261,109,'2022-08-12 06:07:12','2022-08-12 08:29:55',NULL,NULL,'2022-08-12 08:29:56','2022-08-12 08:29:56',NULL);
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
) ENGINE=InnoDB AUTO_INCREMENT=721 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `players`
--

LOCK TABLES `players` WRITE;
/*!40000 ALTER TABLE `players` DISABLE KEYS */;
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
-- Table structure for table `selected_topic`
--

DROP TABLE IF EXISTS `selected_topic`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `selected_topic` (
  `uid` int NOT NULL AUTO_INCREMENT,
  `game_category_topics_uid` int DEFAULT NULL,
  `game_conference_room_uid` int DEFAULT NULL,
  PRIMARY KEY (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `selected_topic`
--

LOCK TABLES `selected_topic` WRITE;
/*!40000 ALTER TABLE `selected_topic` DISABLE KEYS */;
/*!40000 ALTER TABLE `selected_topic` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=201 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `selected_topics`
--

LOCK TABLES `selected_topics` WRITE;
/*!40000 ALTER TABLE `selected_topics` DISABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=94 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'start1','동우','1234','01052429110',0,'james','url주소입니다','난 나야','동우',NULL,'2022-07-30 07:54:04','2022-08-07 09:33:05',0,0,'GENERAL'),(31,'ehddn52521','woodddd','12345','01011111111',0,'woodong1','img1','납니다.....',NULL,NULL,'2022-07-27 07:58:20','2022-08-08 00:31:52',0,0,'GENERAL'),(34,'ehddn5252','김동우','123123123','01052525252',20,'woodong','img1','난 나야7',NULL,NULL,'2022-07-27 07:58:31','2022-08-05 08:35:29',0,3,'GENERAL'),(35,'ssafy','김싸피33','1234','01012345678',120,'싸피','이미지소스','자기소개',NULL,NULL,'2022-07-28 04:59:17','2022-08-08 05:33:56',0,3,'GENERAL'),(36,'ssafy2','이싸피','1234','01012345678',250,'싸피2','이미지소스','자기소개',NULL,NULL,'2022-07-28 04:59:42','2022-08-03 08:00:42',3,0,'GENERAL'),(37,'ssafy3','박싸피','1234','01012345678',130,'싸피3','이미지소스','자기소개',NULL,NULL,'2022-07-28 04:59:51','2022-08-03 08:00:42',0,3,'GENERAL'),(38,'ssafy4','최싸피','1234','01012345678',120,'싸피4','이미지소스','자기소개',NULL,NULL,'2022-07-28 05:00:00','2022-08-03 08:00:42',0,3,'GENERAL'),(39,'ssafy5','정싸피','1234','01012345678',120,'싸피5','이미지소스','자기소개',NULL,NULL,'2022-07-28 05:00:13','2022-08-03 08:00:42',0,3,'GENERAL'),(40,'ssafy6','손싸피','1234','01012345678',120,'싸피6','이미지소스','자기소개',NULL,NULL,'2022-07-28 05:00:28','2022-08-03 08:00:42',0,3,'GENERAL'),(41,'ssafy7','공싸피','1234','01012345678',120,'싸피7','이미지소스','자기소개',NULL,NULL,'2022-07-28 05:00:40','2022-08-03 08:00:42',0,3,'GENERAL'),(43,'ehddn525253','woo','$2a$10$VZtxeTdm52uYpSayFo5V1uwt9Dh9e81xiZjaCUC5o6SBPJv/3rE9K','01054420119',0,'chol',NULL,NULL,NULL,NULL,'2022-07-28 15:08:00','2022-08-02 05:37:05',0,0,'GENERAL'),(44,'cksdn5252','정찬우','$2a$10$8bQsEGYIQbTBbUcdEYA4hecWGsNt7IKBwU7OdAto1CufVbkIiBB2q','01012345678',0,'jeong',NULL,NULL,NULL,NULL,'2022-07-29 06:18:35','2022-08-02 05:37:05',0,0,'GENERAL'),(61,'malsu123','김말수','malsoooo','01042491031',0,'hourwasGone','url주소입니다','말숩니다','동우',NULL,'2022-07-30 08:08:15','2022-08-02 05:37:05',0,0,'GENERAL'),(62,'bongWater','이봉수','12345','01088219101',0,'jamesbon','url주소입니다','봉수예요','동우',NULL,'2022-07-30 08:08:15','2022-08-02 05:37:05',0,0,'GENERAL'),(63,'kal2','이카를로스2세','0090','01073720111',0,'kal22','url주소입니다','I`m god','동우',NULL,'2022-07-30 08:08:15','2022-08-02 05:37:05',0,0,'GENERAL'),(64,'having1','장사유','sqqr','01099108333',0,'veryStrong','url주소입니다','난 강해','동우',NULL,'2022-07-30 08:08:15','2022-08-02 05:37:05',0,0,'GENERAL'),(65,'writer19','김작가','12345','01088219101',0,'pen_is_strong_then','url주소입니다','글쓰는 사람입니다. 잘부탁해요','동우',NULL,'2022-07-30 08:08:15','2022-08-02 05:37:05',0,0,'GENERAL'),(66,'player1','주플레이어','5224','01014244515',1000,'nick','url주소입니다.','hi im fine','동우',NULL,'2022-08-02 05:55:10','2022-08-02 05:55:10',0,0,'general'),(67,'ssafy10','김싸피','1234','01012345678',100,'싸피10','이미지소스','자기소개',NULL,NULL,'2022-08-01 05:25:41','2022-08-02 05:37:05',0,0,'GENERAL'),(68,'kimSS','ssafyPlayer','52242','01011144551',10000,'ssafygood','url주소입니다.','hi i love ssafy','동우',NULL,'2022-08-02 05:56:46','2022-08-02 05:56:46',0,0,'general'),(70,'dbwjd123','woo','$2a$10$Kz70vzDMg9t6y5Qu9I2LqOxZ2il67dwGa43xELTMs0S5YYDbZGk4q','01054420119',0,'yu',NULL,NULL,NULL,NULL,'2022-08-03 06:01:14','2022-08-03 06:01:14',0,0,'general'),(72,'ehddn525253111','woo','$2a$10$i5wa5mCIqcThlG5ISQSGQ.HqME846XvLEkb3NOji3Wf47hJq3AJ9e','01054420119',0,'chol22',NULL,NULL,NULL,NULL,'2022-08-04 15:21:30','2022-08-04 15:21:30',0,0,'GENERAL'),(73,'sssafy1234','싸싸피','$2a$10$KXG9Vt9y6kzT1wMjZQt3iuoXpWF3qspN7qLWXhTa83mRRBd8t4EmC','01012341234',0,'싸싸싸싸',NULL,NULL,NULL,NULL,'2022-08-04 15:34:03','2022-08-04 15:34:03',0,0,'GENERAL'),(74,'sssafy','정찬우','$2a$10$d6uAp5f8n1mOA6/GeDwK4Or0yxNyFCWNU0VfAoWdSICRi69/dlBLu','01011111111',0,'asdf',NULL,NULL,NULL,NULL,'2022-08-04 15:40:50','2022-08-04 15:40:50',0,0,'GENERAL'),(75,'ssafy_web','김철수','$2a$10$dEAG7J8eBuF6rP5C9TA1KeFFW4zSq.XBpcVuULGWBNGPEjZ4bdWyS','01057429111',0,'spa1',NULL,NULL,NULL,NULL,'2022-08-05 01:58:58','2022-08-05 01:58:58',0,0,'GENERAL'),(79,'test111','강병수수수','$2a$10$DsFQQOR2X31l8cF.eHKxrOU9uzUrl8hwqB3iUZzjNvU8aPR/mcj2a','12341234123',0,'강병수수수',NULL,NULL,NULL,NULL,'2022-08-07 14:04:54','2022-08-07 14:04:54',0,0,'GENERAL'),(80,'dbwjd','유정','$2a$10$3ExCgs/Pp9lzADtnRmJyBua2dWFDxrwhcWX4YcyBUWDfgvanW8c3W','01011111111',0,'yuyu',NULL,'ㅎㅇ',NULL,NULL,'2022-08-07 15:01:17','2022-08-07 15:02:21',0,0,'GENERAL'),(81,'coach82','mm','$2a$10$2HT30W1KOSjO6rGaI1wMpekBRlSVeh8izoe5z518tiv39Rjnp/dVS','01011597753',0,'mm',NULL,NULL,NULL,NULL,'2022-08-08 00:13:32','2022-08-08 00:13:32',0,0,'GENERAL'),(82,'rkdqudtn1','병수1','$2a$10$1/fx5IRrtt7TIYvticggnOpgHWnBClRMGIYQyoC5PyVe.hm02m6wC','12341234123',1170,'병수1',NULL,NULL,NULL,NULL,'2022-08-08 01:49:47','2022-08-12 08:29:56',15,9,'GENERAL'),(83,'rkdqudtn2','병수2','$2a$10$dQRWzRmIC/C2Rt4KUjgzL.tBwg81OWn0bSm1sjLmVrslB0R6kb.bC','12412312412',0,'병수2',NULL,NULL,NULL,NULL,'2022-08-08 02:07:57','2022-08-08 02:07:57',0,0,'GENERAL'),(84,'rkdqudtn3','병수3','$2a$10$ERHNfW3unzGVV3fAZydEmOyZa5hLRJ7jlxqz91SZLdzjq/zbG0/1m','12341234123',470,'병수3',NULL,NULL,NULL,NULL,'2022-08-08 02:08:33','2022-08-12 08:29:56',2,12,'GENERAL'),(85,'ssafycon01','김민정','$2a$10$qWHggk70Ro4Cxv6OLLN6SONXMxIKHmsfM1qUMgu30GO9XD6VqYDK2','01011111111',0,'컨설턴트',NULL,NULL,NULL,NULL,'2022-08-08 02:09:37','2022-08-08 02:09:37',0,0,'GENERAL'),(86,'rkdqudtn4','병수4','$2a$10$4HYKoixWx3YbJgdwCrRDRubj2sAtPGRO/7R7XKQ57u3QdOGD0HPqW','12341234123',710,'병수4',NULL,NULL,NULL,NULL,'2022-08-08 02:18:51','2022-08-12 08:29:56',6,18,'GENERAL'),(87,'rkdqudtn5','병수5','$2a$10$CyV0kU0lGCcIYwW5zGlv0O7cKrNrDjmAD1y3N6XdSm4APVr76IB32','12344321123',40,'병수5',NULL,NULL,NULL,NULL,'2022-08-08 06:29:28','2022-08-08 07:40:49',1,9,'GENERAL'),(88,'rkdqudtn6','병수6','$2a$10$77lKnbke/EbF8VN0xDC/cufo/a9afeWkMwMMv1IUSCuuICwIBqewS','14213241423',0,'병수6',NULL,NULL,NULL,NULL,'2022-08-08 06:30:00','2022-08-08 06:30:00',0,0,'GENERAL'),(89,'rkdqudtn7','병수7','$2a$10$S3emnwVC6uWTF/kd0DyKVOg9ht6/CBt0pujVAo.ECPwRtpeVOLnJe','12412312412',0,'병수7',NULL,NULL,NULL,NULL,'2022-08-08 06:30:35','2022-08-08 06:30:35',0,0,'GENERAL'),(90,'rkskekfk','rksk','$2a$10$eebCE4AKL2afKIb0OlDape2893UkiVbtvsUBQjSQvuAcSFdr.LbyO','01011111111',0,'rksk',NULL,NULL,NULL,NULL,'2022-08-10 05:42:14','2022-08-10 05:42:14',0,0,'GENERAL'),(91,'test1','test','$2a$10$UQWQ2nUhITGYoC.BRivmteVcDZsRAviuxa8P8yActRuQroUls.n7K','12345678901',-20,'test',NULL,NULL,NULL,NULL,'2022-08-11 02:46:01','2022-08-12 06:59:12',0,1,'GENERAL'),(92,'ssafy123','김싸피','$2a$10$wKNbz.6mXqzsn3C9JULilON4C2pvSRLyNfAE6e5Z6o50PHlwlV99W','01047915385',0,'김싸피',NULL,NULL,NULL,NULL,'2022-08-12 06:26:55','2022-08-12 06:26:55',0,0,'GENERAL'),(93,'ssafy1234','싸피맨','$2a$10$Jm.3FhYJB/clmP9pgZnZR.8akGAa0YWvyVO6cBTV88lcgj/dSsQfa','01012341234',0,'싸피맨',NULL,NULL,NULL,NULL,'2022-08-12 07:54:50','2022-08-12 07:54:50',0,0,'GENERAL');
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

-- Dump completed on 2022-08-12 23:39:08
