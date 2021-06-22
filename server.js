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
    // generateManagers();
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
        }   else if (answers.action === 'VIEW_EMPLOYEES_BY_DEPARTMENT') {
                console.log(`you want to see Employees by department`);
                let deptQuery = 'SELECT * FROM departments'
                connection.query(deptQuery, (err, resD) => {
                    if (err) throw err;
                    console.table(resD)
                });
                inquirer.
                prompt({
                    name: 'department',
                    type: 'input',
                    message: 'enter the department ID number',
                    
                })
                .then((answers) => {
                    console.log(`we have reached the end`)
                    console.log(answers.department)
                    let query = 
                    'SELECT e.id, e.first_name, e.last_name, roles.title, departments.name, roles.salary, CONCAT(m.first_name, " ", m.last_name) '
                    query +=
                     'AS manager FROM employees e LEFT JOIN employees m ON m.id = e.manager_id JOIN roles ON e.role_id = roles.id JOIN departments ON departments.id = roles.department_id ';
                    query +=
                    'WHERE roles.department_id = ?;';
                    console.log('query:', query)
                    connection.query(query, [answers.department, answers.department], (err, res) => {
                        console.log('query:', query)
                        if (err) throw err;
                        console.table(res);
                        connection.end();
                    });
                })
        }   else if (answers.action === 'VIEW_EMPLOYEES_BY_MANAGER') {
            console.log(`you want to see Employees by Manager`);
            let managerQuery = 'SELECT CONCAT(employees.first_name, " ", employees.last_name) AS Name, employees.id AS Manager from employees WHERE manager_id = 0'
            connection.query(managerQuery, (err, resM) => {
                if (err) throw err;
                console.table(resM)
            });

            inquirer.
            prompt({
                name: 'manager',
                type: 'input',
                message: 'Please enter Manager ID',                       
                    
            })
            .then((answers) => {
                console.log(`we have reached the end`)
                console.log(answers.manager)
                let query = 
                'SELECT e.id, e.first_name, e.last_name, roles.title, departments.name, roles.salary, CONCAT(m.first_name, " ", m.last_name) '
                query +=
                    'AS manager FROM employees e LEFT JOIN employees m ON m.id = e.manager_id JOIN roles ON e.role_id = roles.id JOIN departments ON departments.id = roles.department_id ';
                query +=
                'WHERE e.manager_id = ?;';
                console.log('query:', query)
                connection.query(query, [answers.manager, answers.manager], (err, res) => {
                    console.log('query:', query)
                    if (err) throw err;
                    console.table(res);
                    connection.end();
                });
            })
        }   else if (answers.action === 'ADD_EMPLOYEE') {
            console.log(`you want to add an Employees`);                        

            inquirer.
            prompt([
                {
                name: 'first_name',
                type: 'input',
                message: "Please enter The Employee's first name",
            }, {
                name: 'last_name',
                type: 'input',
                message: "Please enter The Employee's first name",
            }, {
                name: 'role_id',
                type: 'input',
                message: "Please enter The Employee's Role ID",
            }, {
                name: 'manager_id',
                type: 'input',
                message: "Please enter The Employee's Manager ID. If the employee is a manager, enter 0",
            }
        ])
            .then((answers) => {
                console.log(`we have reached the end`)
                
                let query = 
                'INSERT INTO employees (first_name, last_name, role_id, manager_id) '
                query +=
                    'VALUES (?, ?, ?, ?) ';                            
                console.log('query:', query)
                connection.query(query, [answers.first_name, answers.last_name, answers.role_id, answers.manager_id], (err, res) => {
                    console.log('query:', query)
                    if (err) throw err;
                    console.table(res);
                    connection.end();
                });
            })
        }   else if (answers.action === 'REMOVE_EMPLOYEE') {
                console.log(`you want to remove an Employees`);                        

                inquirer.
                prompt([
                    {
                    name: 'id',
                    type: 'input',
                    message: "Please enter the employees ID number",
                },
            ])
                .then((answers) => {
                    console.log(`we have reached the end`)
                    
                    let query = 
                    'DELETE FROM employees WHERE employees.id = ?'                                                            
                    console.log('query:', query)
                    connection.query(query, [answers.id], (err, res) => {
                        console.log('query:', query)
                        if (err) throw err;
                        console.table(res);
                        connection.end();
                    });
                })
        }   else if (answers.action === 'ADD_ROLE') {
                    console.log(`you want to add a Role`);                        
        
                    inquirer.
                    prompt([
                        {
                        name: 'title',
                        type: 'input',
                        message: "Please enter the role's title.",
                    }, {
                        name: 'salary',
                        type: 'input',
                        message: "Please enter the role's salary",
                    }, {
                        name: 'department',
                        type: 'input',
                        message: "Please enter the role's department id",
                    }, 
                ])
                    .then((answers) => {
                        console.log(`we have reached the end`)
                        
                        let query = 
                        'INSERT INTO roles (title, salary, department_id) '
                        query +=
                            'VALUES (?, ?, ?) ';                            
                        console.log('query:', query)
                        connection.query(query, [answers.title, answers.salary, answers.department], (err, res) => {
                            console.log('query:', query)
                            if (err) throw err;
                            console.table(res);
                            connection.end();
                        });
                    })
        }   else if (answers.action === 'REMOVE_ROLE') {
                        console.log(`you want to remove a Role`);                        
            
                        inquirer.
                        prompt([
                            {
                            name: 'id',
                            type: 'input',
                            message: "Please enter the Role's ID number",
                        },
                    ])
                        .then((answers) => {
                            console.log(`we have reached the end`)
                            
                            let query = 
                            'DELETE FROM roles WHERE roles.id = ?'                                                            
                            console.log('query:', query)
                            connection.query(query, [answers.id], (err, res) => {
                                console.log('query:', query)
                                if (err) throw err;
                                console.table(res);
                                connection.end();
                            });
                        })
        }   else if (answers.action === 'ADD_DEPARTMENT') {
                            console.log(`you want to add a Role`);                        
                
                            inquirer.
                            prompt([
                                {
                                name: 'name',
                                type: 'input',
                                message: "Please enter the Department's Name.",
                            }, 
                        ])
                            .then((answers) => {
                                console.log(`we have reached the end`)
                                
                                let query = 
                                'INSERT INTO departments (name) '
                                query +=
                                    'VALUES (?) ';                            
                                console.log('query:', query)
                                connection.query(query, [answers.name], (err, res) => {
                                    console.log('query:', query)
                                    if (err) throw err;
                                    console.table(res);
                                    connection.end();
                                });
                            })
        }   else if (answers.action === 'REMOVE_DEPARTMENT') {
                                console.log(`you want to remove a Role`);                        
                    
                                inquirer.
                                prompt([
                                    {
                                    name: 'id',
                                    type: 'input',
                                    message: "Please enter the Departments's ID number",
                                },
                            ])
                                .then((answers) => {
                                    console.log(`we have reached the end`)
                                    
                                    let query = 
                                    'DELETE FROM departments WHERE departments.id = ?'                                                            
                                    console.log('query:', query)
                                    connection.query(query, [answers.id], (err, res) => {
                                        console.log('query:', query)
                                        if (err) throw err;
                                        console.table(res);
                                        connection.end();
                                    });
                                })
        }   else if (answers.action === 'UPDATE_EMPLOYEE_ROLE') {
            console.log(`you want to update and Employee's role`);                        

            inquirer.
            prompt([
                {
                name: 'id',
                type: 'input',
                message: "Please enter the Employee's ID number",
            },{
                name: 'newRole',
                type: 'input',
                message: "Please enter the New Role ID",
            },
        ])
            .then((answers) => {
                console.log(`we have reached the end`)
                
                let query = 
                'UPDATE employees SET role_id = ? WHERE employees.id = ?'                                                            
                console.log('query:', query)
                connection.query(query, [answers.newRole, answers.id], (err, res) => {
                    console.log('query:', query)
                    if (err) throw err;
                    console.table(res);
                    connection.end();
                });
            })
        }   else if (answers.action === 'UPDATE_EMPLOYEE_MANAGER') {
            console.log(`you want to update and Employee's role`);                        

            inquirer.
            prompt([
                {
                name: 'id',
                type: 'input',
                message: "Please enter the Employee's ID number",
            },{
                name: 'newManager',
                type: 'input',
                message: "Please enter the New Manager ID",
            },
        ])
            .then((answers) => {
                console.log(`we have reached the end`)
                
                let query = 
                'UPDATE employees SET manager_id = ? WHERE employees.id = ?'                                                            
                console.log('query:', query)
                connection.query(query, [answers.newManager, answers.id], (err, res) => {
                    console.log('query:', query)
                    if (err) throw err;
                    console.table(res);
                    start();
                });
            })
        }   else if (answers.action === 'QUIT') {
            console.log(`Have a Wonderful Day!`);                        
            connection.end();
           
            
            
        }

})
}


//   generateManagers = () => {
//       let query = 'SELECT CONCAT(employees.first_name, " ", employees.last_name) AS Name, employees.id AS Manager from employees WHERE manager_id = 0'
//       connection.query(query,(err, res) => {
//         console.log('query:', query)
//         if (err) throw err;
//       console.log(res[0].Manager)
//       console.log(res[0].Name)
//       const choices = res.map(function (obj){
//           `{
//               name: ${obj.Name},
//               value: ${obj.Manager}
//           }`

//         })
//         console.log(`here's choices!! ${choices}`)
        
        
        
//         connection.end();
//     });
//   }