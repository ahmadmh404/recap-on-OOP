// ==========================  Inheritance & Super Keyword ============================

/**
 * Quiz: identity access management and super()
 *
 * Scenario: You are building an identity access management (IAM) system for a cloud company.
 *
 * - You have a base class called Employee that takes a name and an email in its constructor, and has a public method called getProfile().
 * - You need to build a specialized child class called Manager.
 *
 * - The Structural Constraint:
 *      The Manager constructor must accept a third parameter called department.
 *      You must pass the name and email up to the parent constructor properly using super(),
 *      while assigning the department locally to the manager instance.
 *
 * Your Task:
 *
 *       Write both the parent Employee class and the child Manager class from scratch using modern ES6 syntax.
 */

// --- Solution 1..

// class Employee {
//   constructor(name, email) {
//     this.name = name;
//     this.email = email;
//   }

//   getProfile() {
//     return `Employee Name: ${this.name}, Employee Email ${this.email}`;
//   }
// }

// class Manager extends Employee {
//   constructor(name, email, department) {
//     this.department = department;
//     super(name, email);
//   }

//   getProfile() {
//     return `Manager Name: ${this.name}, Manager Email ${this.email}, Department: ${this.department}`;
//   }
// }

// const employee = new Employee("Ahmad", "ahmad@gmail.com");
// const manager = new Manager("Ahmad", "ahmad@gmail.com", "accounting");

// console.log({
//   employee1: employee.getProfile(),
//   manager: manager.getProfile(),
// });

// ==========================  Method Delegation and Polymorphism ============================

/**
 * Quiz: Dynamic Permissions Pipeline
 *
 *  Scenario:
 *
 * - The base Employee class provides standard permissions: ["read:dashboard"].
 * - The Manager class must return those exact same standard permissions plus its own: ["write:reports", "manage:team"].
 *
 * - The Constraint:
 *   - You are forbidden from hardcoding ["read:dashboard"] inside the Manager class.
 *   - The manager must dynamically call up to its parent's method using super.getPermissions(),
 *   - pull the array down, and combine it with its own custom metrics.
 *
 * Your Task:
 *
 *   - Add a getPermissions() method to both your Employee and Manager classes.
 *   - Use the array spread operator ([...]) to merge the arrays cleanly.
 */

const DEFAULT_EMPLOYEE_PERMISSIONS = ["read:dashboard"];
const DEFAULT_MANAGER_PERMISSIONS = ["write:dashboard"];

// --- Solution 1.. Classic

// class Employee {
//   constructor(name, email) {
//     this.name = name;
//     this.email = email;
//     this.permissions = [...DEFAULT_EMPLOYEE_PERMISSIONS];
//   }

//   getProfile() {
//     return `Employee Name: ${this.name}, Employee Email ${this.email}, Employer Permissions: ${this.permissions.join(" - ")}`;
//   }

//   getPermissions() {
//     return this.permissions;
//   }
// }

// class Manager extends Employee {
//   constructor(name, email, department) {
//     super(name, email);
//     this.department = department;
//   }

//   getProfile() {
//     return `${super.getProfile()}, Employer Department: ${this.department}, Employer Type: Manager`;
//   }

//   getPermissions() {
//     return [...super.getPermissions(), ...DEFAULT_MANAGER_PERMISSIONS];
//   }
// }

// --- Solution 3.. Dynamic Constructor-Driven Permissions

class Employee {
  constructor(name, email, permissions = []) {
    this.name = name;
    this.email = email;
    this.permissions = [...DEFAULT_EMPLOYEE_PERMISSIONS, ...permissions];
  }

  getProfile() {
    return `Employee Name: ${this.name}, Employee Email ${this.email}, Employer Permissions: ${this.permissions.join(" - ")}`;
  }
}

class Manager extends Employee {
  constructor(name, email, department) {
    super(name, email);
    this.department = department;
    // this.permissions = [...this.permissions, ...permissions];
    this.permissions.push(...DEFAULT_MANAGER_PERMISSIONS);
  }

  getProfile() {
    return `${super.getProfile()}, Employer Department: ${this.department}, Employer Type: Manager`;
  }
}
const employee = new Employee("Ahmad", "ahmad@gmail.com");
const manager1 = new Manager("Ahmad", "ahmad@gmail.com", "accounting");

console.log({
  EmployeePermissions: employee.permissions,
  AccountingManagerPermissions: manager1.permissions,
});
