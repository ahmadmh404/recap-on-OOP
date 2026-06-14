// defining a constructor in TS

// 1: you need to define a type for the constructor
interface CarType {
  name: string;
  greeting: () => string;
}

// 2: define the constructor type
type CarConstructor = {
  new (name: string): CarType;
};

// 3: create the Constructor function, assign it into a variable  and cast the type to the constructor
const Car = function (this: CarType, name: string) {
  this.name = name;
  this.greeting = function () {
    return `hi! My name is ${this.name}`;
  };
} as any as CarConstructor;

const car1 = new Car("Kia Rio");

console.log({ car: car1.greeting() });

// --- Strongly Typed ---

// car1.model = 2020;
// console.log({ model: car1.model });
