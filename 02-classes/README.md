# Transitioning from Prototypes to Modern Classes (ES6+)

When ES6 `classes` showed up, it didn't change anything in the javascript engine under the hood or add a native `class` support like **Java**.

Ths ES6 `classes` are `syntactic sugar` over the prototypes.

## Static Factory Method

The Static Factory Method is tied directly and only to the `class` itself not to it's instances.

This method takes the payload(JSON), parse it, validate it then it creates a new Instance of the `class` ad return it.

Usually, The class with this method represents a service, so it's not meant to be called in this way:

```js
const product = new Product(id, title, price);
```

Instead, we call the `Class` itself and chain it with the method to return. e.g.:

```js
const product = Product.fromPayload(id, title, price);
```

## Why Static Prop doesn't reset when creating a new instance of the Class

When `v8` compiles your code, it creates a Block in memory for the class or Constructor Function and because we prefixed sessionsCount with `static`, we are telling the `v8` to link this prop directly to the `User Session` Block.

Now, whenever i create a new instance of the `UserSession`, the constructor adds `1` to that static prop.

So, When using a `stati` keyword we should call it like this inside the constructor.

```javascript
class UserSession {
  static sessionsCount = 0;

  constructor(username) {
    this.username = username;

    // ✅ This way.
    UserSession.sessionsCount++;

    // 🤦‍♀️ Not this way
    this.sessionsCount++;
  }
}
```
