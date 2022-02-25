insert into department (name)
values
("HR"), 
("QA"), 
("DEV"), 
("MKT"), 
("FIN"); 

select * from department;

insert into roles (title, salary, department_id)
values  
("Accountant", 100000, 5), 
("Marketting Assistant", 80000, 4), 
("Marketing Analyst", 110000, 4),
("Marketing Manager", 130000, 3), 
("Recruiter", 80000, 1), 
("Employee Relations", 86000, 1), 
("HR Assistant", 70000, 1),
("HR administrator", 80000, 1),
("HR Manager", 130000, 3), 
("Dev Manager", 130000, 3), 
("Senior Dev", 90000, 3),
("Junior Dev", 70000, 3),
("Test Designer", 150000, 2), 
("Test Analyst", 130000, 2),
("Test Manager", 170000, 3), 
("Intern", 50000, 3); 

select * from roles;

insert into employee (first_name, last_name, role_id, manager_id)
values 
("Private", "Bloggins", 16, 1), 
("Duff", "No", 16, 2), 
("Tom", "Hilfiger", 4, 3), 
("Peter", "Parker", 8, 4), 
("Faker", "LeBlanc", 10, 5),
("Sarah", "Conor", 10, null),
("Tony", "Stark", 15, null), 
("Rick", "Sanchez", 10, null), 
("Bird", "Person", 9, null),
("Black", "Widow", 1, null);

select * from employee;