import BaseValidationSchema from './BaseValidationSchema';

export default class StringValidator extends BaseValidationSchema {
  contains(str = '') {
    this.validators.contains = () => (data) => data.includes(str);
    this.checks.push({ validate: this.validators.contains, args: str });
    return this;
  }

  minLength(min = 0) {
    this.validators.minLength = () => (data) => data.length >= min;
    this.checks.push({ validate: this.validators.minLength, args: min });
    return this;
  }
}
