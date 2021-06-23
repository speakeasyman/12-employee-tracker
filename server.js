const mysql = require("mysql2");
const inquirer = require("inquirer");
const cTable = require("console.table");

const connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "passwerd",
  database: "personnelDB",
});

connection.connect((err) => {
  if (err) throw err;
  start();
});

exports.connection = connection;
// the start function, originally in my head I was hoping to have it a lot more modular, but I ran
// I didn't have as much time this week due to a trip.
const start = () => {
  startPrompt();
};
// These are the prompts. It could definitely be more modular, that would be a later day thing.
// When they select which choice prompt it will carry down to the query search.
const startPrompt = () => {
  inquirer
    .prompt([
      {
        name: "action",
        type: "list",
        choices: [
          {
            name: "View All Employees",
            value: "VIEW_EMPLOYEES",
          },
          {
            name: "View All Employees by Department",
            value: "VIEW_EMPLOYEES_BY_DEPARTMENT",
          },
          {
            name: "View All Employees by Manager",
            value: "VIEW_EMPLOYEES_BY_MANAGER",
          },
          {
            name: "Add Employee",
            value: "ADD_EMPLOYEE",
          },
          {
            name: "Remove Employee",
            value: "REMOVE_EMPLOYEE",
          },
          {
            name: "Update Employee Role",
            value: "UPDATE_EMPLOYEE_ROLE",
          },
          {
            name: "Update Employee Manager",
            value: "UPDATE_EMPLOYEE_MANAGER",
          },
          {
            name: "View All Roles",
            value: "VIEW_ROLES",
          },
          {
            name: "Add Role",
            value: "ADD_ROLE",
          },
          {
            name: "Remove Role",
            value: "REMOVE_ROLE",
          },
          {
            name: "View All Departments",
            value: "VIEW_DEPARTMENTS",
          },
          {
            name: "Add Department",
            value: "ADD_DEPARTMENT",
          },
          {
            name: "Remove Department",
            value: "REMOVE_DEPARTMENT",
          },
          {
            name: "Quit",
            value: "QUIT",
          },
        ],
      },
    ])
    .then((answers) => {
      console.log(answers);
      if (answers.action === "VIEW_EMPLOYEES") {
        // So, the console.logs were just there as a placeholder as I built the prompts
        // but then I kind of liked the feed back, so I kept them.
        // I did the query and the query += as a way to keep the lines from being super long
        // I saw someone else do it online.
        console.log(`You want to see all employees`);
        let query =
          'SELECT e.id, e.first_name, e.last_name, roles.title, departments.name, roles.salary, CONCAT(m.first_name, " ", m.last_name)';
        query +=
          "AS manager FROM employees e LEFT JOIN employees m ON m.id = e.manager_id JOIN roles ON e.role_id = roles.id JOIN departments ON departments.id = roles.department_id;";
        connection.query(query, (err, res) => {
          if (err) throw err;
          console.table(res);
          start();
        });
      } else if (answers.action === "VIEW_ROLES") {
        console.log(`You want to see all Roles`);
        let query =
          "SELECT roles.id, roles.title, roles.salary, departments.name AS department ";
        query +=
          "FROM roles Inner JOIN departments ON roles.department_id = departments.id;";        
        connection.query(query, (err, res) => {
          if (err) throw err;
          console.table(res);
          start();
        });
      } else if (answers.action === "VIEW_DEPARTMENTS") {
        console.log(`You want to see all Departments`);
        connection.query("SELECT * FROM departments", (err, res) => {
          if (err) throw err;
          console.table(res);
          start();
        });
      } else if (answers.action === "VIEW_EMPLOYEES_BY_DEPARTMENT") {
        console.log(`You want to see Employees by department`);
        let deptQuery = "SELECT * FROM departments";
        connection.query(deptQuery, (err, resD) => {
          if (err) throw err;
          //Ok, this is neat. I kept forgetting what my department or manager IDs are
          //So I print a table as a reference so I know which id to search by.
          //It should be possible to have a function return and array, so the choices could just auto-
          //populate from a list type input, but I couldn't figure it out in the time I had.
          console.table(resD);
        });
        inquirer
          .prompt({
            name: "department",
            type: "input",
            message: "enter the department ID number",
          })
          .then((answers) => {
            let query =
              'SELECT e.id, e.first_name, e.last_name, roles.title, departments.name, roles.salary, CONCAT(m.first_name, " ", m.last_name) ';
            query +=
              "AS manager FROM employees e LEFT JOIN employees m ON m.id = e.manager_id JOIN roles ON e.role_id = roles.id JOIN departments ON departments.id = roles.department_id ";
            query += "WHERE roles.department_id = ?;";
            connection.query(
              query,
              [answers.department, answers.department],
              (err, res) => {
                if (err) throw err;
                console.table(res);
                start();
              }
            );
          });
      } else if (answers.action === "VIEW_EMPLOYEES_BY_MANAGER") {
        console.log(`You want to see Employees by Manager`);
        let managerQuery =
          'SELECT CONCAT(employees.first_name, " ", employees.last_name) AS Name, employees.id AS Manager from employees WHERE manager_id = 0';
        connection.query(managerQuery, (err, resM) => {
          if (err) throw err;
          //the manager table.
          console.table(resM);
        });
        inquirer
          .prompt({
            name: "manager",
            type: "input",
            message: "Please enter Manager ID",
          })
          .then((answers) => {
            let query =
              'SELECT e.id, e.first_name, e.last_name, roles.title, departments.name, roles.salary, CONCAT(m.first_name, " ", m.last_name) ';
            query +=
              "AS manager FROM employees e LEFT JOIN employees m ON m.id = e.manager_id JOIN roles ON e.role_id = roles.id JOIN departments ON departments.id = roles.department_id ";
            query += "WHERE e.manager_id = ?;";
            connection.query(
              query,
              [answers.manager, answers.manager],
              (err, res) => {
                if (err) throw err;
                console.table(res);
                start();
              }
            );
          });
      } else if (answers.action === "ADD_EMPLOYEE") {
        console.log(`You want to add an Employee`);
        inquirer
          .prompt([
            {
              name: "first_name",
              type: "input",
              message: "Please enter The Employee's first name",
            },
            {
              name: "last_name",
              type: "input",
              message: "Please enter The Employee's first name",
            },
            {
              name: "role_id",
              type: "input",
              message: "Please enter The Employee's Role ID",
            },
            {
              name: "manager_id",
              type: "input",
              message:
                "Please enter The Employee's Manager ID. If the employee is a manager, enter 0",
            },
          ])
          .then((answers) => {
            let query =
              "INSERT INTO employees (first_name, last_name, role_id, manager_id) ";
            query += "VALUES (?, ?, ?, ?) ";
            connection.query(
              query,
              [
                answers.first_name,
                answers.last_name,
                answers.role_id,
                answers.manager_id,
              ],
              (err, res) => {
                if (err) throw err;
                console.table(res);
                start();
              }
            );
          });
      } else if (answers.action === "REMOVE_EMPLOYEE") {
        console.log(`You want to remove an Employees`);

        inquirer
          .prompt([
            {
              name: "id",
              type: "input",
              message: "Please enter the employees ID number",
            },
          ])
          .then((answers) => {
            let query = "DELETE FROM employees WHERE employees.id = ?";
            connection.query(query, [answers.id], (err, res) => {
              if (err) throw err;
              console.table(res);
              start();
            });
          });
      } else if (answers.action === "ADD_ROLE") {
        console.log(`You want to add a Role`);

        inquirer
          .prompt([
            {
              name: "title",
              type: "input",
              message: "Please enter the role's title.",
            },
            {
              name: "salary",
              type: "input",
              message: "Please enter the role's salary",
            },
            {
              name: "department",
              type: "input",
              message: "Please enter the role's department id",
            },
          ])
          .then((answers) => {
            let query = "INSERT INTO roles (title, salary, department_id) ";
            query += "VALUES (?, ?, ?) ";
            connection.query(
              query,
              [answers.title, answers.salary, answers.department],
              (err, res) => {
                if (err) throw err;
                console.table(res);
                start();
              }
            );
          });
      } else if (answers.action === "REMOVE_ROLE") {
        console.log(`You want to remove a Role`);
        inquirer
          .prompt([
            {
              name: "id",
              type: "input",
              message: "Please enter the Role's ID number",
            },
          ])
          .then((answers) => {
            let query = "DELETE FROM roles WHERE roles.id = ?";
            connection.query(query, [answers.id], (err, res) => {
              if (err) throw err;
              console.table(res);
              start();
            });
          });
      } else if (answers.action === "ADD_DEPARTMENT") {
        console.log(`You want to add a Role`);

        inquirer
          .prompt([
            {
              name: "name",
              type: "input",
              message: "Please enter the Department's Name.",
            },
          ])
          .then((answers) => {
            let query = "INSERT INTO departments (name) ";
            query += "VALUES (?) ";
            connection.query(query, [answers.name], (err, res) => {
              if (err) throw err;
              console.table(res);
              start();
            });
          });
      } else if (answers.action === "REMOVE_DEPARTMENT") {
        console.log(`You want to remove a Role`);

        inquirer
          .prompt([
            {
              name: "id",
              type: "input",
              message: "Please enter the Departments's ID number",
            },
          ])
          .then((answers) => {
            let query = "DELETE FROM departments WHERE departments.id = ?";
            connection.query(query, [answers.id], (err, res) => {
              if (err) throw err;
              console.table(res);
              start();
            });
          });
      } else if (answers.action === "UPDATE_EMPLOYEE_ROLE") {
        console.log(`You want to update and Employee's role`);
        inquirer
          .prompt([
            {
              name: "id",
              type: "input",
              message: "Please enter the Employee's ID number",
            },
            {
              name: "newRole",
              type: "input",
              message: "Please enter the New Role ID",
            },
          ])
          .then((answers) => {
            let query =
              "UPDATE employees SET role_id = ? WHERE employees.id = ?";
            connection.query(
              query,
              [answers.newRole, answers.id],
              (err, res) => {
                if (err) throw err;
                console.table(res);
                start();
              }
            );
          });
      } else if (answers.action === "UPDATE_EMPLOYEE_MANAGER") {
        console.log(`You want to update and Employee's role`);

        inquirer
          .prompt([
            {
              name: "id",
              type: "input",
              message: "Please enter the Employee's ID number",
            },
            {
              name: "newManager",
              type: "input",
              message: "Please enter the New Manager ID",
            },
          ])
          .then((answers) => {
            let query =
              "UPDATE employees SET manager_id = ? WHERE employees.id = ?";
            connection.query(
              query,
              [answers.newManager, answers.id],
              (err, res) => {
                if (err) throw err;
                console.table(res);
                start();
              }
            );
          });
      } else if (answers.action === "QUIT") {
        console.log(`Have a Wonderful Day!`);
        connection.end();
      }
    });
};
