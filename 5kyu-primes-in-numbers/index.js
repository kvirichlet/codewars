function primeFactors (n) {
  let result = '';
  for (let i = 2, count = 0; n > 1; i++, count = 0) {
    while (n % i === 0) {
      count++;
      n = n / i;
    }
    if (count === 1) {
      result += `(${i})`;
    } else if (count > 1) {
      result += `(${i}**${count})`;
    }
  }
  return result;
}

module.exports = primeFactors;
