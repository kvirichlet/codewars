import { describe, it } from 'node:test';
import { deepEqual, strictEqual } from 'node:assert';

import { square_sums_row } from './solution.mjs'; // eslint-disable-line camelcase

describe('[1kyu] Square sums', () => {
  describe('Fixed tests', () => {
    it('Should work for each number [1 ... 1300]', () => {
      for (let n = 1; n < 1301; n++) {
        const result = square_sums_row(n);
        if ((n > 1 && n < 15) || (n > 17 && n < 23) || n === 24) {
          strictEqual(result, false);
        } else {
          const actual = result.toSorted((p, n) => p - n);
          const expected = Array.from({ length: n }, (_, i) => i + 1);
          deepEqual(actual, expected);
          for (let i = 1; i < n; ++i) {
            const sum = result[i - 1] + result[i];
            strictEqual(Math.sqrt(sum) % 1, 0);
          }
        }
      }
    });
  });
});
