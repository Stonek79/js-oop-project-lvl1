import ArrayValidator from './src/ArrayValidator.js';
import NumberValidator from './src/NumberValidator.js';
import ObjectValidator from './src/ObjectValidator.js';
import StringValidator from './src/StringValidator.js';

export default class Validator {
  string() {
    this.string = new StringValidator();
    return this.string;
  }

  number() {
    this.number = new NumberValidator();
    return this.number;
  }

  array() {
    this.array = new ArrayValidator();
    return this.array;
  }

  object() {
    this.object = new ObjectValidator();
    return this.object;
  }
}
