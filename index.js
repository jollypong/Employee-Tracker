//import dependencies
const mysql = require('mysql');
const inquirer = require('inquirer');
const { CLIENT_SECURE_CONNECTION } = require('mysql/lib/protocol/constants/client');
require('console.table'); //required to show table in console

//create connection to sql
const connection = mysql.createConnection({
    host: 'localhost',
    port: '3306', //default port for mysql protocol
    user: 'root',
    password: 'password', //TODO: ADD YOUR PASSWORD HERE
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
    mainMenu();
});

function mainMenu() {
    inquirer.prompt({
        type: 'list',
        message: 'Please choose your options',
        name: 'mainMenu',
        choices: [
            'View all Departments',
            'View all Employee Roles',
            'View all Employees',
            // 'View employees by Department',
            // 'View employees by Manager',
            'Add a Department',
            'Add a Role',
            'Add an Employee',
            'Update an Employee Role',
            // 'Update a Manager',
            // 'Delete Department',
            // 'Delete Roles',
            // 'Delete Employee',
            // 'View Budget by Department',
            'Quit'
        ]
    }).then(function (answer) {
        switch (answer.mainMenu) {
            case 'View all Departments':
                viewDepartment();
                break;
            case 'View all Employee Roles':
                viewRole();
                break;
            case 'View all Employees':
                viewEmployee();
                break;
            // case 'View employees by Department':
            //     viewEmployeeDepartment();
            //     break;
            // case 'View employees by Manager':
            //     viewEmployeeManager();
            //     break;
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
                updateRole();
                break;
            // case 'Update a Manager':
            //     updateManager();
            //     break;
            // case 'Delete Department':
            //     deleteDepartment();
            //     break;
            // case 'Delete Manager':
            //     deleteManager();
            //     break;
            // case 'Delete Employee':
            //     deleteEmployee();
            //     break;
            case 'Quit':
                endMainMenu();
                break;
        }
    })
};

// 'View all Departments',
function viewDepartment() {
    var query = 'SELECT * FROM department;'
    connection.query(query, function (err, res) {
        if (err) throw err;
        console.table('There are ' + res.length + ' departments in your company!', res);
        mainMenu();
    })
};

// 'View all Roles',
function viewRole() {
    var query = 'SELECT * FROM roles';
    connection.query(query, function (err, res) {
        if (err) throw err;
        console.table('There are ' + res.length + 'positions currently in your company', res);
        mainMenu();
    })
};

// 'View all Employees',
function viewEmployee() {
    connection.query('SELECT * FROM employee', function (err, res) {
        if (err) throw err;
        console.table('There are ' + res.length + ' employees in your company', res);
        mainMenu();
    })
};

// Bonus: 'View employees by Department',

// Bonus: 'View employees by Manager',

// 'Add a Department',
function addDepartment() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'newDepartment',
            message: "What's the name of your new Department?"
        }
    ]).then(function (answer) {
        connection.query('INSERT INTO department SET ?', { name: answer.newDepartment });
        console.log('New Department has been added!')
        viewDepartment();
    });
};

// 'Add a Role',
function addRole() {
    connection.query('SELECT name, id FROM department', function (err, res) {
        deptChoice = res.map(({ name, id }) => ({ name: name, value: id }))
        // console.log(deptChoice);
        inquirer.prompt([
            {
                type: 'list',
                name: 'department',
                message: "Which department does this role belong to?",
                choices: deptChoice
            },
            {
                type: 'input',
                name: 'newRole',
                message: "What's the name of your new Role?"
            },
            {
                type: 'input',
                name: 'newSalary',
                message: "What is the Salary for this Role? (enter a number without commas, ie. 100000)"
            }
        ]).then(function (answer) {
            connection.query(
                'INSERT INTO roles SET?',
                {
                    title: answer.newRole,
                    salary: answer.newSalary,
                    department_id: answer.department
                },
                viewRole,
                mainMenu
            );
            console.log('New Role has been added!');
        });
    });
};

// 'Add an Employee',
function addEmployee() {
    connection.query('SELECT title, id FROM roles', function (err, res) {
        roleChoice = res.map(({ title, id }) => ({ name: title, value: id }));
        // console.log(roleChoice);
        connection.query('SELECT first_name, last_name, id FROM employee WHERE manager_id IS NULL', function (err, res) {
            // "list of managers (people with no values in manager id)"
            managerList = res.map(({ first_name, last_name, id }) => ({ name: `${first_name} ${last_name}`, value: id }));
            // console.log(managerList);
            inquirer.prompt([
                {
                    type: 'input',
                    name: 'firstName',
                    message: 'What is the first name of your new Employee?',
                    // validate: ''
                },
                {
                    type: 'input',
                    name: 'lastName',
                    message: 'What is the last name of your new Employee?',
                    // validate: ''
                },
                {
                    type: 'list',
                    name: 'employeeRole',
                    message: "What is the new Employee's role?",
                    choices: roleChoice,
                },
                {
                    type: 'list',
                    name: 'manager',
                    message: "Who is the Manager for this new Employee?",
                    choices: [...managerList, { name: 'No Manager', value: null }],
                },
            ]).then(function (answer) {
                connection.query(
                    'INSERT INTO employee SET?',
                    {
                        first_name: answer.firstName,
                        last_name: answer.lastName,
                        role_id: answer.employeeRole,
                        manager_id: answer.manager
                    },
                    viewEmployee,
                    mainMenu
                );
                console.log('New Employee has been added!');
            });
        })
    });
};

// 'Update an Employee Role',
function updateRole() {
    //employeeList 
    connection.query('SELECT first_name, last_name, id FROM employee', function (err, res) {
        employeeList = res.map(({ first_name, last_name, id }) =>
            ({ name: `${first_name} ${last_name}`, value: id }));
        //roleList
        connection.query('SELECT id, title FROM roles', function (err, res) {
            roleList = res.map(({ id, title }) =>
                ({ name: title, value: id }));
            inquirer.prompt([
                {
                    type: 'list',
                    name: 'selectEmployee',
                    message: 'Which employee would you like to update?',
                    choices: employeeList
                },
                {
                    type: 'list',
                    name: 'selectRole',
                    message: 'Which role are you assinging to this employee?',
                    choices: roleList
                },
            ]).then(function (answer) {
                connection.query(
                    `UPDATE employee SET role_id = '${role_id = answer.selectRole}' WHERE id = '${answer.selectEmployee}'`,
                    viewEmployee,
                    mainMenu
                );
                console.log('Employee has been updated!');
            });
        });
    });
};
// BONUS 'Update a Manager',

// BONUS 'Delete Department',

// BONUS 'Delete Roles',

// BONUS 'Delete Employee',

// BONUS 'View Budget by Department',

// 'Quit'
function endMainMenu() {
    connection.end();
    console.log('Bye! See you again!');
};