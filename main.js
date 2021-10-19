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
  describe(path.parse(directory).base, () => {
    const testedFunction = require(directory);
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

    describe('Fixed cases:', () => {
      if (fs.existsSync(path.join(directory, config.entryPoints.fixedTestCases))) {
        const fixedTestCases = require(path.join(directory, config.entryPoints.fixedTestCases));
        for (let i = 0; i < fixedTestCases.length; i++) {
          generateTestCase(fixedTestCases[i]);
        }
      }
    });
    describe('Random cases:', () => {
      if (fs.existsSync(path.join(directory, config.entryPoints.testCaseMaker))) {
        const getSettings = require(path.join(directory, config.entryPoints.testCaseMaker));
        for (let i = 0; i < config.randomCasesNumber; i++) {
          generateTestCase(getSettings(seed + i));
        }
      }
    });
    describe('Additional cases:', () => {
      if (fs.existsSync(path.join(directory, config.entryPoints.additionalTestCases))) {
        const additionalCases = require(path.join(directory, config.entryPoints.additionalTestCases));
        for (const { description, test } of additionalCases) {
          it(description, test);
        }
      }
    });
  });
});
