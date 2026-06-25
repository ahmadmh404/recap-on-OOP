# Notes for Module `01-Objects`

## Javascript

- In, Javascript, object are a dynamic collection of properties and methods, the absolute core of understanding them is to understand **Execution Context**., which means, how the keyword `this` changes depending entirely on _how a function is invoked, not where it is written_.

- In Javascript, every object's property is governed by a hidden control object called **Property Descriptor**, and we can manipulate this by the static method **defineProperty**.

- Arrow functions work way more better inside **Higher Order Functions** than regular functions which fail accessing _this_ keyword which must point to the object.

the governor object components:

1. **Value**: the value of this property.
2. **writeable**: if `false`, the value cannot be overwritten.
3. **enumerable**: if `false`, the property is skipped on `ofr... in` loop and `Object.keys`.
4. **configurable**: if `false`, you cannot delete the property or change the descriptor settings.

### Why Arrow functions work inside **higher order functions** but regular functions doesn't ?

At run time regular function get a `this` pointing to the function itself.

In High Order Functions like `forEach`, passing a regular function is ok and it wor.ks in normal cases where we just need to access the item`s value.

But when working inside an object's method and the _callback(regular)_ function wants to access `this` means the object properties like in the example,

in this case we know that regular functions' this keyword point to the function itself.

Also when calling it as an independent function e.g. (callback(value)),

Which in turn, means losing the connection to the `list` leads to losing the connection to the object itself.

It's like assigning the method of an object to a standalone variable and expecting it to work when invoking it.

On the other hand, Arrow function are treated like shallow functions, as the internal JS engine doesn't give them any `this` keyword.

So, when the engine find a `this` keyword inside the arrow function, it looks for the nearest scope that has `this` and uses it.

### Why Using an Array as Object Member (via Prototype) Causes Information to be Shared Between Instances?

When you assign a primitive value (like a number or string) to a prototype, each instance can override it by creating its own local copy.

But when you assign a Reference Type (like an Array or Object) to a prototype, you are allocating exactly one array in memory.

The prototype doesn't store the array's values; it stores a pointer (reference) to that single array.

```js
// Only ONE instance of this prototype object exists in memory
Team.prototype = {
  members: 0x99f72, // <-- A pointer to a single array in heap memory
};

// Instance objects created via 'new'
alpha = { name: "Alpha", __proto__: Team.prototype };
beta = { name: "Beta", __proto__: Team.prototype };
```

#### Trace the Code Execution

1. You run alpha.members.push("Alice").
2. The engine looks at alpha for a property named members. Result: Not found.
3. It moves up to Team.prototype and finds members.
4. It follows the pointer `0x99F72` to the heap memory and pushes "Alice" inside it
5. .Next, you log beta.members.The engine looks at beta for members. Result: Not found.
6. It moves up to Team.prototype, finds the exact same pointer `0x99F72`, and reads the mutated array.

#### How to isolate reference types

To prevent this shared data leak, reference types like arrays and objects must always be initialized inside the constructor function. This ensures that every time new Team() is called, a brand-new, isolated array is allocated in memory for that specific instance.

```js
function Team(name) {
  this.name = name;
  // ✅ Correct Pattern: Isolated memory per instance
  this.members = [];
}

// Prototypes should ONLY be used for sharing static/read-only functions
Team.prototype.addMember = function (memberName) {
  this.members.push(memberName);
};
```

### REASSIGNMENT vs. MUTATION

#### Re-Assignment

```js
obj.prop = { key: value };
```

Using this syntax you cut the link to the prototype property. (because you are assigning a the `props` to the instance).

Instead, it creates a brand-new property for this instance of the Constructor, shadowing the prototype, leading to leaving (not corrupting) other instances' data alone.

#### Mutation

```js
obj.prop.key = value;
```

Because the instance itself doesn't contains it'sown `prop` and prototype does, the prototype's `prop` value in the memory location will be replaced with the new value

Which means when changing one instance's `prop` value this will change it's value in all existing instances.
