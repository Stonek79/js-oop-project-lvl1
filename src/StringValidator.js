import _ from 'lodash';

const required = () => (data) => !_.isNil(data) && data.length > 0;
const contains = (str) => (data) => data.includes(str);
const minLength = (min) => (data) => data.length >= min;

export default class StringValidator {
  constructor() {
    this.validators = {
      required, contains, minLength,
    };
    this.checks = [];
    this.requiredValue = false;
  }

  required() {
    this.requiredValue = true;
    this.checks.push({ validate: required, args: [] });
    return this;
  }

  contains(str = '') {
    this.checks.push({ validate: contains, args: str });
    return this;
  }

  minLength(min = 0) {
    this.checks.push({ validate: minLength, args: min });
    return this;
  }

  isValid(data) {
    const isValid = this.checks.every(({ validate, args }) => validate(args)(data));

    return isValid;
  }
}
