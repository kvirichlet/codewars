export function moveZerosTwoPointers (arr) {
  let lPointer = 0;

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] !== 0) {
      if (lPointer !== i) {
        arr[lPointer] = arr[i];
      }
      lPointer++;
    }
  }

  for (let i = lPointer; i < arr.length; i++) {
    arr[i] = 0;
  }

  return arr;
}

export function moveZerosFilter (arr) {
  const acc = arr.filter(e => e !== 0);
  const zeros = arr.length - acc.length;
  for (let i = 0; i < zeros; i++) {
    acc.push(0);
  }

  return acc;
}

export function moveZerosAccumulator (arr) {
  const acc = [];

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] !== 0) {
      acc.push(arr[i]);
    }
  }
  const zeros = arr.length - acc.length;
  for (let i = 0; i < zeros; i++) {
    acc.push(0);
  }

  return acc;
}

export const moveZeros = moveZerosTwoPointers;
