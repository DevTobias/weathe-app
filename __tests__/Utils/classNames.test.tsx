import classNames from '@Utils/classNames';

it('should combine the class names', () => {
  expect(classNames('a', 'bc', 'd')).toEqual('a bc d');
});

it('should ignore booleans in result', () => {
  expect(classNames(true, 'a', 'bc', false, 'd')).toEqual('a bc d');
});

it('should work conditionally with the && trick', () => {
  expect(classNames(6 > 5 && 'a', 'bc', 5 > 6 && 'd')).toEqual('a bc');
});

it('should return empty string if null was provided', () => {
  expect(classNames()).toEqual('');
});

it('should return empty string if no arguments were provided', () => {
  expect(classNames()).toEqual('');
});
