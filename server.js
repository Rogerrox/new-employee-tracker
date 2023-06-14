const inquirer = require('inquirer');
const mysql = require('mysql2');
const consoleTable = require("console.table")

//connection with database created
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    port: 3306,
    password: "Scsd@45Ct",
    database: "employee_db"
})
console.log("Conected to the employee_db.")

// connect to sql server and sql database
connection.connect( (err)=> {
    if (err) throw err;
    mainMenu()
});

function menu() {
    inquirer.prompt
        ({
            type: "list",
            name: "menu",
            message: "What would you like to do?",
            choices: [
                "View All Employees",
                "View All Departments",
                "View All Roles",
                "Add Employee",
                "Add Department",
                "Add Role",
                "Update Employee Role",
                "Exit"
            ]
        })
        .then(function (answer) {
            switch (answer.menu) {
                case "View All Employees":
                    viewAllEmployees();
                    break;

                case "View All Departments":
                    viewAllDept();
                    break;

                case "View All Roles":
                    viewAllRoles();
                    break;

                case "Add Employee":
                    addEmployee();
                    break;

                case "Add Department":
                    addDept();
                    break;

                case "Add Role":
                    addRole();
                    break;

                case "Update Employee Role":
                    updateEmployeeRole();
                    break;

                case "Exit":
                    connection.end();
                    break;
            }

        })
}

function viewAllEmployees() {
    var query = "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.department_name AS department, role.salary FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department on role.department_id = department.id"
    connection.query(query, function (err, res) {
      console.table(res);
      menu();
    });
  }


// view all employees in the database
function viewEmployees() {
    var query = 'SELECT * FROM employee';
    connection.query(query, function(err, res) {
        if (err) throw err;
        console.table("All Employees:",res); 
        menu();
    })
};

// view all departments in the database
function viewDepartments() {
    var query = 'SELECT * FROM department';
    connection.query(query, function(err, res) {
        if(err)throw err;
        console.table('All Departments:', res);
        menu();
    })
};

// view all roles in the database
function viewRoles() {
    var query = 'SELECT * FROM role';
    connection.query(query, function(err, res){
        if (err) throw err;
        console.table('All Roles:', res);
        menu();
    })
};

// add an employee to the database
function addEmployee() {
    connection.query('SELECT * FROM role', function (err, res) {
        if (err) throw err;
        inquirer
            .prompt([
                {
                    name: 'first_name',
                    type: 'input', 
                    message: "What is the employee's fist name? ",
                },
                {
                    name: 'last_name',
                    type: 'input', 
                    message: "What is the employee's last name? "
                },
                {
                    name: 'manager_id',
                    type: 'input', 
                    message: "What is the employee's manager's ID? "
                },
                {
                    name: 'role', 
                    type: 'list',
                    choices: function() {
                    var roleArray = [];
                    for (let i = 0; i < res.length; i++) {
                        roleArray.push(res[i].title);
                    }
                    return roleArray;
                    },
                    message: "What is this employee's role? "
                }
                ]).then(function (answer) {
                    let role_id;
                    for (let a = 0; a < res.length; a++) {
                        if (res[a].title == answer.role) {
                            role_id = res[a].id;
                            console.log(role_id)
                        }                  
                    }  
                    connection.query(
                    'INSERT INTO employee SET ?',
                    {
                        first_name: answer.first_name,
                        last_name: answer.last_name,
                        manager_id: answer.manager_id,
                        role_id: role_id,
                    },
                    function (err) {
                        if (err) throw err;
                        console.log('Your employee has been added!');
                        menu();
                    })
                })
        })
};



function addDept() {
    inquirer
      .prompt({
        type: "input",
        message: "Enter the name of the new department",
        name: "newDept"
      })
      .then(function (res) {
        const newDepartment = res.newDept;
        const query = `INSERT INTO department (department_name) VALUES ("${newDepartment}")`;
        connection.query(query, function (err, res) {
          if (err) {
            throw err;
          }
          console.table(res);
          menu();
        });
      });
  }


  function addRole() {
    inquirer
      .prompt([
        {
          type: "input",
          message: "Enter the employee's title",
          name: "roleTitle"
        },
        {
          type: "input",
          message: "Enter the employee's salary",
          name: "roleSalary"
        },
        {
          type: "input",
          message: "Enter the employee's department ID",
          name: "roleDept"
        }
      ])
      .then(function (res) {
        const title = res.roleTitle;
        const salary = res.roleSalary;
        const departmentID = res.roleDept;
        const query = `INSERT INTO role (title, salary, department_id) VALUES ("${title}", "${salary}", "${departmentID}")`;
        connection.query(query, function (err, res) {
          if (err) {
            throw err;
          }
          console.table(res);
          menu();
        });
      });
  }
  
  function updateEmployeeRole() {
      inquirer
      .prompt([
        {
          type: "input",
          message: "Enter the employee's ID you want to be updated",
          name: "updateEmploy"
        },
        {
          type: "input",
          message: "Enter the new role ID for that employee",
          name: "newRole"
        }
      ])
      .then(function (res) {
          const updateEmploy = res.updateEmploy;
          const newRole = res.newRole;
          const queryUpdate = `UPDATE employee SET role_id = "${newRole}" WHERE id = "${updateEmploy}"`;
          connection.query(queryUpdate, function (err, res) {
            if (err) {
              throw err;
            }
            console.table(res);
            menu();
          })
        });
      }