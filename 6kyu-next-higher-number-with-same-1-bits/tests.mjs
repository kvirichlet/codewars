import { describe, it } from 'node:test';
import { strictEqual, throws } from 'node:assert';

import { nextHigher } from './solution.mjs';

const fixedTests = [{
  input: 1,
  result: 2
}, {
  input: 128,
  result: 256
}, {
  input: 127,
  result: 191
}, {
  input: 1022,
  result: 1279
}, {
  input: 1253343,
  result: 1253359
}, {
  input: 201326592,
  result: 268435457
}, {
  input: 805306367,
  result: 939524095
}];

const randomTests = Array.from({ length: 10 }, () => {
  let prev = Math.round(Math.random() * Number.MAX_SAFE_INTEGER / 1e5).toString(2);
  let next = prev;

  const zeros = Math.floor(Math.random() * 5);
  const ones = Math.ceil(Math.random() * 5);

  prev += '01' + '1'.repeat(ones) + '0'.repeat(zeros);
  next += '10' + '0'.repeat(zeros) + '1'.repeat(ones);

  return {
    input: parseInt(prev, 2),
    result: parseInt(next, 2)
  };
});

describe('[6kyu] Basics 08: Find next higher number with same Bits (1\'s)', () => {
  describe('Input validations', () => {
    it('Should throw an error if the given argument cannot be converted to a number', () => {
      throws(() => nextHigher({}), /Given argument cannot be converted to a number/);
    });

    it('Should throw an error if the given argument converts to zero', () => {
      throws(() => nextHigher(null), /Argument converts to a value less than or equal to zero/);
    });

    it('Should throw an error if the given argument is converted to a value less than zero', () => {
      throws(() => nextHigher({ valueOf: () => -1 }), /Argument converts to a value less than or equal to zero/);
    });
  });

  describe('Fixed tests', () => {
    for (const { input, result } of fixedTests) {
      it(`${input} => ${result}`, () => {
        strictEqual(nextHigher(input), result);
      });
    }
  });

  describe('Random tests', () => {
    for (const { input, result } of randomTests) {
      it(`${input} => ${result}`, () => {
        strictEqual(nextHigher(input), result);
      });
    }
  });
});
