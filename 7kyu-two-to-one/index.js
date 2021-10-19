function longest (s1, s2) {
  const letters = {};
  [s1, s2].forEach(s => {
    for (const char of s.toLowerCase()) {
      if (!letters[char]) {
        letters[char] = true;
      }
    }
  });
  return Object.keys(letters).sort().join('');
}

module.exports = longest;
