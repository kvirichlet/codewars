const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ......abcdefghijklmnopqrstuvwxyz';

export function findMissingLetter (letters) {
  const offset = letters[0].charCodeAt(0) - 65;

  for (let i = 1; i < letters.length; i++) {
    if (letters[i] !== alphabet[offset + i]) {
      return alphabet[offset + i];
    }
  }

  throw new Error('There are no missing letters in the input string');
}
