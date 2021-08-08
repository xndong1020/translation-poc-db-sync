CREATE DATABASE db_sync;

USE db_sync;

CREATE TABLE `translation` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `keyName` text NOT NULL,
  `projectName` text NOT NULL,
  `en` text DEFAULT NULL,
  `fr` text DEFAULT NULL,
  `zh` text DEFAULT NULL,
  `pt` text DEFAULT NULL,
  `es` text DEFAULT NULL,
  `ar` text DEFAULT NULL,
  `ko` text DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `age` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;