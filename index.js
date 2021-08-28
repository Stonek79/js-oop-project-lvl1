import ArrayValidator from './src/ArrayValidator.js';
import NumberValidator from './src/NumberValidator.js';
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
}
