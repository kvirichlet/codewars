export function spinWords (text) {
  return text.replace(/(\w{5,})/g, e => e.split('').reverse().join(''));
}
