"use strict";

// ====================== 03: Static Methods ==================

/**
 * 01: Object.assign
 * it copies the properties of one or more source object to the target object.
 * Syntax: Object.assign(target, source1, source2, ....).
 */

// simple
const source1 = { a: 2, b: 4 };
const source2 = { a: "AB", f: 4 };
const source3 = { K: 2, d: 2 };
const target = { a: 5, d: 1 };

const result = Object.assign(target, source1, source2, source3);
// console.log({ result });

// creating a new object
const obj = { a: 1 };
const copy1 = Object.assign({}, obj);

// console.log({ copy1 });

// Deep cloning
const obj2 = { a: 0, b: { c: { a: 2 } } };
// const copy2 = Object.assign({}, obj2); // This isn't going to work.
// const copy2 = structuredClone(obj2); // Also didn't work.
// console.log({ copy2 });

/**
 * 02: Object.create
 * creates a new object based on an existing object prototype
 * Syntax: Object.create(obj, propertiesObj)
 */

// Simple
const person = {
  isHuman: Boolean,
  introduceSelf: function () {
    return `My name is ${this.name}, Am I human? ${this.isHuman}`;
  },
};

const me = Object.create(person);

me.name = "Ahmad";
me.isHuman = true;

// console.log(me.introduceSelf());

// True Example

// define the parent class
function Shape() {
  this.x = 0;
  this.y = 0;
}

// add functionality to the prototype
Shape.prototype.move = function (x, y) {
  this.x += x;
  this.y += y;

  console.log({
    x: this.x,
    y: this.y,
  });

  // console.info("Shape Moved");
};

// Rectangle - subclass
function Rectangle() {
  Shape.call(this);
}

// subclass extends parent class
Rectangle.prototype = Object.create(Shape.prototype, {
  constructor: {
    value: Rectangle,
    enumerable: false,
    writeable: true,
    configurable: true,
  },

  // so the get method is executed when calling the property.
  area: {
    enumerable: false,
    configurable: false,
    get() {
      return (this.x + this.y) * 2;
    },
  },
});

// Rectangle.prototype.constructor = function (x, y) {
//   this.x = x;
//   this.y = y;

//   console.log({
//     "X Equals": x,
//     "Y Equals": y,
//   });
// };

const rect = new Rectangle();

// rect.move(1, 1);
// console.log(rect.area);

// Example: Seeing what's inside the prototype
const O = Object.create(Object.prototype, {
  foo: {
    value: "FOO",
    configurable: true,
    writeable: true,
  },
});

// console.log(O.foo);

/**
 * 03: defineProperties
 * define new or modify existing properties directly on an object
 * Syntax:Object.defineProperties(obj, {props})
 * see [[`./README.md`]] for more details
 * return the new modified/defined object.
 */

const userProfile = {};

Object.defineProperty(userProfile, "id", {
  get() {
    return crypto.randomUUID();
  },
  set(value) {
    console.log(value);
    // this.id = value;
  },
});

userProfile.email = "user@mail.com";
userProfile.id = "123";

// console.log(Object.entries(userProfile));

/**
 * 04: defineProperty
 * define new or modify existing properties directly on an object
 * Syntax:Object.defineProperty(obj, key, { properties })
 * see [[`./README.md`]] for more details
 * return the new modified/defined object.
 */

const config = {};
let themeValue = "";

Object.defineProperty(config, "theme", {
  get() {
    return themeValue;
  },

  set(value) {
    themeValue = value === "light" ? "light" : "dark";
  },

  configurable: false,
  enumerable: true,
});

config.theme = "light";

// console.log(config.theme);

/**
 * Preserve descriptor properties
 * (to avoid DRY I guess and for security reasons).
 */

/**
 * 1. Using null prototype
 * define the main object as null prototype so it doesn't inherit any properties from global objects.
 * This is very powerful for security reasons.
 */

const app = {};

const main = Object.create(null);
main.onCodeInjection = function () {
  return "Nice try hahaha, getta hell out of here!";
};

Object.defineProperty(app, "main", {
  value: main,
  writable: true,
  configurable: false,
  enumerable: false,
});

// console.log("Trying to inject some code...", app.main.onCodeInjection());

/**
 * 2. Object.freeze()
 * Prevent adding, removing properties from the object prototype
 */

// ================== Error: Attempt to define a property on an object that is not extensible ==================
// Object.freeze(app.main);

Object.defineProperty(app.main, "greeting", {
  value: "Hello, World!",
});

// console.log(app.main.greeting);

/**
 * Enumerable Attributes
 * yes -> shown in Object.keys and obj.prop
 * false -> doesn't
 */

const a = {};

Object.defineProperties(a, {
  a: {
    value: 1,
    enumerable: true,
  },

  b: {
    value: 2,
    enumerable: false,
  },

  c: { value: 1 }, // here the enumerable defaults to false.
});

a.d = 4; // when assigning a prop the enumerable defaults to true.

const p = { ...a };

// console.log({
//   a: p.a,
//   b: p.b,
//   c: p.c,
//   d: p.d,
// });

/**
 * Configurable attribute
 * yes -> we can play with it's settings and also delete it.
 * no -> we can't play with it's settings or delete it
 */

const o = {};

Object.defineProperty(o, "a", {
  get() {
    return 2;
  },

  configurable: false,
});

// Object.defineProperty(o, "a", {
//   value: 1,
// });

// Object.defineProperty(o, "a", {
//   set() {},
// });

// Object.defineProperty(o, "a", {
//   configurable: true,
// });

// Object.defineProperty(o, "a", {
//   get() {
//     return 1;
//   },
// });

// delete o.a;
