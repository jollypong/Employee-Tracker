drop database if exists employee_db; 
create database employee_db; 

use employee_db; 
select database(); 

create table department (
    id int not null auto_increment primary key, 
    name varchar(30) not null
);

create table roles (
    id int not null auto_increment primary key,
    title varchar(30) not null,
    salary decimal,
    department_id int,
    foreign key (department_id)
    references department(id)
    on delete cascade
);

create table employee (
    id int not null auto_increment primary key, 
    first_name varchar(30),
    last_name varchar(30),
    role_id int, 
    foreign key (role_id) references roles(id),
    manager_id int,
    foreign key (manager_id) references employee(id)
    on update cascade 
    on delete set null
);

show tables; 
describe department; 
describe roles;
describe employee; 