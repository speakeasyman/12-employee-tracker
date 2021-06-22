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
              let query = 
              'SELECT e.id, e.first_name, e.last_name, roles.title, departments.name, roles.salary, CONCAT(m.first_name, " ", m.last_name)'
              query +=
               'AS manager FROM employees e LEFT JOIN employees m ON m.id = e.manager_id JOIN roles ON e.role_id = roles.id JOIN departments ON departments.id = roles.department_id;';
              console.log('query:', query)
              
              connection.query(query, (err, res) => {
                  if (err) throw err;
                  console.table(res);
                  connection.end();
              });
        }   else if (answers.action === 'VIEW_ROLES') {
            console.log(`you want to see all Roles`);
            let query = 
            'SELECT roles.id, roles.title, roles.salary, departments.name AS department '
            query +=
             'FROM roles Inner JOIN departments ON roles.department_id = departments.id;';
            console.log('query:', query)
            
            connection.query(query, (err, res) => {
                if (err) throw err;
                console.table(res);
                connection.end();
            });
        }   else if (answers.action === 'VIEW_DEPARTMENTS') {
                console.log(`you want to see all Departments`);
                connection.query('SELECT * FROM departments', (err, res) => {
                    if (err) throw err;
                    console.table(res);
                    connection.end();
                });
            }else if (answers.action === 'VIEW_EMPLOYEES_BY_DEPARTMENT') {
                console.log(`you want to see Employees by department`);
                inquirer.
                prompt({
                    name: 'department',
                    type: 'list',
                    choices: [{
                        name: 'Human Resources',
                        value: '1'
                    },
                    {
                        name: 'Quality Control',
                        value: '2'
                    },
                    {
                        name: 'Quality Engineering',
                        value: '3'
                    },
                    {
                        name: 'Research and Developement',
                        value: '4'
                    }]
                })
                .then((answers) => {
                    console.log(`we have reached the end`)
                    console.log(answers.department)
                    let query = 'SELECT employees.first_name, employees.lastname, '
                    connection.end();
                })
                }
})
}


  