import { describe, it } from 'node:test';
import { strictEqual } from 'node:assert';

import { checkPipe } from './solution.mjs';

const fixedTests = [{
  title: 'something',
  input: [
    '╋━━┓',
    '┃..┃',
    '┛..┣'
  ],
  result: true
}, {
  title: 'something',
  input: [
    '╋━━┓',
    '┃..┃',
    '┻━━╋'
  ],
  result: true
}, {
  title: 'something',
  input: [
    '.┳..',
    '┏━┓.'
  ],
  result: true
}, {
  title: 'something',
  input: [
    '┳',
    '━'
  ],
  result: false
}, {
  title: 'something',
  input: [
    '╋┻┛┗╋┣'
  ],
  result: false
}, {
  title: 'something',
  input: [
    '...┏',
    '┃..┃',
    '┛..┣'
  ],
  result: false
}, {
  title: 'something',
  input: [
    '...┏',
    '...┃',
    '┛..┣'
  ],
  result: false
}, {
  title: 'something',
  input: [
    '...┏',
    '...┃',
    '┓..┣'
  ],
  result: true
}, {
  title: 'something',
  input: [
    '╋',
    '╋',
    '╋'
  ],
  result: true
}, {
  title: 'something',
  input: [
    '╋....',
    '┃..┛.',
    '┃....'
  ],
  result: false
}, {
  title: 'something',
  input: [
    '....',
    '.┛┛.',
    '....'
  ],
  result: true
}, {
  title: 'something',
  input: [
    '┏',
    '━'
  ],
  result: false
}, {
  title: 'something',
  input: [
    '..┣┓....',
    '..┣┫....',
    '┓.┣┫.┻..',
    '┫.┃┗┓...',
    '┫.┃.┃...',
    '┫.┃.┗┓┏┓',
    '┫.┃..┗┛┣',
    '┫.┃.━..┣',
    '┣┳┫....┗'
  ],
  result: true
}];

describe('[3kyu] Battleship field validator', () => {
  describe('Fixed tests', () => {
    for (const { title, input, result } of fixedTests) {
      it(title, () => {
        strictEqual(checkPipe(input), result);
      });
    }
  });
});
