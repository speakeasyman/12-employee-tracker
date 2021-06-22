const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');
const prompts = require('./assets/prompts')

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

  const start = () => {
      prompts.startPrompt();
  };

  connection.connect((err) => {
      if (err) throw err;
      start();
  });