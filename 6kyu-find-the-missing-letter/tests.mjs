import { describe, it } from 'node:test';
import { strictEqual, throws } from 'node:assert';

import { findMissingLetter } from './solution.mjs';

const fixedTests = [{
  input: ['a', 'b', 'c', 'd', 'f'],
  result: 'e'
}, {
  input: ['O', 'Q', 'R', 'S'],
  result: 'P'
}];

const randomTests = Array.from({ length: 10 }, () => {
  const alphabet = Math.random() > 0.5 ? 'abcdefghijklmnopqrstuvwxyz' : 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const start = Math.trunc(Math.random() * 24);
  const length = Math.trunc(Math.random() * 5 + 3);
  const input = alphabet.slice(start, start + length).split('');
  const result = input.splice(Math.trunc(Math.random() * (input.length - 2)) + 1, 1)?.[0];

  return { input, result };
});

describe('[6kyu] Find the missing letter', () => {
  describe('Fixed tests', () => {
    it('Function throws an error if there are no missing letters in the input string', () => {
      throws(() => findMissingLetter('defgh'), /^Error: There are no missing letters in the input string$/);
    });
  });

  describe('Fixed tests', () => {
    for (const { input, result } of fixedTests) {
      it(`${input.join(',')} => ${result}`, () => {
        strictEqual(findMissingLetter(input), result);
      });
    }
  });

  describe('Random tests', () => {
    for (const { input, result } of randomTests) {
      it(`${input.join(',')} => ${result}`, () => {
        strictEqual(findMissingLetter(input), result);
      });
    }
  });
});
