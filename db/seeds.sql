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
("HR Administrator", 80000, 1),
("HR Manager", 130000, 1), 
("Test Designer/Manager", 150000, 2), 
("Test Analyst", 130000, 2),
("Lead Dev/Manager", 130000, 3), 
("Senior Dev", 90000, 3),
("Junior Dev", 70000, 3),
("Intern", 40000, 3),
("Marketting Assistant", 80000, 4), 
("Marketing Manager", 130000, 4), 
("Accountant", 100000, 5);

select * from roles;

insert into employee (first_name, last_name, role_id, manager_id)
values 
("Tony", "Stark", 1, null), 
("Bruce", "Banner", 2, 1), 
("Steve", "Rogers", 3, null), 
("Natasha", "Romanoff", 4, 3), 
("Hawk", "Eye", 5, null),
("Thor", "Ragnarok", 6, 5),
("Doctor", "Strange", 7, 5), 
("Loki", "Ragnarok", 8, 5), 
("Star", "Lord", 9, null),
("Iam", "Groot", 10, 9),
("Black", "Panther", 11, null);

select * from employee;