//import dependencies
const mysql = require ('mysql'); 
const inquirer = require ('inquirer'); 
const consoleTable = require ('console.table'); //required to show table in console

//create connection to sql
const connection = mysql.createConnection({
    host: 'localhost', 
    port: '3306', //default port for mysql protocol
    user:'root',
    password: 'password',
    database: 'employee_db'
}, 
console.log(`Conencted to the employee_db database.`)
);

connection.connect(function(err){
    if (err){
        return console.error('error: ' + err.message); 
    }
    console.log('Welcome to "Who Works Where?!"'); 
    console.log("Let's begin looking for our employees!")
    trackEmployee();
});

function trackEmployee(){
    console.log('We made it here!')
    // inquirer.prompt{(
        
    // )}
}

function endTrackEmployee(){ 
    connection.end(function(err) {
        if (err) {
          return console.log('error:' + err.message);
        }
        console.log('Bye! See you again!');
      });
};