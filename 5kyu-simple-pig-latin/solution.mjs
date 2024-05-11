export function pigIt (str) {
  return str.replace(/\b(\w)(\w*)\b/g, (word, firstLetter, restStr) => `${restStr}${firstLetter}ay`);
}
