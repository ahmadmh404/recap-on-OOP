// ====================== 01: Defining a object literal ========================
const person = {};

// console.log({ person }); // { person: {} }
// console.log(typeof person); // object

const person1 = {
  name: ["Bob", "Smith"],
  age: 32,

  // print your bio
  // normal function expression
  bio: function () {
    console.log(
      `Name is ${this.name.join(" ")}, and age ${this.age} Years Old`,
    );
  },

  // Introduce Yourself
  // The (){ } expression
  introduceSelf() {
    console.log(`Hi! my name is ${this.name.join(" ")}`);
  },
};

// console.log({
//   undefinedName: person.name, // undefined
//   definedName: person1.name, // ["BOb", "Smith"]
// });

// console.log({
//   bio: person1.bio(),
//   greeting: person1.introduceSelf(),
// });

// =========================== 02: Nested Objects =============================
const person2 = {
  // nmae now is an object
  name: {
    first: "John",
    last: "Doe",
  },
  age: 23,
};

// Now we need to go two levels deep (.name.first)
// console.log({ name: `${person2.name.first} ${person2.name.last}` });

// ======================= 03: Notations - Accessing Object Members ===================

// A. Dot notation: e.g. person2.name.first
// console.log("dot notation: ", { name: person2.name.first });

// B. Square notation e.g. person1['name']
// --- Properities ---
// console.log("sqaure notation", { name: person2["name"] });
// console.log("sqaure notation", { name: person2["name"]["first"] });

//  --- Methods ---
// person1["bio"]();

// e.g. logging property fuction
function logProperty(propertyName) {
  console.log(person2[propertyName]);
}

// logProperty("name");
// logProperty("age");

// ========================== 04: Setting Object Members (literal) =====================

const person3 = {
  name: {
    first: "John",
    last: "Doe",
  },
  age: 23,
};

// assinging another value
person3.age = 32;
person3.name.first = "Ahmad";

// console.log({ person3 });

// ==================================== 05: Adding New Members =================================

const person4 = {
  name: {
    first: "ahmad",
  },
  age: 32,
};

person4.name.last = "Hossamo";

// The word `this` return to the object that your assinging the method to..
person4.greeting = function () {
  reurn`Nmae: ${Object.values(this.name).join(" ")}`;
};

// person4.greeting();

// Adding custom values
const customMemberName = "height";
const customMemberValue = "1.84 Meter";

person4[customMemberName] = customMemberValue;

person4.greeting = function () {
  return `Name: ${this.name}, age: ${this.age}, Height: ${this.height}`;
};

console.log(person4.greeting()); // Name: [object Object], age: 32, Height: 1.84 Meter
