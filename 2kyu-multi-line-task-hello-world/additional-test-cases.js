const path = require('path');
const fs = require('fs');
const { expect } = require('chai');

const lines = fs.readFileSync(path.join(__dirname, 'index.js'), 'utf8').split('\n');

module.exports = [{
  description: 'should return "Hello, world!"',
  test () {
    expect(eval(`${lines.join('\n')}()`)).to.equal("Hello, world!");
  }
}, {
  description: 'should have a maximum string length of 2 characters',
  test () {
    expect(Math.max(...lines.map(e => e.length))).to.be.below(3);
  }
}, {
  description: 'should be less than 40 lines',
  test () {
    expect(lines).to.have.lengthOf.below(40)
  }
}];
