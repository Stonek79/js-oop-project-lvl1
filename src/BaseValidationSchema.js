import _ from 'lodash';

export default class BaseValidationSchema {
  constructor() {
    this.validators = {};
    this.checks = [];
    this.requiredValue = false;
  }

  required() {
    this.requiredValue = true;
    this.validators.required = this.constructor.require;
    this.checks.push({ validate: this.constructor.require(), args: [] });
    return this;
  }

  test(name, value = null) {
    const checker = this.validators[name];
    this.checks.push({ validate: checker, args: [value] });
    return this;
  }

  isValid(data) {
    const isValid = this.checks.every(({ validate, args }) => validate(data, ...args));

    return isValid;
  }

  addCustomValidator(name, fn) {
    this.validators[name] = fn;
  }

  static require() {
    return (data) => !_.isNil(data) && data.length > 0;
  }
}
