import ArrayValidator from './src/ArrayValidator.js';
import NumberValidator from './src/NumberValidator.js';
import ObjectValidator from './src/ObjectValidator.js';
import StringValidator from './src/StringValidator.js';

export default class Validator {
  constructor() {
    this.currentValidator = null;
    this.customValidators = {
      string: [],
      number: [],
      array: [],
    };
  }

  string() {
    this.currentValidator = new StringValidator();
    this.addToCustomValidators(this.string.name, this.currentValidator);
    return this.currentValidator;
  }

  number() {
    this.currentValidator = new NumberValidator();
    this.addToCustomValidators(this.number.name, this.currentValidator);
    return this.currentValidator;
  }

  array() {
    this.currentValidator = new ArrayValidator();
    this.addToCustomValidators(this.array.name, this.currentValidator);
    return this.currentValidator;
  }

  object() {
    this.currentValidator = new ObjectValidator();
    return this.currentValidator;
  }

  addValidator(type, name, fn) {
    return this.customValidators[type].push({ name, fn });
  }

  addToCustomValidators(currentTypeName, currentType) {
    this.customValidators[currentTypeName]
      .forEach(({ name, fn }) => currentType.addCustomValidator(name, fn));
  }
}
