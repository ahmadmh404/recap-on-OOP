// 01: Task 1
const cat = {
  name: "Bertei",
  breed: "Cymric",
  color: "white",
  greeting: function () {
    console.log("Meow!");
  },
};

// 1.1. Store the value of the name property in1side the catName variable, using bracket notation.

const catName = cat.name;
// console.log(`My name is Meow! Oops I mean ${catName}`);

// 1.2. Run the greeting() method using dot notation (it will log the greeting to the console).

// cat["greeting"]();

// 1.3. Update the color property value to black.

cat.color = "blue";

// console.log({ color: cat.color });

// 02: Task 2
// const band = {
//   name: "Bing Bang",
//   nationality: "USA",
//   genre: "Rock",
//   members: 2,
//   formed: 2001,
//   split: false,
//   albums: [
//     { name: "Iraq", released: 2003 },
//     { name: "Libya", released: 2007 },
//     { name: "Syria", released: 2011 },
//     { name: "Iran", released: 2025 },
//   ],
// };

const bandInfo = `
    Name; ${band.name},
    nationality: ${band.nationality},
    Been Actve For: ${new Date().getFullYear() - band.formed},
    Style: ${band.genre},
    First Albums: 
        Title: ${band.albums.at(0).name},
        Release Date: ${band.albums.at(0).released}
`;

// console.log(bandInfo);

// 03: Task 3

// 1: Rewrite the greeting() method so that it logs "Hello, said Bertie the Cymric." to the browser's console, but in a way that will work across any cat object of the same structure, regardless of its name or breed.
cat.greeting = function () {
  console.log(`Hello, said ${this.name} the ${this.breed}`);
};

// 2: Write your own object called cat2, which has the same structure and greeting() method, but a different name, breed, and color.
const cat2 = {
  name: "Kiki",
  breed: "IDK",
  color: "Black",
  greeting: function () {
    console.log(`Hello, said ${this.name} the ${this.breed}`);
  },
};

// 3: Call both greeting() methods to check that they log appropriate greetings to the console.

// cat.greeting();
// cat2.greeting();

// 04: Task 4

function Cat(name) {
  this.name = name;
  this.greeting = function () {
    console.log(`Hello, my name is ${this.name}`);
  };
}

const cat3 = new Cat("Bero");
const cat4 = new Cat("KiKi");

cat3.greeting();
cat4.greeting();
