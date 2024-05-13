import { describe, it } from 'node:test';
import { deepEqual } from 'node:assert';

import { simple_assembler } from './solution.mjs'; // eslint-disable-line camelcase

const fixedTests = [{
  input: ['mov c -1', 'mov a 5', 'inc a', 'dec a', 'dec a', 'jnz a c', 'inc a'],
  result: { a: 1, c: -1 }
}, {
  input: ['mov a -10', 'mov b a', 'inc a', 'dec b', 'jnz a -2'],
  result: { a: 0, b: -20 }
}, {
  input: ['mov a 1', 'mov b 1', 'mov c 0', 'mov d 16', 'jnz c 2', 'jnz 1 5', 'mov c 7', 'inc d', 'dec c', 'jnz c -2', 'mov c a', 'inc a', 'dec b', 'jnz b -2', 'mov b c', 'dec d', 'jnz d -6', 'mov c 18', 'mov d 11', 'inc a', 'dec d', 'jnz d -2', 'dec c', 'jnz c -5'],
  result: { a: 2782, b: 1597, c: 0, d: 0 }
}, {
  input: ['mov d 100', 'dec d', 'mov b d', 'jnz b -2', 'inc d', 'mov a d', 'jnz 5 10', 'mov c a'],
  result: { a: 1, b: 0, d: 1 }
}, {
  input: ['mov c 12', 'mov b 0', 'mov a 5', 'dec a', 'inc b', 'jnz a -2', 'dec c', 'mov a b', 'jnz c -5', 'jnz 0 1', 'mov c a'],
  result: { a: 10240, b: 10240, c: 10240 }
}];

describe('[5kyu] Simple assembler interpreter', () => {
  describe('Fixed tests', () => {
    for (const { input, result } of fixedTests) {
      it(`${JSON.stringify(input)} => ${JSON.stringify(result)}`, () => {
        deepEqual(simple_assembler(input), result);
      });
    }
  });
});
