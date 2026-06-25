/**
 * Phase 3: Encapsulation
 */

/**
 * Private Fields
 *
 * The Scenario:
 *  You are building a secure medical record system. You need a PatientRecord class.
 *
 *  - Every record has a public patientName.
 *  - Every record has a strictly private #socialSecurityNumber (SSN)
 *       that cannot be read or modified directly from outside the class block.
 *  - The Constraint: You must provide a Getter method to read a masked version of the SSN
 *       (e.g., if the SSN is "123-456", it should return "***-456").
 *  - The Constraint: You must provide a Setter method that allows updating the private SSN,
 *       but it must reject any string that doesn't contain a hyphen (-).
 */

// when setting, getting or accessing the private prop we should use #prop not prop
class PatientRecord {
  #socialSecurityNumber = null;

  constructor(patientName) {
    this.patientName = patientName;
  }

  get socialSecurityNumber() {
    if (!this.#socialSecurityNumber) {
      throw new Error("Undefined");
    }

    const SSNPieces = this.#socialSecurityNumber.split("-");
    if (SSNPieces.length < 2) {
      throw new Error("Something Went Wrong");
    }

    // create the mask for the first 1 from it's length
    const mask = Array.from({ length: SSNPieces[0].length }).fill("*");

    return `${mask.join("")}-${SSNPieces[1]}`;
  }

  set socialSecurityNumber(value) {
    if (!value.includes("-")) {
      throw new Error("Invalid SSN");
    }

    this.#socialSecurityNumber = value;
    console.log(this.#socialSecurityNumber);
  }
}

const p1 = new PatientRecord("Ahmad");

p1.socialSecurityNumber = "000-000";

console.log({
  private: p1.#socialSecurityNumber,
});

console.log({
  ssn: p1.socialSecurityNumber,
});
