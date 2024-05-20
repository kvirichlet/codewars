const DIR_N = 0b1;
const DIR_E = 0b10;
const DIR_S = 0b100;
const DIR_W = 0b1000;

const opposite = {
  [DIR_N]: DIR_S,
  [DIR_E]: DIR_W,
  [DIR_S]: DIR_N,
  [DIR_W]: DIR_E
};

const connections = {
  '┗': DIR_N | DIR_E,
  '┓': DIR_S | DIR_W,
  '┏': DIR_E | DIR_S,
  '┛': DIR_N | DIR_W,
  '━': DIR_E | DIR_W,
  '┃': DIR_N | DIR_S,
  '┣': DIR_N | DIR_E | DIR_S,
  '┫': DIR_N | DIR_S | DIR_W,
  '┳': DIR_E | DIR_S | DIR_W,
  '┻': DIR_N | DIR_E | DIR_W,
  '╋': DIR_N | DIR_E | DIR_S | DIR_W
};

export function checkPipe (map) {
  const sources = getSources(map);
  const visited = new Set();

  for (const source of sources) {
    if (visited.has(source)) continue;

    const stack = [source.split(',').map(Number)];
    while (stack.length) {
      const [row, col] = stack.pop();
      const pipe = map[row][col];
      visited.add(`${row},${col}`);
      const neighbors = [[-1, 0, DIR_N], [0, 1, DIR_E], [1, 0, DIR_S], [0, -1, DIR_W]]
        .map(([rOffset, cOffset, dir]) => [row + rOffset, col + cOffset, dir])
        .filter(([row, col, dir]) => map[row]?.[col] && connections[pipe] & dir);

      for (const [r, c, dir] of neighbors) {
        if (!(connections[map[r][c]] & opposite[dir])) {
          return false;
        }

        if (!visited.has(`${r},${c}`)) {
          stack.push([r, c]);
        }
      }
    }
  }

  return true;
}

function getSources (map) {
  const height = map.length;
  const width = map[0].length;
  const sources = new Set();

  for (let col = 0; col < width; col++) {
    const nCell = map[0][col];
    const sCell = map[height - 1][col];

    if (connections[nCell] & DIR_N) sources.add(`0,${col}`);
    if (connections[sCell] & DIR_S) sources.add(`${height - 1},${col}`);
  }

  for (let row = 0; row < height; row++) {
    const wCell = map[row][0];
    const eCell = map[row][width - 1];

    if (connections[wCell] & DIR_W) sources.add(`${row},0`);
    if (connections[eCell] & DIR_E) sources.add(`${row},${width - 1}`);
  }

  return sources;
}
