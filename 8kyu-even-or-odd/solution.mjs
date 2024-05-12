export function evenOrOdd (arg) {
  if (typeof arg !== 'number' || !isFinite(arg) || arg % 1) {
    throw new Error('Argument must be an integer');
  }

  return (arg % 2) ? 'Odd' : 'Even';
}
