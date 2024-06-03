export function square_sums_row (n) { // eslint-disable-line camelcase
  const graph = [];
  const visited = Array(n + 1).fill(false);
  let success = false;
  const result = [];

  for (let i = 1; i <= n; i++) {
    graph[i] = [];
  }

  for (let i = 1; i * i < 2 * n; ++i) {
    for (let j = 1; j < i * i / 2; ++j) {
      const diff = i * i - j;
      if (j <= n && diff <= n) {
        graph[j].push(diff);
        graph[diff].push(j);
      }
    }
  }

  let minEdges = Infinity;
  for (const node in graph) {
    if (graph[node].length < minEdges) {
      minEdges = graph[node].length;
    }
  }

  for (const node in graph) {
    if (graph[node].length === minEdges) {
      dfs(graph, Number(node), 0);
      if (success) break;
    }
  }

  return success ? result : false;

  function dfs (graph, node, usedCount = 0) {
    if (++usedCount === n) {
      success = true;
      result.push(node);
      return;
    }
    visited[node] = true;

    let minUnusedEdges = Infinity;

    for (const neighbor of graph[node]) {
      if (visited[neighbor]) continue;
      let unusedEdges = 0;
      for (const edge of graph[neighbor]) {
        if (!visited[edge]) ++unusedEdges;
      }
      if (unusedEdges < minUnusedEdges) {
        minUnusedEdges = unusedEdges;
      }
    }

    for (const neighbor of graph[node]) {
      if (visited[neighbor]) continue;
      let unusedEdges = 0;
      for (const edge of graph[neighbor]) {
        if (!visited[edge]) ++unusedEdges;
      }
      if (unusedEdges === minUnusedEdges) {
        dfs(graph, neighbor, usedCount);
        if (success) {
          result.push(node);
          return;
        }
      }
    }

    visited[node] = false;
    usedCount--;
  }
}
