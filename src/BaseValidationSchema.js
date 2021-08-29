import _ from 'lodash';

export default class BaseValidationSchema {
  constructor() {
    this.validators = {};
    this.checks = [];
    this.requiredValue = false;
  }

  required() {
    this.requiredValue = true;
    this.validators.required = this.constructor.obligate();
    this.checks.push({ validate: this.constructor.obligate(), args: [] });
    return this;
  }

  test(name, value = null) {
    const checker = this.validators[name];
    this.checks.push({ validate: checker, args: value });
    return this;
  }

  isValid(data) {
    const isValid = this.checks.every(({ validate, args }) => validate(args)(data));

    return isValid;
  }

  addCustomValidator(name, fn) {
    this.validators[name] = fn;
  }

  static obligate() {
    return () => (data) => !_.isNil(data) && data.length > 0;
  }
}
