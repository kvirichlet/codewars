export function fib (num) {
  const sign = num < 0 && !(num % 2) ? -1n : 1n;
  return sign * fibDoubling(Math.abs(num))[0];
}

function fibDoubling (num) {
  if (!num) {
    return [0n, 1n];
  }

  const [_K, _Kplus1] = fibDoubling(Math.floor(num / 2));
  const _2K = _K * (2n * _Kplus1 - _K);
  const _2Kplus1 = _K ** 2n + _Kplus1 ** 2n;

  return num % 2 === 0 ? [_2K, _2Kplus1] : [_2Kplus1, _2K + _2Kplus1];
}
