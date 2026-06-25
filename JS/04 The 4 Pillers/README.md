# Inheritance

In production application, we use _Inheritance_ to share broad foundational behaviors with more specialized classes using the _extends_ keyword.

## Assigning a property to child class before calling _super()_

this will throw a _ReferenceError_ for two base reasons:

1. Object memory allocation.
2. safety state.

**The core Reason:**

When a child class `extends` a parent class using the _extends_ keyword, the child class isn't now the responsible for creating it's objects and allocating it in the memory .

the `super()` keyword initiates the child object by allocating it, assigning it's default properties and methods. After that, it hand it over tot hte child class to add the _toppings_

If You try to assign the _toppings_ inside the child class constructor before calling the `super()`, it's like assigning a property to an undefined.
