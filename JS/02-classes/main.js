/**
 * Phase 2: Introduction
 *
 * The Scenario:
 * - You are building the core engine for a video game framework.
 * - You need to create a system for Wizard characters.
 *  - Every wizard has unique stats: a name and a spellList (Array).
 *  - Every wizard must have access to a shared method called castSpell(spellName).
 *
 * - The Creative Constraint:
 *  - You must design this engine using modern ES6 Class syntax. However,
 *  - you must purposely prevent the reference-type memory leak we just studied (where wizards share the same spell list),
 *      while ensuring that memory is perfectly optimized for the castSpell function.
 *
 * - Your Task:
 *  - Write the complete code structure for this Wizard class based on those architectural goals.
 */

class Wizard {
  constructor(name, spellList) {
    this.name = name;
    this.spellList = spellList;
  }

  castSpell(spellName) {
    console.log(`haaaaaaa.. ${spellName}`);
  }
}

const song = new Wizard("Song Jenho", ["raise", "teien", "lightning"]);

const Arthur = new Wizard("arthur leuin", [
  "fire",
  "wind",
  "ice",
  "lighting",
  "beast well",
]);

// console.log({
//   arthur: Arthur.spellList, //  [ "fire", "wind", "ice", "lighting", "beast well" ]
// });

// console.log(song.castSpell === Arthur.castSpell); // true

/**
 * microscopic hidden vulnerability:
 * in how javascript passes arrays by reference to constructors
 */

const sharedSpells = ["fire", "water"];

const wizardA = new Wizard("A", sharedSpells);
const wizardB = new Wizard("B", sharedSpells);

// wizardA.spellList.push("teleport");

// console.log({
//   B: wizardB.spellList,
// }); // [ "fire", "water", "teleport" ] 🤦‍♂️

// Solution: spread the array -> create fresh array..

class BulletProofWizard {
  constructor(name, spellList) {
    this.name = name;
    this.spellList = [...spellList];
  }

  castSpell(spellName) {
    console.log(`haaaaaaaaaaa... ${spellName} Arrow`);
  }
}

const BPWizardA = new BulletProofWizard("A", sharedSpells);
const BPWizardB = new BulletProofWizard("B", sharedSpells);

BPWizardA.spellList.push("teleport");

// console.log({
//   B: BPWizardB.spellList,
// }); // [ "fire", "water" ] 💋

/**
 * Phase 2: Modern Class Mechanics: Static Factory Method
 * 
 * The Scenario:
 * - You are building an e-commerce platform. You need a Product class.
 *  - Every product has an instance id, title, and price.

*  - The Structural Constraint:
    - You are forbidden from passing individual parameters into the standard new Product() constructor.
    - Instead, your backend team sends a raw JSON string payload from an external database API.

   - The Architectural Goal:
    - You must implement a Static Factory Method on the Product class named fromPayload
    - This method should take the raw JSON string, parse it, clean it up, 
    - and return a completely configured, live instance of the Product class. 

   - Your Task:
    - Write the complete Product class code containing the constructor and the static factory method. Then, 
    - write a sample execution line showing how a developer on your team would create an instance using your static factory
    
 */

class Product {
  constructor(id, title, price) {
    this.id = id;
    this.title = title;
    this.price = price;
  }

  //   id;
  //   title;
  //   price;

  static fromPayload(id, title, price) {
    if (!id) {
      throw new Error("Invalid ID");
    }

    if (!title || title.length < 1) {
      throw new Error("Invalid Title");
    }

    if (!price || price < 0) {
      throw new Error("Invalid Price");
    }

    return new Product(id, title, price);
  }
}

const id = crypto.randomUUID();
const productTitle = "Iphone6";
const price1 = 200;
const price2 = 400;

const product1 = Product.fromPayload(id, productTitle, price1);
const product2 = Product.fromPayload(id, productTitle, price2);
// const product3 = new Product(id, productTitle, price1); Not supposed to be called like this.

// console.log({
//   product1: { ...product1 },
//   product2: { ...product2 },
//   //   product3: { ...product3 },
// });

// {
//   product: {
//     id: "ab8d635f-298c-4971-8841-d7d3cc41529c",
//     title: "Iphone6",
//     price: 200,
//   },
// }

/**
 * Phase 2: Modern Class Mechanics: Static Property
 *
 * The System Scenario:
 * - You are building an active user monitoring dashboard for a server cluster.
 *  - Every time a new session object is spun up via your class, you must instantly track it.
 *
 * - The Structural Constraint:
 *  - You need a single variable that keeps count of the total number of instances currently alive in memory.
 *  - This count must increase automatically by 1 every single time a session is initialized.
 *
 * - Your Task:
 *  - Write a UserSession class from scratch.
 *   - Define a static property to act as the global tracking counter.
 *   - Structure your constructor so that it assigns a unique instance property (like username) and directly updates that global class counter.
 */

class UserSession {
  static sessionsCount = 0;

  // to access static properties you should use this syntax Class.props
  // to manipulate it use prop++, prop--
  constructor(username, device) {
    this.username = username;
    this.device = device;

    // =========== Wrong =============
    // this.sessionsCount++;

    // =========== Correct ============
    UserSession.sessionsCount++;
  }
}

const s1 = new UserSession("Ahmad", "Windows");
const s2 = new UserSession("Ahmad ", '"Android');

console.log({
  sessionsCount: UserSession.sessionsCount,
});
