export function highAndLow (string) {
  const numbers = string.split(' ');
  return `${Math.max(...numbers)} ${Math.min(...numbers)}`;
}
