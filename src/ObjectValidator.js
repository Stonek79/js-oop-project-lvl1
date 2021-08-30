export default class ObjectValidator {
  constructor() {
    this.schema = {};
  }

  shape(obj) {
    this.schema = obj;

    return this.schema;
  }

  isValid(data) {
    const keys = Object.keys(data);

    const isValid = keys.every((key) => this.schema[key].isValid(data[key]));

    return isValid;
  }
}
