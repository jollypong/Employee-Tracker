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
                'Add a Deparment',
                'Add a Role',
                'Add an Employee',
                'Update an Employee Role',
                'Update a Manager',
                'Delete Department',
                'Delete Roles',
                'Delete Employee',
                'View Budget by Deparment',
                'Quit'
            ]
    }).then(function (answer) {
        switch (answer.action) {
            case 'View all Departments':
                viewDeparment();
                break;
            case 'View all Employee Roles':
                viewRole();
                break;
            case 'View all Employees':
                viewEmployee();
                break;
            case 'View employees by Department':
                viewEmployeeDeparment();
                break;
            case 'View employees by Manager':
                viewEmployeeManager();
                break;
            case 'View all Employees':
                viewEmployee();
                break;
            case 'Add a Deparment':
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
                deleteDeparment();
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
}

function endTrackEmployee() {
    connection.end(function (err) {
        if (err) {
            return console.log('error:' + err.message);
        }
        console.log('Bye! See you again!');
    });
};