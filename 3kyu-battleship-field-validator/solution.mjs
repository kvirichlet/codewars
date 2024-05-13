export function validateBattlefield (field, maxEntityLength = 4) {
  const limits = {};
  for (let size = maxEntityLength; size > 0; size--) {
    limits[size] = (maxEntityLength - size + 1) + (limits[size + 1] ?? 0);
  }

  for (let r = 0; r < field.length; r++) {
    for (let c = 0; c < field[0].length; c++) {
      if (!field[r][c]) {
        continue;
      }

      const size = 1 + (field[r - 1]?.[c] ?? 0) + (field[r][c - 1] ?? 0);
      const isCurved = field[r + 1]?.[c] && field[r][c + 1];
      const hasDiagonalNeighbors = field[r - 1]?.[c - 1] || field[r - 1]?.[c + 1];
      const hasInvalidSize = size > maxEntityLength;
      const isOutOfLimits = limits[size] === 0;

      if (isCurved || hasDiagonalNeighbors || hasInvalidSize || isOutOfLimits) {
        return false;
      }

      field[r][c] = size;
      limits[size]--;
    }
  }

  return Object.values(limits).reduce((p, n) => p + n) === 0;
}
