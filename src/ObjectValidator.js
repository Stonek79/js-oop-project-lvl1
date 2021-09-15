export default class ObjectValidator {
  shape(obj) {
    this.schema = obj;

    return this;
  }

  isValid(data = []) {
    const keys = Object.keys(data);

    return keys.every((key) => this.schema[key].isValid(data[key]));
  }
}
