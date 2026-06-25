# 03: Encapsulation

## Private Fields

Private Fields prefixed with `#` aren't accessible outside the class's scope.

Because, the JS engine _bans_ accessing ot these variables via `.`, `[]` and een string mappers like `map`, `Object.map`, etc...

**Question**: Then how can we access this variable inside hte class's scope?

Javascript Engines has something called **Weak Map** and it's an _engine-level_ **lookup table** that stores the class's private fields.

When trying accessing the private fields inside the class's scope, the engine allows the compiler to resolve the `#` by accessing the **Weak Map** and retrieving the value or setting it.

This script mocks how engine handles private properties inside hte class's scope

```javascript
// This is invisible to your JavaScript code, managed entirely by the engine
const PatientRecord_privateFields = new WeakMap();

class PatientRecord {
  constructor(patientName) {
    this.patientName = patientName;

    // Internally, the engine binds this specific object instance to a hidden lookup table
    PatientRecord_privateFields.set(this, { socialSecurityNumber: null });
  }

  get socialSecurityNumber() {
    // Internal access bypasses standard string keys entirely!
    // It queries the hidden table using the physical 'this' object reference as a security key.
    const internalFields = PatientRecord_privateFields.get(this);
    return internalFields.socialSecurityNumber;
  }
}
```
