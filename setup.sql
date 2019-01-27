CREATE USER '160392'@'%' IDENTIFIED BY 'a';
GRANT ALL PRIVILEGES ON * . * TO '160392'@'%' IDENTIFIED BY 'a';
FLUSH PRIVILEGES;

CREATE DATABASE IF NOT EXISTS CS455_A1;

USE CS455_A1;

CREATE TABLE IF NOT EXISTS `Feedbacks` (`id` INTEGER NOT NULL auto_increment , `response1` INTEGER NOT NULL DEFAULT 3, `response2` INTEGER NOT NULL DEFAULT 3, 
`response3` INTEGER NOT NULL DEFAULT 3, `response4` INTEGER NOT NULL DEFAULT 3, 
`textMessage` VARCHAR(500), `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB;

SHOW DATABASES;
SHOW TABLES;
SHOW INDEX FROM Feedbacks;

