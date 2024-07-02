CREATE DATABASE Works;

USE Works;


DROP TABLE Works;

CREATE TABLE Items (
    ID int,
    Item varchar(255)
);

INSERT INTO Items (ID, Item) VALUES (1, "Take a nap.");

ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'admin';

SELECT * FROM Items;