INSERT INTO department (id, name)   
VALUES (1, "Sales"),
       (2, "Engineering"),
       (3, "Finance"), 
       (4, "Legal"),

INSERT INTO role (id, title, salary, department_id)   
VALUES (1, "Sales Lead", 100000, 1),
       (2, "Salesperson", 80000, 1), 
       (3, "Lead Engineer", 150000, 2), 
       (4, "Software Engineer", 120000, 2), 
       (5, "Account Manager", 160000, 3), 
       (6, "Accountant", 125000, 3),  
       (7, "Legal Team Lead", 250000,4),
       (8, "Lawyer", 190000, 4),  

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (1, "John","Doe", 1, 110),
       (2, "John","Right", 7, 410), 
       (3, "Joe","Sill", 8, 410),
       (4, "Bill","Gunn", 2, 110),
       (5, "Paul","Rome", 4, 210),
       (6, "Rick","New", 6, 310),
       (7, "Don","Juan", 5, 310),
       (8, "George","Green", 3, 210),