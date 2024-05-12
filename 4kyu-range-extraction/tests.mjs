import { describe, it } from 'node:test';
import { strictEqual } from 'node:assert';

import { solution } from './solution.mjs';

const fixedTests = [{
  input: [],
  result: ''
}, {
  input: [1],
  result: '1'
}, {
  input: [1, 2],
  result: '1,2'
}, {
  input: [1, 2, 3],
  result: '1-3'
}, {
  input: [-10, -9, -8, -6, -3, -2, -1, 0, 1, 3, 4, 5, 7, 8, 9, 10, 11, 14, 15, 17, 18, 19, 20],
  result: '-10--8,-6,-3-1,3-5,7-11,14,15,17-20'
}];

const randomTests = Array.from({ length: 10 }, () => {
  const input = [];
  const ranges = [];

  let leftBoundary = Math.trunc(Math.random() * 100 - 50);
  for (let i = 0; i < Math.random() * 20; i++) {
    const length = Math.ceil(Math.random() * 5);
    if (length === 1) {
      input.push(leftBoundary);
      ranges.push(leftBoundary);
    } else if (length === 2) {
      input.push(...[leftBoundary, leftBoundary + 1]);
      ranges.push(...[leftBoundary, leftBoundary + 1]);
    } else {
      input.push(...Array.from({ length }, (_, i) => leftBoundary + i));
      ranges.push(`${leftBoundary}-${leftBoundary + length - 1}`);
    }
    leftBoundary += Math.ceil(Math.random() * 5) + 1 + length;
  }

  return {
    input,
    result: ranges.join(',')
  };
});

describe('[4kyu] Range Extraction', () => {
  describe('Fixed tests', () => {
    for (const { input, result } of fixedTests) {
      it(`${JSON.stringify(input)} => ${result}`, () => {
        strictEqual(solution(input), result);
      });
    }
  });

  describe('Random tests', () => {
    for (const { input, result } of randomTests) {
      it(`${JSON.stringify(input)} => ${result}`, () => {
        strictEqual(solution(input), result);
      });
    }
  });
});
