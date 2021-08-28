import _ from 'lodash';

const required = () => (data = null) => !_.isNil(data);
const positive = () => (data) => data >= 0;
const range = ({ min, max }) => (data) => {
  if (min === Infinity && max === Infinity) { return true; }
  if (min === Infinity && data <= max) { return true; }
  if (max === Infinity && data >= min) { return true; }
  if (data >= min && data <= max) { return true; }

  return false;
};

export default class NumberValidator {
  constructor() {
    this.validators = {
      required, contains: positive, minLength: range,
    };
    this.checks = [];
    this.requiredValue = false;
  }

  required() {
    this.requiredValue = true;
    this.checks.push({ validate: required, args: [] });
    return this;
  }

  positive() {
    this.checks.push({ validate: positive, args: [] });
    return this;
  }

  range(min = Infinity, max = Infinity) {
    this.checks.push({ validate: range, args: { min, max } });
    return this;
  }

  isValid(data) {
    const validation = this.checks.filter(({ validate, args }) => !validate(args)(data));
    const isValid = !validation.length;

    return isValid;
  }
}
