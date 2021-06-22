const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');
// const prompts = require('./assets/prompts')

const connection = mysql.createConnection({
    host: 'localhost',
  
    // Your port; if not 3306
    port: 3306,
  
    // Your username
    user: 'root',
  
    // Your password
    password: 'passwerd',
    database: 'personnelDB',
  });

  connection.connect((err) => {
    if (err) throw err;
    start();
});

  exports.connection = connection

  const start = () => {
      startPrompt();
  };

  const startPrompt = () => {
    
    inquirer
      .prompt([
          {
              name: 'action',
              type: 'list',
              choices: [{
                  name: 'View All Employees',
                  value: 'VIEW_EMPLOYEES'
                },
                {
                    name: 'View All Employees by Department',
                    value: 'VIEW_EMPLOYEES_BY_DEPARTMENT'
                  },
                  {
                    name: 'View All Employees by Manager',
                    value: 'VIEW_EMPLOYEES_BY_MANAGER'
                  },
                  {
                    name: 'Add Employee',
                    value: 'ADD_EMPLOYEE'
                    },
                {
                    name: 'Remove Employee',
                    value: 'REMOVE_EMPLOYEE'
                    },
                {
                    name: 'Update Employee Role',
                    value: 'UPDATE_EMPLOYEE_ROLE'
                    },
                {
                    name: 'Update Employee Manager',
                    value: 'UPDATE_EMPLOYEE_MANAGER'
                    },
                {
                    name: 'View All Roles',
                    value: 'VIEW_ROLES'
                    },
                {
                    name: 'Add Role',
                    value: 'ADD_ROLE'
                    },
                {
                    name: 'Remove Role',
                    value: 'REMOVE_ROLE'
                    },
                {
                    name: 'View All Departments',
                    value: 'VIEW_DEPARTMENTS'
                    },
                {
                    name: 'Add Department',
                    value: 'ADD_DEPARTMENT'
                    },
                {
                    name: 'Remove Department',
                    value: 'REMOVE_DEPARTMENT'
                    },
                {
                    name: 'Quit',
                    value: 'QUIT'
                    },
                      
                  
              ]
          }
      ])
      .then((answers) => {
          console.log(answers)
          if (answers.action === 'VIEW_EMPLOYEES') {
              console.log(`you want to see all employees`);
              connection.query('SELECT * FROM employees', (err, res) => {
                  if (err) throw err;
                  console.log(res);
                  connection.end();
              });
              



              
          }

      })
}

  