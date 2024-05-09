import * as readline from 'readline';

// Define interface for Employee
interface Employee {
  id: number;
  name: string;
  age: number;
  department: string;
  salary: number;
}

// Define type alias for EmployeeList
type EmployeeList = Employee[];

// Define Employee Management System class
class EmployeeManagementSystem {
  private employees: EmployeeList;

  constructor() {
    this.employees = [];
  }

  // Method to add new employee
  addEmployee(employee: Employee): void {
    this.employees.push(employee);
  }

  // Method to get all employees
  getAllEmployees(): EmployeeList {
    return this.employees;
  }

  // Method to get employee by id
  getEmployeeById(id: number): Employee | undefined {
    return this.employees.find((employee) => employee.id === id);
  }

  // Method to update employee details
  updateEmployee(id: number, updatedEmployee: Employee): void {
    this.employees = this.employees.map((employee) =>
      employee.id === id ? updatedEmployee : employee
    );
  }

  // Method to delete employee
  deleteEmployee(id: number): void {
    this.employees = this.employees.filter((employee) => employee.id !== id);
  }
}

// Create an instance of EmployeeManagementSystem
const empManagementSystem = new EmployeeManagementSystem();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Function to get user input
function getUserInput(question: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
}

async function main() {
  while (true) {
    console.log("\n1. Add Employee");
    console.log("2. Update Employee");
    console.log("3. Delete Employee");
    console.log("4. View All Employees");
    console.log("5. Exit");

    const choice = parseInt(await getUserInput("\nEnter your choice: "));

    switch (choice) {
      case 1:
        const name = await getUserInput("Enter employee name: ");
        const age = parseInt(await getUserInput("Enter employee age: "));
        const department = await getUserInput("Enter employee department: ");
        const salary = parseInt(await getUserInput("Enter employee salary: "));

        const id = empManagementSystem.getAllEmployees().length + 1;

        empManagementSystem.addEmployee({ id, name, age, department, salary });
        console.log("Employee added successfully!");
        break;

      case 2:
        const idToUpdate = parseInt(await getUserInput("Enter employee id to update: "));
        const updatedName = await getUserInput("Enter updated employee name: ");
        const updatedAge = parseInt(await getUserInput("Enter updated employee age: "));
        const updatedDepartment = await getUserInput("Enter updated employee department: ");
        const updatedSalary = parseInt(await getUserInput("Enter updated employee salary: "));

        const employeeToUpdate = empManagementSystem.getEmployeeById(idToUpdate);
        if (employeeToUpdate) {
          empManagementSystem.updateEmployee(idToUpdate, {
            ...employeeToUpdate,
            name: updatedName,
            age: updatedAge,
            department: updatedDepartment,
            salary: updatedSalary,
          });
          console.log("Employee details updated successfully!");
        } else {
          console.log("Employee not found!");
        }
        break;

      case 3:
        const idToDelete = parseInt(await getUserInput("Enter employee id to delete: "));
        const employeeToDelete = empManagementSystem.getEmployeeById(idToDelete);
        if (employeeToDelete) {
          empManagementSystem.deleteEmployee(idToDelete);
          console.log("Employee deleted successfully!");
        } else {
          console.log("Employee not found!");
        }
        break;

      case 4:
        console.log("\nAll Employees:");
        console.log(empManagementSystem.getAllEmployees());
        break;

      case 5:
        rl.close();
        return;

      default:
        console.log("Invalid choice. Please try again.");
        break;
    }
  }
}

main().then(() => {
  console.log("Exiting Employee Management System");
});
