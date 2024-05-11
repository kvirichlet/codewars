import { describe, it } from 'node:test';
import { deepEqual } from 'node:assert';

import { moveZerosTwoPointers, moveZerosFilter, moveZerosAccumulator } from './solution.mjs';

const solutions = [{
  title: 'Two pointers solution',
  fun: moveZerosTwoPointers
}, {
  title: 'Array filter solution',
  fun: moveZerosFilter
}, {
  title: 'Array accumulator solution',
  fun: moveZerosAccumulator
}];

const fixedTests = [{
  input: [1, 2, 0, 1, 0, 1, 0, 3, 0, 1],
  result: [1, 2, 1, 1, 3, 1, 0, 0, 0, 0]
}, {
  input: [9, 0, 0, 9, 1, 2, 0, 1, 0, 1, 0, 3, 0, 1, 9, 0, 0, 0, 0, 9],
  result: [9, 9, 1, 2, 1, 1, 3, 1, 9, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
}, {
  input: ['a', 0, 0, 'b', 'c', 'd', 0, 1, 0, 1, 0, 3, 0, 1, 9, 0, 0, 0, 0, 9],
  result: ['a', 'b', 'c', 'd', 1, 1, 3, 1, 9, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
}, {
  input: ['a', 0, 0, 'b', null, 'c', 'd', 0, 1, false, 0, 1, 0, 3, [], 0, 1, 9, 0, 0, {}, 0, 0, 9],
  result: ['a', 'b', null, 'c', 'd', 1, false, 1, 3, [], 1, 9, {}, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
}, {
  input: [0, 1, null, 2, false, 1, 0],
  result: [1, null, 2, false, 1, 0, 0]
}];

const randomTests = Array.from({ length: 10 }, () => {
  const input = [];
  const result = [];
  let zeros = 0;

  for (let i = 0; i < 20; i++) {
    if (Math.random() > 0.8) {
      zeros++;
      input.push(0);
    } else {
      const entity = [
        () => undefined,
        () => null,
        () => NaN,
        () => Math.random() > 0.5 ? Infinity : -Infinity,
        () => (Math.random() * 1000),
        () => Math.trunc(Math.random() * 100),
        () => ({}),
        () => [],
        () => Math.random() > 0.5,
        () => new Date()
      ][Math.floor(Math.random() * 10)]();
      input.push(entity);
      result.push(entity);
    }
  }

  for (let i = 0; i < zeros; i++) {
    result.push(0);
  }

  return {
    input,
    result
  };
});

describe('[5kyu] Moving Zeros To The End', () => {
  for (const { title, fun } of solutions) {
    describe(title, () => {
      describe('Fixed tests', () => {
        for (const { input, result } of fixedTests) {
          it(`${JSON.stringify(input)} => ${JSON.stringify(result)}`, () => {
            deepEqual(fun(input), result);
          });
        }
      });

      describe('Random tests', () => {
        for (const { input, result } of randomTests) {
          it(`${JSON.stringify(input)} => ${JSON.stringify(result)}`, () => {
            deepEqual(fun(input), result);
          });
        }
      });
    });
  }
});
