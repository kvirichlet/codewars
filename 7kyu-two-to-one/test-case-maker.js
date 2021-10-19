const faker = require('faker');

const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');

module.exports = function (seed) {
  faker.seed(seed);
  let result = [];

  const [s1, s2] = Array.from({ length: 2 }, () => {
    const availableLetters = faker.random.arrayElements(alphabet, faker.datatype.number({ min: 1, max: alphabet.length }));
    result = result.concat(availableLetters);
    const length = faker.datatype.number({ min: availableLetters.length, max: 1000000 });

    const arr = Array.from({ length }, () => faker.random.arrayElement(availableLetters));
    const indexes = faker.random.arrayElements(Array.from({ length }, (_, i) => i), availableLetters.length);
    for (let i = 0; i < availableLetters.length; i++) {
      arr[indexes[i]] = availableLetters[i];
    }
    return arr.join('');
  });

  return {
    description: `[seed: ${seed}]: s1 (length: ${s1.length}), s2 (length: ${s2.length})`,
    _arguments: [s1, s2],
    result: [...new Set(result)].sort().join('')
  };
};
