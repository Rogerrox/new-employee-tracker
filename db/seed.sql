INSERT INTO department (name)   
VALUES ( "Sales"),
       ( "Engineering"),
       ( "Finance"), 
       ( "Legal");

INSERT INTO role (title, salary, department_id)   
VALUES ( "Sales Lead", 100000, 1),
       ( "Salesperson", 80000, 1), 
       ( "Lead Engineer", 150000, 2), 
       ( "Software Engineer", 120000, 2), 
       ( "Account Manager", 160000, 3), 
       ( "Accountant", 125000, 3),  
       ( "Legal Team Lead", 250000,4),
       ( "Lawyer", 190000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ( "John","Doe", 1, NULL),
       ( "John","Right", 7, NULL), 
       ( "Joe","Sill", 8, 2),
       ( "Bill","Gunn", 2, 1),
       ( "Paul","Rome", 3, NULL),
       ( "Rick","New", 5, NULL),
       ( "Don","Juan", 6, 6),
       ( "George","Green", 4, 5);