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
("Tony", "Stark", 1, 1), 
("Bruce", "Banner", 2, null), 
("Steve", "Rogers", 3, 2), 
("Natasha", "Romanoff", 4, null), 
("Hawk", "Eye", 5, 3),
("Thor", "Ragnarok", 6, null),
("Doctor", "Strange", 7, null), 
("Loki", "Ragnarok", 8, null), 
("Star", "Lord", 9, 4),
("Iam", "Groot", 10, null),
("Black", "Panther", 11, null);

select * from employee;
-- Am I understanding this table correctly? where manager_id is stating manager of which deparment?