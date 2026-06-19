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
