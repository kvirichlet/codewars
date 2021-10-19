require('dotenv').config();
const config = require('config');
const path = require('path');
const fs = require('fs');
const { expect } = require('chai');

const seed = config.seed || Date.now();

fs.readdirSync(__dirname)
  .filter(name => fs.statSync(path.join(__dirname, name)).isDirectory() && /^\dkyu-.+/.test(name))
  .forEach(name => {
    const subpath = path.join(__dirname, name);
    const testedFunction = require(subpath);
    const examples = require(path.join(subpath, 'examples.json'));

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

    describe(path.parse(subpath).base, () => {
      describe('Fixed cases:', () => {
        for (let counter = 0; counter < examples.length; counter++) {
          generateTestCase(examples[counter]);
        }
      });
      describe(`Random cases (seed: ${seed})`, () => {
        if (fs.existsSync(path.join(subpath, 'random-case-generator.js'))) {
          const getSettings = require(path.join(subpath, 'random-case-generator.js'));
            for (let counter = 0; counter < config.randomCasesNumber; counter++) {
              generateTestCase(getSettings(seed + counter));
            }
        }
      });
      describe('Edge cases', () => {
        if (fs.existsSync(path.join(subpath, 'edge-cases.js'))) {
          const edgeCases = require(path.join(subpath, 'edge-cases.js'));
          for (const { description, test } of edgeCases) {
            it(description, test);
          }
        }
      });
    });
  });
