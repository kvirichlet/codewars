function sumOfArithmeticProgression (num, divisor) {
  const occurrences = Math.trunc((num - 1) / divisor);
  return ((occurrences + 1) * divisor) / 2 * occurrences;
}

export function solutionArithmeticProgression (num) {
  if (num < 0) {
    return 0;
  }

  return sumOfArithmeticProgression(num, 3) + sumOfArithmeticProgression(num, 5) - sumOfArithmeticProgression(num, 15);
}

export function solutionLoop (num) {
  let sum = 0;

  for (let i = 0; i < num; i++) {
    if (!(i % 3) || !(i % 5)) {
      sum += i;
    }
  }

  return sum;
}

export const solution = sumOfArithmeticProgression;
