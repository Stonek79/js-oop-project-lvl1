export default class ObjectValidator {
  shape(obj) {
    this.schema = obj;

    return this;
  }

  isValid(data = []) {
    console.log(data);
    const keys = Object.keys(data);

    const isValid = keys.every((key) => this.schema[key].isValid(data[key]));

    return isValid;
  }
}
