export default class ObjectValidator {
  shape(obj) {
    this.schema = obj;

    return this;
  }

  isValid(data = []) {
    if (!data) return true;
    const keys = Object.keys(data);

    return keys.every((key) => this.schema[key].isValid(data[key]));
  }
}
