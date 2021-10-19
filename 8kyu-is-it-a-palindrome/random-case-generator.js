const faker = require('faker');

module.exports = function (seed) {
  faker.seed(seed);
  const result = faker.datatype.boolean();

  let word = faker.lorem.slug(3).replace(/-/g, '');
  if (result) {
    word = `${word}${word.split('').reverse().join('')}`;
  } else {
    while (word === word.split('').reverse().join('')) {
      word = faker.lorem.slug(3).replace(/-/g, '');
    }
  }
  word = word.split('').map(c => faker.datatype.boolean() ? c.toUpperCase() : c.toLowerCase()).join('');

  return {
    description: `"${word}" word`,
    _arguments: [word],
    result
  };
}
