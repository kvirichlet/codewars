const alphabet = 'abcdefghijklmnopqrstuvwxyz';
const alphabetArray = alphabet.split('');
const alphabetRegexp = [/a/, /b/, /c/, /d/, /e/, /f/, /g/, /h/, /i/, /j/, /k/, /l/, /m/, /n/, /o/, /p/, /q/, /r/, /s/, /t/, /u/, /v/, /w/, /x/, /y/, /z/];

export function longestWithStringIncludes (s1, s2) {
  let result = '';

  for (let i = 0; i < alphabet.length; i++) {
    const char = alphabet[i];
    if (s1.includes(char) || s2.includes(char)) {
      result += char;
    }
  }

  return result;
}

export function longestWithLetterRegexp (s1, s2) {
  let result = '';

  for (let i = 0; i < alphabetRegexp.length; i++) {
    const regexp = alphabetRegexp[i];
    if (regexp.test(s1) || regexp.test(s2)) {
      result += alphabet[i];
    }
  }

  return result;
}

export function longestWithStringsConcatenationRegexp (s1, s2) {
  return alphabet.replace(new RegExp(`[^${s1}${s2}]`, 'g'), '');
}

export function longestWithSet (s1, s2) {
  const set = new Set();

  for (let i = 0; i < s1.length; i++) {
    set.add(s1[i]);
  }

  for (let i = 0; i < s2.length; i++) {
    set.add(s2[i]);
  }

  return alphabetArray.filter(char => set.has(char)).join('');
}

export const longest = longestWithStringIncludes;
