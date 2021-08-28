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

  test('number', () => {
    const v = new Validator();
    const schema = v.number();

    expect(schema.isValid(100)).toBe(true);
    expect(schema.isValid(null)).toBe(true);
    expect(schema.isValid(0)).toBe(true);

    schema.required();
    expect(schema.isValid(99)).toBe(true);
    expect(schema.isValid(-99)).toBe(true);
    expect(schema.isValid()).toBe(false);
    expect(schema.isValid(null)).toBe(false);

    schema.range(-10, 42);
    expect(schema.isValid(7)).toBe(true);
    expect(schema.isValid(-10)).toBe(true);
    expect(schema.isValid(-11)).toBe(false);
    expect(schema.isValid(66)).toBe(false);

    schema.positive();
    expect(schema.isValid(0)).toBe(true);
    expect(schema.isValid(10)).toBe(true);
    expect(schema.isValid(-2)).toBe(false);
    expect(schema.isValid(66)).toBe(false);
  });
});
