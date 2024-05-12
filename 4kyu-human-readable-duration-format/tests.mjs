import { describe, it } from 'node:test';
import { strictEqual, throws } from 'node:assert';

import { formatDuration } from './solution.mjs';

const validations = [{
  title: 'float number',
  input: 2.2
}, {
  title: 'negative number',
  input: -2
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
}];

const fixedTests = [{
  input: 0,
  result: 'now'
}, {
  input: 1,
  result: '1 second'
}, {
  input: 62,
  result: '1 minute and 2 seconds'
}, {
  input: 120,
  result: '2 minutes'
}, {
  input: 3660,
  result: '1 hour and 1 minute'
}, {
  input: 31795262,
  result: '1 year, 3 days, 1 minute and 2 seconds'
}];

const periods = [
  { alias: 'year', duration: 60 * 60 * 24 * 365 },
  { alias: 'day', duration: 60 * 60 * 24 },
  { alias: 'hour', duration: 60 * 60 },
  { alias: 'minute', duration: 60 },
  { alias: 'second', duration: 1 }
];
const randomTests = Array.from({ length: 10 }, () => {
  let input = 0;
  const pharases = periods
    .filter(() => Math.random() > 0.5)
    .map(({ alias, duration }) => {
      const number = Math.ceil(Math.random() * 3);
      input += number * duration;
      return `${number} ${alias}${number > 1 ? 's' : ''}`;
    });

  return {
    input,
    result: pharases.length ? pharases.join(', ').replace(/,([^,]+)$/, ' and$1') : 'now'
  };
});

describe('[4kyu] Human readable duration format', () => {
  describe('Input validation', () => {
    for (const { title, input } of validations) {
      it(`Should throw an error if a ${title} is received`, () => {
        throws(() => formatDuration(input), /Argument must be a positive integer/);
      });
    }
  });

  describe('Fixed tests', () => {
    for (const { input, result } of fixedTests) {
      it(`${input} => ${result}`, () => {
        strictEqual(formatDuration(input), result);
      });
    }
  });

  describe('Random tests', () => {
    for (const { input, result } of randomTests) {
      it(`${input} => ${result}`, () => {
        strictEqual(formatDuration(input), result);
      });
    }
  });
});
