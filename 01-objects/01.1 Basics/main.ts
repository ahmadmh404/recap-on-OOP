// Defining an object with it's literal or dynamic type

type CarType = {
  name: string;
  model: number;
  bio: () => string;
};

const car: CarType = {
  name: "Kia",
  model: 2020,

  bio() {
    return `Nmae is ${this.name}, Model is ${this.model}`;
  },
};

console.log({ bio: car.bio() });

// object type
type Car = typeof car;

// object properties type
type CarName = typeof car.name;

// Also the return type of an object method
type CarBioReturnType = ReturnType<typeof car.bio>;

// Add a memeber that doesn't exist in the type
const car2: CarType = {
  name: "Nisan",
  model: 2109,
  bio() {
    return `Name: ${this.name}, Model: ${this.model}`;
  },
};

// car2.color = "red";

// console.log(car2.color);
