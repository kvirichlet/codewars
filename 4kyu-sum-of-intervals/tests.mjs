import { describe, it } from 'node:test';
import { strictEqual } from 'node:assert';

import { sumIntervals } from './solution.mjs';

const fixedTests = [{
  input: [[1, 5]],
  result: 4
}, {
  input: [[1, 5], [6, 10]],
  result: 8
}, {
  input: [[1, 5], [1, 5]],
  result: 4
}, {
  input: [[1, 4], [7, 10], [3, 5]],
  result: 7
}, {
  input: [[-1e9, 1e9]],
  result: 2e9
}, {
  input: [[0, 20], [-1e8, 10], [30, 40]],
  result: 1e8 + 30
}];

const randomTests = Array.from({ length: 10 }, () => {
  let input = [];
  let result = 0;

  const start = Math.round(Math.random() * 2e3) - 1e3;
  const end = start + Math.ceil(Math.random() * 100);
  input.push([start, end]);
  result += end - start;

  const length = Math.trunc(Math.random() * 10);
  for (let i = 0; i < length; i++) {
    const prev = input[i];
    const gap = Math.round(Math.random() * 1e3);
    const next = [prev[1] + gap, prev[1] + gap + Math.ceil(Math.random() * 1e4)];
    input.push(next);
    result += next[1] - next[0];
  }

  input = input.flatMap(([start, end]) => {
    if (end - start < 3 || Math.random() > 0.5) {
      return [[start, end]];
    }

    const middle = Math.round((end - start) / 2);
    const f = [start, start + middle];
    const s = [start + middle, end];
    if (Math.random() > 0.3) {
      const fdelta = Math.round((Math.random() * (s[1] - s[0])));
      const sdelta = Math.round((Math.random() * (f[1] - f[0])));
      f[1] += fdelta;
      s[0] -= sdelta;
    }

    return [f, s];
  });

  input.sort(() => Math.random() > 0.5);

  return { input, result };
});

describe('[4kyu] Sum of Intervals', () => {
  describe('Fixed tests', () => {
    for (const { input, result } of fixedTests) {
      it(`${JSON.stringify(input)} => ${result}`, () => {
        strictEqual(sumIntervals(input), result);
      });
    }
  });

  describe('Random tests', () => {
    for (const { input, result } of randomTests) {
      it(`${JSON.stringify(input)} => ${result}`, () => {
        strictEqual(sumIntervals(input), result);
      });
    }
  });
});
