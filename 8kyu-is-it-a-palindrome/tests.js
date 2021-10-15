const path = require('path');
const { expect } = require('chai');

const examples = require('./examples.json');
const testedFunction = require('.');

describe(path.parse(__dirname).base, () => {
  examples.forEach(({ argument, result }) => {
    it(`"${argument}"`, () => {
      expect(testedFunction(argument)).to.equal(result);
    });
  });
});
