//import dependencies
const mysql = require('mysql');
const inquirer = require('inquirer');
const consoleTable = require('console.table'); //required to show table in console

//create connection to sql
const connection = mysql.createConnection({
    host: 'localhost',
    port: '3306', //default port for mysql protocol
    user: 'root',
    password: 'password',
    database: 'employee_db'
},
    console.log(`Conencted to the employee_db database.`)
);

connection.connect(function (err) {
    if (err) {
        return console.error('error: ' + err.message);
    }
    console.log('Welcome to "Who Works Where?!"');
    console.log("Let's begin looking for our employees!")
    trackEmployee();
});

function trackEmployee() {
    // console.log('We made it here!')
    inquirer.prompt({
        type: 'list',
        message: 'Please choose your options',
        name: 'mainMenu',
        choices:
            [
                'View all Departments',
                'View all Employee Roles',
                'View all Employees',
                'View employees by Department',
                'View employees by Manager',
                'Add a Department',
                'Add a Role',
                'Add an Employee',
                'Update an Employee Role',
                'Update a Manager',
                'Delete Department',
                'Delete Roles',
                'Delete Employee',
                'View Budget by Department',
                'Quit'
            ]
    }).then(function (answer) {
        switch (answer.action) {
            case 'View all Departments':
                viewDepartment();
                break;
            case 'View all Employee Roles':
                viewRole();
                break;
            case 'View all Employees':
                viewEmployee();
                break;
            case 'View employees by Department':
                viewEmployeeDepartment();
                break;
            case 'View employees by Manager':
                viewEmployeeManager();
                break;
            case 'Add a Department':
                addDepartment();
                break;
            case 'Add a Role':
                addRole();
                break;
            case 'Add an Employee':
                addEmployee();
                break;
            case 'Update an Employee Role':
                updateEmployee();
                break;
            case 'Update a Manager':
                updateManager();
                break;
            case 'Delete Department':
                deleteDepartment();
                break;
            case 'Delete Manager':
                deleteManager();
                break;
            case 'Delete Employee':
                deleteEmployee();
                break;
            case 'Quit':
                endTrackEmployee(); 
                break; 
        }
    })
};

// 'View all Departments',
function viewDepartment() {
    var query = 'SELECT * FROM department';
    connection.query(query, function(err, res) {
        if(err)throw err;
        console.log('There are ' + res.length + ' in your company')
        console.table('All Departments:', res);
        options();
    })
};

// 'View all Employee Roles',
function viewRole(){
    var query = 'SELECT * FROM roles'; 
    connection.query(query, function(err, res){
        if (err) throw err; 
        console.log('There are '+ res.length + 'positions currently in your company')
    })
};

// 'View all Employees',
function viewEmployee() {
    var query = 'SELECT * FROM employee';
    connection.query(query, function(err, res) {
        if (err) throw err;
        console.log('There are ' + res.length + ' employees in your company');
        console.table('All Employees:', res); 
        options();
    })
};

// 'View employees by Department',
function viewEmployeeDepartment(){
    var query = ''
};
// 'View employees by Manager',

// 'Add a Department',

// 'Add a Role',

// 'Add an Employee',

// 'Update an Employee Role',

// 'Update a Manager',

// 'Delete Department',

// 'Delete Roles',

// 'Delete Employee',

// 'View Budget by Department',

// 'Quit'

function endTrackEmployee() {
    connection.end(function (err) {
        if (err) {
            return console.log('error:' + err.message);
        }
        console.log('Bye! See you again!');
    });
};