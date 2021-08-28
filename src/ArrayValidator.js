const required = () => (data) => Array.isArray(data);
const sizeof = (size) => (data) => data.length >= size;

export default class ArrayValidator {
  constructor() {
    this.validators = {
      required, sizeof,
    };
    this.checks = [];
    this.requiredValue = false;
  }

  required() {
    this.requiredValue = true;
    this.checks.push({ validate: required, args: [] });
    return this;
  }

  sizeof(size = Infinity) {
    this.checks.push({ validate: sizeof, args: size });
    return this;
  }

  isValid(data) {
    if (data === null) { return false; }
    const isValid = this.checks.every(({ validate, args }) => validate(args)(data));

    return isValid;
  }
}
