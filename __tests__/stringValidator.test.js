import { expect } from '@jest/globals';
import Validator from '../index.js';

describe('Validator', () => {
  test('string', () => {
    const v = new Validator();
    const schema = v.string();

    expect(schema.isValid('test data')).toBe(true);
    expect(schema.isValid(null)).toBe(true);
    expect(schema.isValid('')).toBe(true);

    schema.required();
    expect(schema.isValid('data')).toBe(true);
    expect(schema.isValid('')).toBe(false);
    expect(schema.isValid(null)).toBe(false);

    schema.contains('data');
    expect(schema.isValid('this is data')).toBe(true);
    expect(schema.isValid('this is false')).toBe(false);

    schema.minLength(10);
    expect(schema.isValid('this is data')).toBe(true);
    expect(schema.isValid('the data')).toBe(false);
  });
});
