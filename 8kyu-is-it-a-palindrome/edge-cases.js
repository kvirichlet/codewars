const { expect } = require('chai');
const testedFunction = require('.');

module.exports = [{
  description: 'should throw an error if no arguments are passed',
  test () {
    expect(testedFunction.bind(null)).to.throw(/^Arguments are undefined$/);
  }
}];
