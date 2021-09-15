import _ from 'lodash';
import BaseValidationSchema from './BaseValidationSchema.js';

export default class NumberValidator extends BaseValidationSchema {
  constructor(customValidators) {
    super(Object.assign(NumberValidator.validators, customValidators));
  }
}

NumberValidator.validators = {
  required: (num) => _.isNumber(num),
  range: (num, min, max) => num >= min && num <= max,
  positive: (num) => num === null || num > 0,
};
