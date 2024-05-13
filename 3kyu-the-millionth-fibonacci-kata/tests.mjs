import { describe, it } from 'node:test';
import { strictEqual } from 'node:assert';

import { fib } from './solution.mjs';

const fixedTests = [{
  input: 0,
  result: 0n
}, {
  input: 1,
  result: 1n
}, {
  input: 2,
  result: 1n
}, {
  input: 3,
  result: 2n
}, {
  input: 4,
  result: 3n
}, {
  input: 5,
  result: 5n
}, {
  input: 6,
  result: 8n
}, {
  input: -1,
  result: 1n
}, {
  input: -2,
  result: -1n
}, {
  input: -20,
  result: -6765n
}, {
  input: -37,
  result: 24157817n
}, {
  input: 1000,
  result: 43466557686937456435688527675040625802564660517371780402481729089536555417949051890403879840079255169295922593080322634775209689623239873322471161642996440906533187938298969649928516003704476137795166849228875n
}, {
  input: -1138,
  result: -3009189947239275089924808958230607572675761566212790786914268736347896207320589531555502858268917025832561467161595187454205192635697341895236139140679821818495083520815038124134006185408551620041705039039183078877778919340462201083299719n
}];

describe('[3kyu] The Millionth Fibonacci Kata', () => {
  describe('Fixed tests', () => {
    for (const { input, result } of fixedTests) {
      it(`${input}`, () => {
        strictEqual(fib(input), result);
      });
    }
  });
});
