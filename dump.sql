-- MySQL dump 10.13  Distrib 8.0.23, for Win64 (x86_64)
--
-- Host: localhost    Database: database_development
-- ------------------------------------------------------
-- Server version	8.0.23

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Current Database: `database_development`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `database_development` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

USE `database_development`;

--
-- Table structure for table `likes`
--

DROP TABLE IF EXISTS `likes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `likes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `topicId` int NOT NULL,
  `userId` int NOT NULL,
  `isLike` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `likes_ibfk_1` (`topicId`),
  KEY `likes_ibfk_2` (`userId`),
  CONSTRAINT `likes_ibfk_1` FOREIGN KEY (`topicId`) REFERENCES `topics` (`id`) ON DELETE CASCADE,
  CONSTRAINT `likes_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `likes`
--

LOCK TABLES `likes` WRITE;
/*!40000 ALTER TABLE `likes` DISABLE KEYS */;
INSERT INTO `likes` VALUES (41,32,9,1,'2021-04-27 14:15:44','2021-04-28 12:10:38'),(42,31,9,0,'2021-04-27 14:15:45','2021-04-28 14:30:39'),(43,31,7,1,'2021-04-27 15:37:19','2021-04-28 14:07:01'),(44,32,7,1,'2021-04-27 15:37:24','2021-04-28 14:07:04'),(45,33,7,1,'2021-04-28 14:06:07','2021-04-28 14:06:54'),(46,33,9,1,'2021-04-28 14:13:07','2021-04-28 16:51:46');
/*!40000 ALTER TABLE `likes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sequelizemeta`
--

DROP TABLE IF EXISTS `sequelizemeta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sequelizemeta` (
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sequelizemeta`
--

LOCK TABLES `sequelizemeta` WRITE;
/*!40000 ALTER TABLE `sequelizemeta` DISABLE KEYS */;
INSERT INTO `sequelizemeta` VALUES ('20210413135008-create-user.js'),('20210413135557-create-topic.js'),('20210422132358-create-like.js');
/*!40000 ALTER TABLE `sequelizemeta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `topics`
--

DROP TABLE IF EXISTS `topics`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `topics` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `title` varchar(255) NOT NULL,
  `content` text,
  `attachment` varchar(255) DEFAULT NULL,
  `likes` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_user_topic` (`userId`),
  CONSTRAINT `fk_user_topic` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `topics_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `topics`
--

LOCK TABLES `topics` WRITE;
/*!40000 ALTER TABLE `topics` DISABLE KEYS */;
INSERT INTO `topics` VALUES (31,7,'Sequelize : un ORM pour JavaScript','Sequelize est un ORM qui permet de mapper les classes métier avec les tables d\'un SGBDR en JavaScript.\n\nOn peut maintenant, grâce à cet ORM écrire des EJB (Entity Javascript Bean).\nDécidément, JavaScript n\'a plus rien à envier à JAVA ou PHP.\nBien entendu, cette offre est réservée à du JS côté serveur comme Node.js ou io.js\n\nCe framework a l’avantage d\'être très simple à utiliser et ainsi de posséder une courbe d\'apprentissage extrêmement rapide.\nCet ORM offre nativement une connectivité aux principales bases de données open source telles que PostgreSQL, MySQL, MariaDB, SQLite et MSSQL.\n',NULL,1,'2021-04-27 13:18:21','2021-04-28 14:30:39'),(32,7,'Avantages d’un intranet dans une entreprise','La mise en œuvre d’une solution intranet unifiera votre effectif et invitera vos employés dans un espace où ils pourront s’exprimer et être entendus ; leurs opinions peuvent ainsi être prises en compte.',NULL,2,'2021-04-27 13:22:28','2021-04-28 14:07:04'),(33,9,'Marché de la grande distribution : où en est-on en 2020 ?','Le marché de la grande distribution poursuit sa mue. Au gigantisme des années 80-90, les formats développés par les enseignes préfèrent désormais la proximité. L’éclosion du drive et le boom du bio font aussi bouger les lignes.\n\nLa grande distribution a beaucoup évolué ces dernières années. Les enseignes historiques comme Casino, E.Leclerc, Carrefour, Système U, ou encore Auchan, qui ont longtemps ferraillé à qui serait le plus grand, se positionnent désormais sur d’autres valeurs.\n\nSigne des temps, le gigantisme des grands hypers de périphérie séduit moins. Les clients souhaitent revenir à des valeurs de proximité et de praticité. L’éclosion du drive en est la preuve. Désormais, un supermarché qui n’offre pas la possibilité de commander sur Internet est dépassé.',NULL,2,'2021-04-28 13:57:35','2021-04-28 16:51:46');
/*!40000 ALTER TABLE `topics` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `department` varchar(255) DEFAULT NULL,
  `isAdmin` tinyint(1) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (7,'georges.duc@gmail.com','Georges.Duc','$2b$10$II0b5CVNbz37BZX9lc9nIuynXWICXa/JgOca4aSg7VW9SBO.Q170S','Assistant aux ressources humaines',0,'2021-04-27 12:43:39','2021-04-27 12:43:39'),(8,'thomas.test@test.com','thomas','$2b$10$lqlfoZCFjTQ2rVpRmcbHcuiPGJGb2HOe2i7gHPtiet7ceYqZlRjdK','',0,'2021-04-27 14:06:28','2021-04-27 14:06:28'),(9,'thomas@test.com','Thomas E','$2b$10$rypvDpKhaNcYwUvxxXbli.w/tMMf9lJU6XD99.eQKEfGUlqp7GL.u','Directeur adjoint',0,'2021-04-27 14:07:02','2021-04-28 12:13:18');
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

-- Dump completed on 2021-04-28 20:58:16
