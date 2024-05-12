const periods = [
  { alias: 'year', duration: 60 * 60 * 24 * 365 },
  { alias: 'day', duration: 60 * 60 * 24 },
  { alias: 'hour', duration: 60 * 60 },
  { alias: 'minute', duration: 60 },
  { alias: 'second', duration: 1 }
];

export function formatDuration (seconds) {
  if (typeof seconds !== 'number' || !isFinite(seconds) || seconds % 1 || seconds < 0) {
    throw new Error('Argument must be a positive integer');
  }

  if (!seconds) {
    return 'now';
  }

  const parts = [];
  for (const { duration, alias } of periods) {
    const number = Math.trunc(seconds / duration);
    if (!number) {
      continue;
    }
    seconds -= number * duration;
    parts.push(`${number} ${alias}${number > 1 ? 's' : ''}`);
  }

  return parts.join(', ').replace(/,(?!.*,)/, ' and');
}
