import _ from 'lodash';
import BaseValidationSchema from './BaseValidationSchema.js';

export default class StringValidator extends BaseValidationSchema {
  constructor(customValidators) {
    super(Object.assign(StringValidator.validators, customValidators));
  }
}

StringValidator.validators = {
  required: (str) => !_.isNil(str) && str.length > 0,
  contains: (str, arg) => str.includes(arg),
  minLength: (str, arg) => str.length >= arg,
};
