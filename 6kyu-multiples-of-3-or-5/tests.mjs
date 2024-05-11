import { describe, it } from 'node:test';
import { strictEqual } from 'node:assert';

import { solutionArithmeticProgression, solutionLoop } from './solution.mjs';

const solutions = [{
  title: 'Arithmetic progression solution',
  fun: solutionArithmeticProgression
}, {
  title: 'Loop solution',
  fun: solutionLoop
}];

const fixedTests = [{
  input: 10,
  result: 23
}, {
  input: 200,
  result: 9168
}, {
  input: -1,
  result: 0
}, {
  input: -82,
  result: 0
}, {
  input: 0,
  result: 0
}, {
  input: 1,
  result: 0
}, {
  input: 2,
  result: 0
}, {
  input: 3,
  result: 0
}, {
  input: 4,
  result: 3
}, {
  input: 5,
  result: 3
}, {
  input: 6,
  result: 8
}];

const randomTests = Array.from({ length: 10 }, () => {
  let result = 0;
  let multipleOf3 = 0;
  let multipleOf5 = 0;
  for (let i = 0; i < Math.random() * 10000; i++) {
    if (multipleOf3 === multipleOf5) {
      multipleOf3 += 3;
      multipleOf5 += 5;
    } else if (multipleOf3 > multipleOf5) {
      multipleOf5 += 5;
    } else {
      multipleOf3 += 3;
    }
    result += Math.min(multipleOf3, multipleOf5);
  }

  return {
    input: Math.min(multipleOf3, multipleOf5) + 1,
    result
  };
});

describe('[6kyu] Multiples of 3 or 5', () => {
  for (const { title, fun } of solutions) {
    describe(title, () => {
      describe('Fixed tests', () => {
        for (const { input, result } of fixedTests) {
          it(`${input} => ${result}`, () => {
            strictEqual(fun(input), result);
          });
        }
      });

      describe('Random tests', () => {
        for (const { input, result } of randomTests) {
          it(`${input} => ${result}`, () => {
            strictEqual(fun(input), result);
          });
        }
      });
    });
  }
});
