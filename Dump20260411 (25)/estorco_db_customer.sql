-- MySQL dump 10.13  Distrib 8.0.42, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: estorco_db
-- ------------------------------------------------------
-- Server version	8.0.42

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
-- Table structure for table `customer`
--

DROP TABLE IF EXISTS `customer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customer` (
  `customer_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `phone` varchar(50) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`customer_id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customer`
--

LOCK TABLES `customer` WRITE;
/*!40000 ALTER TABLE `customer` DISABLE KEYS */;
INSERT INTO `customer` VALUES (1,'ashley','ashely10@gmail.com','09532147869','2026-03-27 08:19:27'),(2,'Tata SHo','tatayow@gmail.com','09234567890','2026-03-27 08:38:46'),(3,'Hanna B','HannahB@gmail.com','09345678901','2026-03-30 01:48:09'),(4,'JohnLloyd','wawalayow@gmail.com','09632555745','2026-03-30 02:10:09'),(5,'Vilmar timtim','vilmar@gmail.com','09442568126','2026-03-30 02:27:42'),(6,'hurano candy','candyhurano@gmail.com','096314458532','2026-03-30 02:39:07'),(7,'jane sollo','jane@gamil.com','0948845297','2026-04-01 03:05:55'),(8,'nikol','cole@gamil.com','09488452972','2026-04-01 03:14:59'),(10,'robelyn','eyana@gmail.com','09553200148','2026-04-07 06:58:41'),(11,'dumaog','france@gmail.com','09623584125','2026-04-07 06:59:05'),(12,'jerome','rosalita@gmail.com','09568861325','2026-04-07 07:00:19'),(13,'fee','miemie@gmail.com','09556874121','2026-04-07 07:00:47'),(14,'lance','lance@gmail.com','09685575231','2026-04-07 07:01:23'),(15,'mie','wla@gmail.com','092285311452','2026-04-07 07:01:48'),(16,'rey lll','thesecond@gmail.com','09023658045','2026-04-07 07:02:21'),(17,'sofia','thefirst@gmail.com','09586213012','2026-04-07 07:02:46'),(18,'maya','moyo@gmail.com','09653205884','2026-04-07 07:03:05'),(19,'john ','lawrence@gmail.com','095623058452','2026-04-07 07:03:26'),(20,'bella','botbot@gmail.com','090065230014','2026-04-07 07:03:47'),(21,'sarah','mae@gmail.com','09658639204','2026-04-07 07:04:12'),(22,'richard','yoyow@gmail.com','095665856356','2026-04-07 07:05:07'),(23,'androw','e@gmail.com','09632145870','2026-04-07 07:05:25'),(24,'maria','makiling@gmail.com','0956122455','2026-04-07 07:05:46'),(25,'samatha','porio@gmail.com','09653221485','2026-04-07 07:06:17'),(26,'luijeille','duazo@gmail.com','09658742132','2026-04-07 07:06:43'),(27,'kirby','ludaza@gmail.com','096584221415','2026-04-07 07:07:11'),(28,'utylang','nyame@gmail.com','09688565232','2026-04-07 07:07:45'),(29,'mayamaya','you@gmail.com','095465142554','2026-04-07 07:08:12'),(30,'loy','ga@gmail.com','0987655436211','2026-04-07 07:08:29');
/*!40000 ALTER TABLE `customer` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-04-11 10:39:12
