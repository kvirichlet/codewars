export function sumIntervals (intervals) {
  return intervals
    .sort((p, n) => p[0] - n[0])
    .reduce((acc, next) => {
      const newEnd = Math.max(next[1], acc.end);
      acc.sum += newEnd - Math.max(next[0], acc.end);
      acc.end = newEnd;
      return acc;
    }, { sum: 0, end: -Infinity }).sum;
}
