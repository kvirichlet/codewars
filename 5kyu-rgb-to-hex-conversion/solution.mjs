export function rgb (...args) {
  if (args.length !== 3) {
    throw new Error(`Invalid arguments number: expected 3, got ${args.length}`);
  }

  if (args.some(arg => isNaN(arg))) {
    throw new Error(`Arguments must be convertible to a number, got ${args.join(',')} instead`);
  }

  return args
    .map(arg => {
      const n = Number(arg);
      if (n < 0) { return '00'; }
      if (n > 255) { return 'FF'; }
      return n.toString(16).padStart(2, '0');
    })
    .join('')
    .toUpperCase();
}
