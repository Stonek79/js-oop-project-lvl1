import ArrayValidator from './src/ArrayValidator.js';
import NumberValidator from './src/NumberValidator.js';
import ObjectValidator from './src/ObjectValidator.js';
import StringValidator from './src/StringValidator.js';

export default class Validator {
  constructor() {
    this.customValidators = {
      string: {},
      number: {},
      array: {},
      object: {},
    };
  }

  string() {
    return new StringValidator(this.customValidators.string);
  }

  number() {
    return new NumberValidator(this.customValidators.number);
  }

  array() {
    return new ArrayValidator(this.customValidators.array);
  }

  object() {
    return new ObjectValidator(this.customValidators.object);
  }

  addValidator(type, name, fn) {
    this.customValidators[type][name] = fn;
  }
}
