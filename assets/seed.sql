USE personnelDB;

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ('Jonathan', 'Nance', 3, 2), ('Cristian', 'Riveria', 4, 0), ('Yasmine', 'Swaine', 1, 2),
('Bakul', 'Rana', 2, 2), ("Martha", "May", 7, 0), ("Sarah", "Greene", 5, 5), ("Heather", "Rehdler", 6,5),
("Tanya", "Allison", 10, 0), ("Andrea", "Miller", 8, 8), ("Daniel", "Ky", 9, 8),
('Betsy', 'Katzien', 13, 0), ('John', 'Conners', 11, 11), ('Heather', 'Campbell', 12, 11);

INSERT INTO departments (name)
VALUES ("Human Resources"), ("Quality Control"), ("Quality Engineering"), ("Research and Developement");

INSERT INTO roles (title, salary, department_id)
VALUES ("QC Analyst I", 40000, 2), ("QC Analyst II", 50000, 2), ("QC Analyst III", 60000, 2),
("QC Manager", 70000, 2), ("HR Analyst I", 60000, 1), ("HR Analyst II", 70000, 1), ("HR Manager", 80000, 1),
("Qulaity Floor Support", 50000, 3), ("Quality Engineer", 80000, 3), ("Qualtiy Manager", 100000, 3),
("Scientist I", 60000, 4), ("Scientist II", 70000, 4), ("HR Manager", 80000, 4);