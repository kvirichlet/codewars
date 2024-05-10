import { describe, it } from 'node:test';
import { strictEqual } from 'node:assert';

import { isPalindromeReverse, isPalindromeCharacterComparision, isPalindromeCharcodeComparision } from './solution.mjs';

const solutions = [{
  title: 'Reverse solution',
  fun: isPalindromeReverse
}, {
  title: 'Character comparision solution',
  fun: isPalindromeCharacterComparision
}, {
  title: 'Charcode comparision solution',
  fun: isPalindromeCharcodeComparision
}];

const fixedTests = [{
  input: '',
  result: true
}, {
  input: 'a',
  result: true
}, {
  input: 'aa',
  result: true
}, {
  input: 'aba',
  result: true
}, {
  input: 'aA',
  result: true
}, {
  input: 'Aba',
  result: true
}, {
  input: 'maDam',
  result: true
}, {
  input: 'aBbA',
  result: true
}, {
  input: 'abab',
  result: false
}, {
  input: false,
  result: false
}, {
  input: 2.2,
  result: false
}, {
  input: undefined,
  result: false
}];

const randomTests = Array.from({ length: 10 }, () => {
  const isPalindrome = Math.random() > 0.5;
  const codes = Array.from(
    { length: Math.ceil(Math.random() * 50 + 2) },
    () => Math.ceil(Math.random() * 94) + 31
  );
  const word = isPalindrome
    ? String.fromCharCode(
      ...codes,
      ...codes.slice(0, Math.random() > 0.5 ? -1 : Infinity).reverse()
    )
    : String.fromCharCode(...codes);

  return {
    input: word.split('').map(char => Math.random() > 0.5 ? char.toUpperCase() : char.toLowerCase()).join(''),
    result: isPalindrome
  };
});

describe('[8kyu] Is it a palindrome?', () => {
  describe('Fixed tests', () => {
    for (const { title, fun } of solutions) {
      describe(title, () => {
        describe('Fixed tests', () => {
          for (const { input, result } of fixedTests) {
            it(`${typeof input} "${input}" => ${result}`, () => {
              strictEqual(fun(input), result);
            });
          }
        });

        describe('Random tests', () => {
          for (const { input, result } of randomTests) {
            it(`"${input}" => ${result}`, () => {
              strictEqual(fun(input), result);
            });
          }
        });
      });
    }
  });
});
