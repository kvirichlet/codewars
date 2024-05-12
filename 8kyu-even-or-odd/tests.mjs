import { describe, it } from 'node:test';
import { strictEqual, throws } from 'node:assert';

import { evenOrOdd } from './solution.mjs';

const EVENS = [0, 2, 4, 6, 8];
const ODDS = [1, 3, 5, 7, 9];

const validations = [{
  title: 'float number',
  input: 2.2
}, {
  title: 'undefined',
  input: undefined
}, {
  title: 'null',
  input: null
}, {
  title: 'NaN',
  input: NaN
}, {
  title: 'Infinity',
  input: Infinity
}, {
  title: 'string',
  input: 'string'
}, {
  title: 'object',
  input: {}
}, {
  title: 'array',
  input: []
}];

const fixedTests = [{
  input: 2,
  result: 'Even'
}, {
  input: 7,
  result: 'Odd'
}, {
  input: -308,
  result: 'Even'
}, {
  input: -1,
  result: 'Odd'
}, {
  input: 0,
  result: 'Even'
}];

describe('[8kyu] Even or Odd', () => {
  describe('Input validation', () => {
    for (const { title, input } of validations) {
      it(`Should throw an error if a ${title} is received`, () => {
        throws(() => evenOrOdd(input), /Argument must be an integer/);
      });
    }
  });

  describe('Fixed tests', () => {
    for (const { input, result } of fixedTests) {
      it(`${input} => ${result}`, () => {
        strictEqual(evenOrOdd(input), result);
      });
    }
  });

  describe('Random tests', () => {
    for (let i = 0; i < 10; i++) {
      const sign = Math.random() > 0.5 ? '' : '-';
      const isEven = Math.random() > 0.5;
      const lastDigit = (isEven ? EVENS : ODDS)[Math.floor(Math.random() * 5)];
      const input = Number(sign + Math.round(Math.random() * 1e5) + lastDigit);
      const result = isEven ? 'Even' : 'Odd';

      it(`${input} => ${result}`, () => {
        strictEqual(evenOrOdd(input), result);
      });
    }
  });
});
