import { describe, it } from 'node:test';
import { strictEqual } from 'node:assert';

import { solution } from './solution.mjs';

const randomTests = Array.from({ length: 100 }, () => {
  const result = Math.random() > 0.5;
  const input = Math.trunc(Math.random() * 1e6) * 7 + (result ? 0 : Math.ceil(Math.random() * 6));

  return { input, result };
});

describe('[2kyu] Regular Expression - Check if divisible by 0b111 (7)', () => {
  describe('Fixed tests', () => {
    it('Should reject an empty string', () => {
      strictEqual(solution.test(''), false);
    });

    it('Should allow 0', () => {
      strictEqual(solution.test('0'), true);
    });

    for (let hundred = 0; hundred < 10; hundred++) {
      it(`Should return correct result for numbers in the [${hundred * 100 + 1}, ${(hundred + 1) * 100}] range`, () => {
        for (let i = 1; i <= 100; i++) {
          const num = hundred * 100 + i;
          strictEqual(solution.test(num.toString(2)), num % 7 === 0);
        }
      });
    }
  });

  describe('Random tests', () => {
    for (const { input, result } of randomTests) {
      it(`${input} ${result ? 'is' : 'is not'} divisible by 7`, () => {
        strictEqual(solution.test(input.toString(2)), result);
      });
    }
  });
});
