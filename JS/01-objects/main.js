// ===================== (Execution Context) ==========================

/*
 * 1. implicit binding
 * when a regular function is invoked as an object method,
 *  _this_ keyword points (implicitly) to the object at the right of the dot.
 * obj.method() -> any _this_ inside method() is now pointing to the `obj`
 */

const agent = {
  codename: "007",

  // Standard method shorthand
  greet() {
    return `My codename is ${this.codename}`;
  },
};

// console.log(agent.greet()); // this.codename => 007

/**
 * 2. The context extraction bug(Losing _this_)
 * If you extract an object method and assign it to a standalone variable,
 * you break the reference link.
 * meaning the context is completely lost
 */

// This way, it will cause no error because we assigned the value to the `greet` variable.
const greet1 = agent.greet();

// This way, it will throw a TypeError (this reference to undefined)
const greet2 = agent.greet;

// console.log("standalone greeting:", greet1);
// console.log("standalone greet:", greet2());

/**
 * 3. The Arrow function trap inside objects
 * Arrow functions do not get their own `this` binding,
 * instead they capture `this` from the scope they were defined in.
 * usually global scope or a surrounding function scope.
 */

const breakableAgent = {
  codename: "007",
  greet: () => {
    return `My name is ${this.codename}`;
  },
};

// console.log(breakableAgent.greet()); // My name is undefined.

/**
 * 4. The Nested Callback Fix (Lexical Scope).
 * When you __must__ run a delayed function or a loop inside a method,
 * arrow functions are the perfect solution, where it can inherit `this` keyword from parent methods..
 */

const fixedAgent = {
  codename: "007",

  greet() {
    return setTimeout(() => {
      console.log(`My name is ${this.codename}`);
    }, 2000);
  },
};

// fixedAgent.greet();

// ================== Advanced Object Properties & Getters/Setters ===============
/**
 * In real world code, sometimes, we want to have some object properties that look like raw variables.
 *
 * But, when read or written we want to execute a different logic.
 */

// Example: The Validation Gatekeeper

const bankAccount = {
  _balance: 0,

  get balance() {
    return `Your balance is ${this._balance}`;
  },

  set balance(amount) {
    if (typeof amount != "number" || amount < 0) {
      console.error("Invalid Amount!");
      return;
    }

    this._balance += amount;
  },
};

// console.log(typeof bankAccount.balance);

bankAccount.balance = 1550;

// console.log(bankAccount.balance);

// ==================  Prototype Delegation (The True Foundation of JS OOP) ============
/**
 * In JS objects, there is a hidden link between objects is called [[Prototype]].
 * When you access a property or a method that doesn't exist on the object, the engine
 * automatically moves upward to other linked objects searching for these member along this link.
 */

// Legacy Creation Pattern vs Modern Performance

function Vehicle(make, model) {
  this.make = make;
  this.model = model;
}

Vehicle.prototype.drive = function () {
  return `${this.make} ${this.model} is moving..`;
};

const car1 = new Vehicle("Toyota", "Corolla");
const car2 = new Vehicle("Honda", "Civic");

// console.log(car1.drive());

// for memory efficiency
// console.log(car1.drive === car2.drive); // true means they share the same function block in the memory.

/**
 * If you had attached drive inside the constructor using this.drive = function..., every single car instance would create a brand-new copy of that function, destroying performance at scale.
 */

// ====================== Quizzes ========================

/**
 * Quiz 1: The reference handoff
 * What will the console print when running this execution pattern?
 */

const system = {
  status: "Online",
  check() {
    return this.status;
  },
};

const monitor = {
  status: "Offline",
  run: system.check,
};

// console.log(monitor.run());

/**
 * Quiz 2: The Double Nesting Trap
 * What will the console output from this execution context layout?
 */

Function.prototype.items = ["hello", "Hey"];

const store = {
  items: ["Computer", "mouse"],
  list() {
    // This son't work
    // this.items.forEach(function (item) {
    //   console.log(`${this.items.length} items available: ${item}`);
    // });

    this.items.forEach((item) => {
      console.log(`${this.items.length} items available: ${item}`);
    });
  },
};

// store.list();

/**
 * Edge-Case Mini-Quiz
 * Let's test this deep scope mechanic with a slight twist. What will this code print to the console?
 */

const user = {
  name: "John",
  // this way, it will not work 'undefined'
  //   greet: () => {
  //     const inner = () => {
  //       console.log(`Hello, ${this.name}`);
  //     };

  //     inner();
  //   },

  greet() {
    const inner = () => {
      console.log(`Hello, ${this.name}`);
    };

    inner();
  },
};

// user.greet();

/**
 * Quiz 3: The Dynamic Execution Override
 * Let's see what happens if we tamper with the invocation link. What will this code print to the console?
 */

const user1 = {
  name: "John",
  greet() {
    const print = () => console.log(this.name);
    print();
  },
};

const guest = { name: "Sarah" };

const externalGreet = user1.greet.bind(guest);

// externalGreet();

/**
 * Quiz 4: The Infinite Loop Trap
 * Getters and setters are powerful, but they hide a dangerous trap that catches even intermediate developers. Look at the code below:
 */

const usrProfile = {
  name: "John",

  get name() {
    return this.name;
  },

  set name(value) {
    this.name = value;
  },
};

// console.log(userProfile.name);

/**
 * Quiz 5: The Shadowing Mechanics
 * Let's test how the engine behaves when instance properties collide with prototype properties. Look closely at this setup:
 */

function Gamer(username) {
  this.username = username;
  this.score = 100;
}

Gamer.prototype.score = 0;
Gamer.prototype.getScore = function () {
  return this.score;
};

const player = new Gamer("PixelKnight");

// Mutation step
delete player.score;

// console.log("Player Score: ", player.getScore());

/**
 * Quiz 6: The Ultimate Prototype Mutation Trap
 * What happens when the prototype property is an Array (Reference Type) instead of a primitive number?
 */

function Team(name) {
  this.name = name;
  // this.members = [];
}

// Attach an array to the prototype
Team.prototype.members = [];

const alpha = new Team("Alpha");
const beta = new Team("Beta");

// This is MUTATIONS Which Cause Data to be shared
alpha.members.push("John", "Ahmad", "ali");
// alpha.members.pop();

// console.log(beta.members);
// console.log(Team.prototype.members);

/**
 * Quiz 7: Mutation vs Reassignment
 * Let's see if you can catch the nuance of this rule. Look at this slight modification to the breakdown pattern:
 */

function Configuration() {}

Configuration.prototype.settings = { theme: "dark" };
// Configuration.prototype.settings.them = "dark";

const userConfig = new Configuration();
const systemConfig = new Configuration();

// This is ASSIGNMENT Which Doesn't Cause Data to be shared
userConfig.settings = { theme: "light" };

console.log({
  user: userConfig.settings,
  system: systemConfig.settings,
});
