import BaseValidationSchema from './BaseValidationSchema.js';

export default class ArrayValidator extends BaseValidationSchema {
  constructor(customValidators) {
    super(Object.assign(ArrayValidator.validators, customValidators));
  }
}

ArrayValidator.validators = {
  required: Array.isArray,
  sizeof: (data, size) => data.length >= size,
};
