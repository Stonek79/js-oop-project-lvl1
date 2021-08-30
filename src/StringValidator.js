import BaseValidationSchema from './BaseValidationSchema.js';

export default class StringValidator extends BaseValidationSchema {
  contains(str = '') {
    this.validators.contains = (data, arg) => data.includes(arg);
    this.checks.push({ validate: this.validators.contains, args: [str] });
    return this;
  }

  minLength(min = 0) {
    this.validators.minLength = (data, arg) => data.length >= arg;
    this.checks.push({ validate: this.validators.minLength, args: [min] });
    return this;
  }
}
