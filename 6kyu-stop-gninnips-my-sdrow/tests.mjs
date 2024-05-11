import { describe, it } from 'node:test';
import { strictEqual } from 'node:assert';

import { spinWords } from './solution.mjs';

const fixedTests = [{
  input: 'Welcome!',
  result: 'emocleW!'
}, {
  input: 'Hey fellow warriors',
  result: 'Hey wollef sroirraw'
}, {
  input: 'This is a test',
  result: 'This is a test'
}, {
  input: 'This is another test',
  result: 'This is rehtona test'
}, {
  input: 'You are almost to the last test',
  result: 'You are tsomla to the last test'
}, {
  input: 'Just kidding there is still one more',
  result: 'Just gniddik ereht is llits one more'
}, {
  input: 'Seriously this is the last one',
  result: 'ylsuoireS this is the last one'
}];

const alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
const randomTests = Array.from({ length: 10 }, () => {
  const words = Array.from(
    { length: Math.ceil(Math.random() * 30) },
    () => Array.from({ length: Math.ceil(Math.random() * 10) }, () => alphabet[Math.floor(Math.random() * alphabet.length)]).join('')
  );

  return {
    input: words.join(' '),
    result: words.map(word => word.length < 5 ? word : word.split('').reverse().join('')).join(' ')
  };
});

describe('[6kyu] Stop gninnipS My sdroW!', () => {
  describe('Fixed tests', () => {
    for (const { input, result } of fixedTests) {
      it(`${input} => ${result}`, () => {
        strictEqual(spinWords(input), result);
      });
    }
  });

  describe('Random tests', () => {
    for (const { input, result } of randomTests) {
      it(`${input} => ${result}`, () => {
        strictEqual(spinWords(input), result);
      });
    }
  });
});
