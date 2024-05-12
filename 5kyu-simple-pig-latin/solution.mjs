export function pigIt (str) {
  return str.replace(/\b(\w)(\w*)\b/g, '$2$1ay');
}
