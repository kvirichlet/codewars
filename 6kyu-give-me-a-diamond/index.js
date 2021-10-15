function diamond (size) {
  if (size % 2 === 0 || size < 0) {
    return null;
  }
  return [...Array(size)].reduce((result, _, i) => {
    return result
      + ' '.repeat(Math.abs((size - 1) / 2 - i))
      + '*'.repeat(i > size / 2 ? (size - i) * 2 - 1 : i * 2 + 1)
      + '\n';
  }, '');
}

module.exports = diamond;
