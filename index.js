import StringValidator from './src/StringValidator.js';

export default class Validator {
  string() {
    this.string = new StringValidator();
    return this.string;
  }
}
