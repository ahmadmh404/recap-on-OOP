// ========================== 01: V1 constructor as a function ======================

function createPerson(name) {
  const obj = {};
  obj.name = name;
  obj.greeting = function () {
    return `Hi! I'm ${this.name}`;
  };

  return obj;
}

//created some objects
// const ahmad = createPerson("Ahmad");
// const ali = createPerson("Ali");

// console.log({
//   Ahmad: ahmad.greeting(),
//   Ali: ali.greeting(),
// });

// =============================== 02: Homono Constructor =========================

function Person(name) {
  this.name = name;
  this.greeting = function () {
    return `Hi! I'm ${this.name}`;
  };
}

const ahmad = new Person("Ahmad");
const ali = new Person("Ali");

console.log({
  "Ahmad Saya": ahmad.greeting(),
  "Ali Saya": ali.greeting(),
});

const notifi = new Notification("Hillo!");
