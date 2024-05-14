import { describe, it } from 'node:test';
import { strictEqual } from 'node:assert';

import { highAndLow } from './solution.mjs';

const fixedTests = [{
  input: '5',
  result: '5 5'
}, {
  input: '1 1',
  result: '1 1'
}, {
  input: '-1 1',
  result: '1 -1'
}, {
  input: '1 0 1',
  result: '1 0'
}, {
  input: '0 -1 1',
  result: '1 -1'
}, {
  input: '4 5 29 54 4 0 -214 542 -64 1 -3 6 -6',
  result: '542 -214'
}];

const randomTests = Array.from({ length: 10 }, () => {
  const length = Math.trunc(Math.random() * 10);
  const numbers = [Math.trunc(Math.random() * 1000 - 500)];
  for (let i = 0; i < length; i++) {
    numbers.push(numbers[numbers.length - 1] + Math.trunc(Math.random() * 100));
  }
  const max = numbers[numbers.length - 1];
  const min = numbers[0];

  return {
    input: numbers.sort(() => Math.random() - 0.5).join(' '),
    result: `${max} ${min}`
  };
});

describe('[7kyu] Highest and Lowest', () => {
  describe('Fixed tests', () => {
    for (const { input, result } of fixedTests) {
      it(`${input} => ${result}`, () => {
        strictEqual(highAndLow(input), result);
      });
    }
  });

  describe('Random tests', () => {
    for (const { input, result } of randomTests) {
      it(`${input} => ${result}`, () => {
        strictEqual(highAndLow(input), result);
      });
    }
  });
});
