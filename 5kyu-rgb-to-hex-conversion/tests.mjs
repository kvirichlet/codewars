import { describe, it } from 'node:test';
import { strictEqual, throws } from 'node:assert';

import { rgb } from './solution.mjs';

const fixedTests = [{
  input: [0, 0, 0],
  result: '000000'
}, {
  input: [173, 9, 47],
  result: 'AD092F'
}, {
  input: ['-173', '9', '47'],
  result: '00092F'
}, {
  input: [0, 0, -100],
  result: '000000'
}, {
  input: [255, 255, 300],
  result: 'FFFFFF'
}];

const alphabet = '0123456789ABCDEF';
const randomTests = Array.from({ length: 10 }, () => {
  const input = [];
  let result = '';

  for (let i = 0; i < 3; i++) {
    if (Math.random() < 0.2) {
      const number = Math.ceil(Math.random() * 255);
      if (Math.random() < 0.5) {
        input.push(-number);
        result += '00';
      } else {
        input.push(number + 255);
        result += 'FF';
      }
      continue;
    }

    const number = Array.from({ length: 2 }, () => alphabet[Math.trunc(Math.random() * alphabet.length)]).join('');
    input.push(Number(`0x${number}`));
    result += number;
  }

  return { input, result };
});

describe('[5kyu] RGB To Hex Conversion', () => {
  describe('Input validations', () => {
    it('Should throw an error if received less than 3 arguments', () => {
      throws(() => rgb(0, 0), /^Error: Invalid arguments number: expected 3, got 2$/);
    });

    it('Should throw an error if received more than 3 arguments', () => {
      throws(() => rgb(0, 0, 0, 0), /^Error: Invalid arguments number: expected 3, got 4$/);
    });

    it('Should throw an error if received arguments not convertable to a number', () => {
      throws(() => rgb(0, 0, 'a'), /^Error: Arguments must be convertible to a number, got .* instead$/);
    });
  });

  describe('Fixed tests', () => {
    for (const { input, result } of fixedTests) {
      it(`${JSON.stringify(input)} => ${result}`, () => {
        strictEqual(rgb(...input), result);
      });
    }
  });

  describe('Random tests', () => {
    for (const { input, result } of randomTests) {
      it(`${input} => ${result}`, () => {
        strictEqual(rgb(...input), result);
      });
    }
  });
});
