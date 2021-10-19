const path = require('path');
const fs = require('fs');
const { expect } = require('chai');

const code = fs.readFileSync(path.join(__dirname, 'index.js'), 'utf8');

module.exports = [{
  description: 'should return "Hello, world!"',
  test () {
    expect(eval(code)()).to.equal('Hello, world!');
  }
}, {
  description: 'should have a maximum string length of 2 characters',
  test () {
    expect(Math.max(...code.split('\n').map(e => e.length))).to.be.below(3);
  }
}, {
  description: 'should be less than 40 lines',
  test () {
    expect(code.split('\n')).to.have.lengthOf.below(40);
  }
}];
