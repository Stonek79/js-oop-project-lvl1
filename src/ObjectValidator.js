import _ from 'lodash';

import BaseValidationSchema from "./BaseValidationSchema";

export default class ObjectValidator extends BaseValidationSchema {
  constructor(customValidators) {
    super(Object.assign(ObjectValidator.validators, customValidators));
    this.checks = [];
  }

  shape(schemas) {
    const args = [];
    const validate = (data) => {
      args.push(data);

      return Object.keys(data).every((key) => schemas[key].isValid(data[key]));
    };

    this.checks.push({ validate, args });

    return this;
  }
}

ObjectValidator.validators = {
  validate: (arg, fn) => fn(arg),
}
