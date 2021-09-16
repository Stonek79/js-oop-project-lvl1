import Validator from '../index.js';

describe('Validators:', () => {
  test('string', () => {
    const v = new Validator();
    const schema = v.string();

    expect(schema.isValid('test data')).toBeTruthy();
    expect(schema.isValid(null)).toBeTruthy();
    expect(schema.isValid('')).toBeTruthy();

    schema.required();
    expect(schema.isValid('data')).toBeTruthy();
    expect(schema.isValid('')).toBeFalsy();
    expect(schema.isValid(null)).toBeFalsy();

    schema.contains('data');
    expect(schema.isValid('this is data')).toBeTruthy();
    expect(schema.isValid('this is false')).toBeFalsy();

    schema.minLength(10);
    expect(schema.isValid('this is data')).toBeTruthy();
    expect(schema.isValid('the data')).toBeFalsy();
  });

  test('number', () => {
    const v = new Validator();
    const schema = v.number();

    expect(schema.isValid(100)).toBeTruthy();
    expect(schema.isValid(null)).toBeTruthy();
    expect(schema.isValid(0)).toBeTruthy();

    schema.required();
    expect(schema.isValid(99)).toBeTruthy();
    expect(schema.isValid(-99)).toBeTruthy();
    expect(schema.isValid()).toBeFalsy();
    expect(schema.isValid(null)).toBeFalsy();

    schema.range(-10, 42);
    expect(schema.isValid(7)).toBeTruthy();
    expect(schema.isValid(-10)).toBeTruthy();
    expect(schema.isValid(-11)).toBeFalsy();
    expect(schema.isValid(66)).toBeFalsy();
  });

  test('number positive', () => {
    const v = new Validator();
    const schema = v.number();

    schema.positive();
    expect(schema.isValid(0)).toBeFalsy();
    expect(schema.isValid(10)).toBeTruthy();
    expect(schema.isValid(-2)).toBeFalsy();
    expect(schema.isValid(null)).toBeTruthy();
  });

  test('array', () => {
    const v = new Validator();
    const schema = v.array();

    expect(schema.isValid([])).toBeTruthy();

    schema.required();
    expect(schema.isValid([])).toBeTruthy();
    expect(schema.isValid([99])).toBeTruthy();
    expect(schema.isValid()).toBeFalsy();
    expect(schema.isValid(null)).toBeFalsy();

    schema.sizeof(3);
    expect(schema.isValid([1, 2, 3, 4, 5])).toBeTruthy();
    expect(schema.isValid(['one', 'two', 3])).toBeTruthy();
    expect(schema.isValid(['one'])).toBeFalsy();
    expect(schema.isValid([])).toBeFalsy();
  });

  test('shape (object)', () => {
    const v = new Validator();
    const schema = v.object();

    expect(schema.isValid()).toBeTruthy();
    expect(schema.isValid(null)).toBeTruthy();

    schema.shape({
      car: v.string().required(),
      year: v.number().required().range(1900, 2021),
      models: v.array().required().sizeof(1),
    });

    expect(schema.isValid({ car: 'dodge', year: 1969, models: ['charger'] })).toBeTruthy();
    expect(schema.isValid({ car: 'mersedes', year: null, models: ['benz'] })).toBeFalsy();
    expect(schema.isValid({ car: 'lada', year: 1999, models: 'granta' })).toBeFalsy();
    expect(schema.isValid({ car: 'telega', year: 1488, models: ['horse', 'donkey'] })).toBeFalsy();
  });

  test('custom validator', () => {
    const v = new Validator();

    const fn1 = (value) => !value.endsWith(' ');
    v.addValidator('string', 'notEndsSpace', fn1);

    const fn2 = (value) => Number.isInteger(value);
    v.addValidator('number', 'isInteger', fn2);

    const fn3 = (value, end) => value.endsWith(end);
    v.addValidator('string', 'endsWith', fn3);

    const schema1 = v.string().test('notEndsSpace');
    expect(schema1.isValid('This is true')).toBeTruthy();
    expect(schema1.isValid('This is false ')).toBeFalsy();
    expect(schema1.isValid('This is false too   ')).toBeFalsy();

    const schema2 = v.number().test('isInteger');
    expect(schema2.isValid(5)).toBeTruthy();
    expect(schema2.isValid(-5)).toBeTruthy();
    expect(schema2.isValid(2.5)).toBeFalsy();
    expect(schema2.isValid(-2.5)).toBeFalsy();

    const schema3 = v.string().test('endsWith', '!');
    expect(schema3.isValid('This is the end!')).toBeTruthy();
    expect(schema3.isValid('This is not the end! ')).toBeFalsy();
    expect(schema3.isValid('This is not the end too')).toBeFalsy();
  });
});
