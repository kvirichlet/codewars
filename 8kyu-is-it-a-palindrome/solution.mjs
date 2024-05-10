export function isPalindromeReverse (str) {
  if (typeof str !== 'string') {
    return false;
  }

  const lowercased = str.toLowerCase();
  return lowercased.split('').reverse().join('') === lowercased.toLowerCase();
}

export function isPalindromeCharacterComparision (str) {
  if (typeof str !== 'string') {
    return false;
  }

  const strlower = str.toLowerCase();
  for (let i = 0; i < Math.floor(str.length / 2); i++) {
    if (strlower[i] !== strlower[str.length - 1 - i]) {
      return false;
    }
  }

  return true;
}

const chars = new Map();
for (let i = 32; i < 128; i++) {
  const char = String.fromCharCode(i);
  if (char.toLowerCase() !== char.toUpperCase()) {
    chars.set(i, [
      char.toLowerCase().charCodeAt(0),
      char.toUpperCase().charCodeAt(0)
    ]);
  }
}

export function isPalindromeCharcodeComparision (str) {
  if (typeof str !== 'string') {
    return false;
  }

  for (let i = 0; i < Math.floor(str.length / 2); i++) {
    const lCode = str.charCodeAt(i);
    const rCode = str.charCodeAt(str.length - 1 - i);

    if (lCode === rCode) {
      continue;
    }

    if (!chars.has(lCode) || !chars.get(lCode).includes(rCode)) {
      return false;
    }
  }

  return true;
}

export const isPalindrome = isPalindromeCharcodeComparision;
