export function solution (numbers) {
  let result = String(numbers[0] ?? '');

  for (let i = 1; i < numbers.length; i++) {
    const ante = numbers[i - 2];
    const prev = numbers[i - 1];
    const curr = numbers[i];
    const next = numbers[i + 1];
    const isWithinInterval = prev + 1 === curr && curr === next - 1;
    const isUpperBoundary = ante + 2 === curr && prev + 1 === curr;

    if (isWithinInterval) {
      continue;
    }

    result += isUpperBoundary ? `-${curr}` : `,${curr}`;
  }

  return result;
}
