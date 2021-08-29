import Validator from '../index.js';

describe('Validators', () => {
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

  test('array', () => {
    const v = new Validator();
    const schema = v.array();

    expect(schema.isValid([])).toBe(true);
    expect(schema.isValid(null)).toBe(false);

    schema.required();
    expect(schema.isValid([])).toBe(true);
    expect(schema.isValid([99])).toBe(true);
    expect(schema.isValid()).toBe(false);
    expect(schema.isValid(null)).toBe(false);

    schema.sizeof(3);
    expect(schema.isValid([1, 2, 3, 4, 5])).toBe(true);
    expect(schema.isValid(['one', 'two', 3])).toBe(true);
    expect(schema.isValid(['one'])).toBe(false);
    expect(schema.isValid([])).toBe(false);
  });

  test('shape', () => {
    const v = new Validator();
    const schema = v.object();

    schema.shape({
      car: v.string().required(),
      year: v.number().required().range(1900, 2021),
      models: v.array().required().sizeof(1),
    });

    expect(schema.isValid({ car: 'dodge', year: 1969, models: ['charger'] })).toBe(true);
    expect(schema.isValid({ car: 'mersedes', year: null, models: ['benz'] })).toBe(false);
    expect(schema.isValid({ car: 'lada', year: 1999, models: [] })).toBe(false);
    expect(schema.isValid({ car: 'telega', year: 1488, models: ['horse', 'donkey'] })).toBe(false);
  });

  test('custom validator', () => {
    const v = new Validator();

    const fn1 = () => (value) => !value.endsWith(' ');
    v.addValidator('string', 'notEndsSpace', fn1);

    const fn2 = () => (value) => Number.isInteger(value);
    v.addValidator('number', 'isInteger', fn2);

    const fn3 = (end) => (value) => value.endsWith(end);
    v.addValidator('string', 'endsWith', fn3);

    const schema1 = v.string().test('notEndsSpace');
    expect(schema1.isValid('This is true')).toBe(true);
    expect(schema1.isValid('This is false ')).toBe(false);
    expect(schema1.isValid('This is false too   ')).toBe(false);

    const schema2 = v.number().test('isInteger');
    expect(schema2.isValid(5)).toBe(true);
    expect(schema2.isValid(-5)).toBe(true);
    expect(schema2.isValid(2.5)).toBe(false);
    expect(schema2.isValid(-2.5)).toBe(false);

    const schema3 = v.string().test('endsWith', '!');
    expect(schema3.isValid('This is the end!')).toBe(true);
    expect(schema3.isValid('This is not the end! ')).toBe(false);
    expect(schema3.isValid('This is not the end too')).toBe(false);
  });
});
