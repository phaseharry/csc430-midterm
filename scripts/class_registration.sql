CREATE DATABASE classregistration;

USE classregistration;

CREATE USER 'admin'@'localhost' IDENTIFIED WITH caching_sha2_password BY '12345';
GRANT ALL PRIVILEGES ON classregistration.* TO 'admin'@'localhost';

SELECT * FROM `Subjects`;
SELECT * FROM Courses;
SELECT * FROM Sections;