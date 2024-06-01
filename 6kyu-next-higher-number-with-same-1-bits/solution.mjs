export function nextHigher (arg) {
  if (isNaN(arg)) throw new Error('Given argument cannot be converted to a number');
  if (arg <= 0) throw new Error('Argument converts to a value less than or equal to zero');

  return parseInt(Number(arg).toString(2).replace(/0?1(1*)(0*)$/, '10$2$1'), 2);
}
