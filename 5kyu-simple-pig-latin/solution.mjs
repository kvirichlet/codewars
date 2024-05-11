export function pigIt (str) {
  return str.replace(/\b(\w)(\w*)\b/g, (word, firestLetter, restStr) => `${restStr}${firestLetter}ay`);
}
