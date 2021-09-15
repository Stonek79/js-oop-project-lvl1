export default class BaseValidationSchema {
  constructor() {
    this.validators = {};
    this.checks = [];

    Object.entries(this.constructor.validators).forEach(([name, func]) => {
      this.constructor.prototype[name] = (...args) => {
        this.checks.push({ validate: func, args });
        return this;
      };
    });
  }

  test(name, value) {
    const checker = this.constructor.validators[name];
    this.checks.push({ validate: checker, args: [value] });
    return this;
  }

  isValid(data) {
    return this.checks.every(({ validate, args }) => validate(data, ...args));
  }
}
