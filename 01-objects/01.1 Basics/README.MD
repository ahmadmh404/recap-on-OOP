# Notes for Module `01-Objects`

## Notes for Sub Module 01.1 Basics

### Javascript

- Literal means that we literally wrote the content of this object!.
- When defining objects methods you **(as far as i know)** should use normal funcion expression or the anonymous expression to be able to access the object when using `this` keyword, e.g.

```javascript
const obj = {
    name: string;

    get: function() {
        return this.name;
    }

    set (value: stirng) {
        this.name = value;
    }
}

```

- You do not have to explicitly pass `this` keyword as an argument when adding a new method to an object, the default behaivour is it can access the existing members normally.

### Typescript

- If you specified a type for the object you can't add new unknown members(which is better in real code to define the members the obj can include then alter it's values them when needed).
- If you add a new member to a typed object, it will cause an type error, but actually when trying to access this property for example `console.log(obj.prop)` this value will be printed out!, so inreal code make sure to add proper validation between the application layers..
