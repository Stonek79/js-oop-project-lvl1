import _ from 'lodash';
import BaseValidationSchema from './BaseValidationSchema.js';

export default class NumberValidator extends BaseValidationSchema {
  positive() {
    this.validators.positive = (data) => data === null || data > 0;
    this.checks.push({ validate: this.validators.positive, args: [] });
    return this;
  }

  range(min, max) {
    this.validators.range = (data) => data >= min && data <= max;
    this.checks.push({ validate: this.validators.range, args: [{ min, max }] });
    return this;
  }

  static require() {
    return (data = null) => !_.isNil(data);
  }
}
