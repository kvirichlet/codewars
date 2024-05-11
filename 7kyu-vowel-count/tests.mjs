import { describe, it } from 'node:test';
import { strictEqual } from 'node:assert';

import { getCountStringIncludes, getCountReplace, getCountMatch } from './solution.mjs';

const solutions = [{
  title: 'String.prototype.includes solution',
  fun: getCountStringIncludes
}, {
  title: 'String.prototype.replace solution',
  fun: getCountReplace
}, {
  title: 'String.prototype.match solution',
  fun: getCountMatch
}];

const fixedTests = [{
  input: '',
  result: 0
}, {
  input: 'abracadabra',
  result: 5
}, {
  input: 'pear tree',
  result: 4
}, {
  input: 'o a kak ushakov lil vo kashu kakao',
  result: 13
}, {
  input: 'my pyx',
  result: 0
}];

const alphabet = 'abcdefghijklmnopqrstuvwxyz ';
const letters = 'aeiou';
const randomTests = Array.from({ length: 10 }, () => {
  let result = 0;
  let input = '';

  for (let i = 0; i < Math.random() * 100; i++) {
    const char = alphabet[Math.floor(Math.random() * alphabet.length)];
    if (letters.includes(char)) {
      result++;
    }
    input += char;
  }

  return { input, result };
});

describe('[7kyu] Vowel Count', () => {
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
