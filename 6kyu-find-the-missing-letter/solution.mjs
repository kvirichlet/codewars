export function findMissingLetter (letters) {
  const offset = letters[0].charCodeAt(0);

  for (let i = 1; i < letters.length; i++) {
    const letter = String.fromCharCode(offset + i);
    if (letters[i] !== letter) {
      return letter;
    }
  }

  throw new Error('There are no missing letters in the input string');
}
