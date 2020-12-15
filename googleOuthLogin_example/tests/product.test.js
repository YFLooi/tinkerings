const script = require('../dist/script.js'); 

//Ref for matchers e.g toBe, toContain: https://jestjs.io/docs/en/using-matchers
test('product of 2*3 equals 6', () => {
  expect(script.productTestFunction(2, 3)).toBe(6);
});

test('arrayTest', () => {
  const parameters = ["123", "tester", "https://image", "test@gmail.com"]
  expect(script.arrayTestFunction(parameters)).toContain(
    "0: 123"
  );
  expect(script.arrayTestFunction(parameters)).toEqual(
    [ '0: 123', '1: tester', '2: https://image', '3: test@gmail.com' ]
  );
});