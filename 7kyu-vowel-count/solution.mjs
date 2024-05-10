export function getCountStringIncludes (str) {
  let counter = 0;
  for (let i = 0; i < str.length; i++) {
    if ('aeiou'.includes(str[i])) {
      counter++;
    }
  }
  return counter;
}

export function getCountReplace (str) {
  return str.replace(/[^aeiou]/g, '')?.length || 0;
}

export function getCountMatch (str) {
  return str.match(/[aeiou]/g)?.length || 0;
}

export const getCount = getCountStringIncludes;
