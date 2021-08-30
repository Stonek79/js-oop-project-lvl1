import BaseValidationSchema from './BaseValidationSchema.js';

export default class ArrayValidator extends BaseValidationSchema {
  sizeof(size) {
    this.validators.sizeof = (data) => data.length >= size;
    this.checks.push({ validate: this.validators.sizeof, args: [size] });
    return this;
  }

  isValid(data) {
    if (data === null) { return false; }
    const isValid = this.checks.every(({ validate, args }) => validate(data, ...args));

    return isValid;
  }

  static require() {
    return (data) => Array.isArray(data);
  }
}
