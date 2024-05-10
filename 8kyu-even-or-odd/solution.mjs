export function evenOrOdd (arg) {
  if (typeof arg !== 'number' || !isFinite(arg) || arg % 1) {
    throw new Error('Argument should be an integer number');
  }

  return (arg % 2) ? 'Odd' : 'Even';
}
