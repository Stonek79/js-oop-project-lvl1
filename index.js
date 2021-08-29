import ArrayValidator from './src/ArrayValidator.js';
import NumberValidator from './src/NumberValidator.js';
import ObjectValidator from './src/ObjectValidator.js';
import StringValidator from './src/StringValidator.js';

export default class Validator {
  constructor() {
    this.validator = null;
    this.customValidators = {
      string: [],
      number: [],
      array: [],
    };
  }

  string() {
    this.validator = new StringValidator();
    this.addToCustomValidators(this.string.name, this.validator);
    return this.validator;
  }

  number() {
    this.validator = new NumberValidator();
    this.addToCustomValidators(this.number.name, this.validator);
    return this.validator;
  }

  array() {
    this.validator = new ArrayValidator();
    this.addToCustomValidators(this.array.name, this.validator);
    return this.validator;
  }

  object() {
    this.validator = new ObjectValidator();
    return this.validator;
  }

  addValidator(type, name, fn) {
    return this.customValidators[type].push({ name, fn });
  }

  addToCustomValidators(currentTypeName, currentType) {
    this.customValidators[currentTypeName]
      .forEach(({ name, fn }) => currentType.addCustomValidator(name, fn));
  }
}
