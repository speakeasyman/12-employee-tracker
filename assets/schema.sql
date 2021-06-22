DROP DATABASE IF EXISTS personnelDB;
CREATE DATABASE personnelDB;

USE personnelDB;

CREATE TABLE departments(
	id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL,
    PRIMARY KEY(id)
);


USE personnelDB;

CREATE TABLE roles(
	id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30) NULL,
    salary INT(10) NULL,
    department_id INT NULL,
    PRIMARY KEY(id)
);

USE personnelDB;

CREATE TABLE employees(
	id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT,
    PRIMARY KEY(id)
);