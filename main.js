require('dotenv').config();
const config = require('config');
const path = require('path');
const fs = require('fs');
const { expect } = require('chai');

const seed = config.seed || Date.now();

const directories = fs.readdirSync(__dirname)
  .filter(name => fs.statSync(path.join(__dirname, name)).isDirectory() && /^\dkyu-.+/.test(name))
  .map(name => path.join(__dirname, name));

directories.forEach(directory => {
  const testedFunction = require(directory);
  const fixedTestCases = require(path.join(directory, config.entryPoints.fixedTestCases));

  const generateTestCase = (() => {
    let counter = 0;
    return settings => {
      const { description = `case ${counter++}`, _arguments, result } = settings;
      it(description, () => {
        expect(_arguments).to.be.an('array');
        expect(testedFunction(..._arguments)).to.equal(result);
      });
    };
  })();

  describe(path.parse(directory).base, () => {
    describe('Fixed cases:', () => {
      for (let counter = 0; counter < fixedTestCases.length; counter++) {
        generateTestCase(fixedTestCases[counter]);
      }
    });
    describe('Random cases', () => {
      if (fs.existsSync(path.join(directory, config.entryPoints.testCaseMaker))) {
        const getSettings = require(path.join(directory, config.entryPoints.testCaseMaker));
          for (let counter = 0; counter < config.randomCasesNumber; counter++) {
            generateTestCase(getSettings(seed + counter));
          }
      }
    });
    describe('Additional cases', () => {
      if (fs.existsSync(path.join(directory, config.entryPoints.additionalTestCases))) {
        const edgeCases = require(path.join(directory, config.entryPoints.additionalTestCases));
        for (const { description, test } of edgeCases) {
          it(description, test);
        }
      }
    });
  });
})
