import BaseValidationSchema from './BaseValidationSchema';

export default class ArrayValidator extends BaseValidationSchema {
  sizeof(size) {
    this.validators.sizeof = () => (data) => data.length >= size;
    this.checks.push({ validate: this.validators.sizeof, args: size });
    return this;
  }

  isValid(data) {
    if (data === null) { return false; }
    const isValid = this.checks.every(({ validate, args }) => validate(args)(data));

    return isValid;
  }

  static obligate() {
    return () => (data) => Array.isArray(data);
  }
}
