import { describe, it } from 'node:test';
import { strictEqual } from 'node:assert';

import { longestWithStringIncludes, longestWithLetterRegexp, longestWithStringsConcatenationRegexp, longestWithSet } from './solution.mjs';

const solutions = [{
  title: 'String.prototype.includes solution',
  fun: longestWithStringIncludes
}, {
  title: 'Letter regexp solution',
  fun: longestWithLetterRegexp
}, {
  title: 'String concatenation regexp solution',
  fun: longestWithStringsConcatenationRegexp
}, {
  title: 'Set solution',
  fun: longestWithSet
}];

const fixedTests = [{
  input: ['aretheyhere', 'yestheyarehere'],
  result: 'aehrsty'
}, {
  input: ['loopingisfunbutdangerous', 'lessdangerousthancoding'],
  result: 'abcdefghilnoprstu'
}, {
  input: ['inmanylanguages', 'theresapairoffunctions'],
  result: 'acefghilmnoprstuy'
}];

const alphabet = 'abcdefghijklmnopqrstuvwxyz';
const randomTests = Array.from({ length: 10 }, () => {
  const letters = alphabet.split('').filter(() => Math.random() > 0.5);
  const shuffled = letters
    .flatMap(char => char.repeat(Math.ceil(Math.random() * 10)).split(''))
    .sort(() => Math.random() - 0.5)
    .join('');
  const border = Math.round(Math.random() * shuffled.length);

  return {
    input: [shuffled.slice(0, border), shuffled.slice(border)],
    result: letters.join('')
  };
});

describe('[7kyu] Two to One', () => {
  describe('Fixed tests', () => {
    for (const { title, fun } of solutions) {
      describe(title, () => {
        describe('Fixed tests', () => {
          for (const { input, result } of fixedTests) {
            it(`[${input.join(', ')}] => ${result}`, () => {
              strictEqual(fun(...input), result);
            });
          }
        });

        describe('Random tests', () => {
          for (const { input, result } of randomTests) {
            it(`[${input.join(', ')}] => ${result}`, () => {
              strictEqual(fun(...input), result);
            });
          }
        });
      });
    }
  });
});
