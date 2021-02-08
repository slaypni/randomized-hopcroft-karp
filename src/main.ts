const inf = 0x7fffffff;
const nil = -1;

export default function findMatching(
  m: number, // number of nodes U
  n: number, // number of nodes V
  edges: [number, number][], // edges between U and V
  seed: number = 0,
  groups: number[] = new Array(n).fill(0) // groups which nodes V belong to. The algorithm tries to maximize cardinality of chosen groups.
): [number, number][] {
  const adj: number[][] = new Array(m).fill(undefined).map(() => []);
  edges.forEach(([u, v]) => {
    adj[u].push(v);
  });

  const uPair = new Int32Array(m).fill(nil);
  const vPair = new Int32Array(n).fill(nil);
  const dists = new Int32Array(m + 1).fill(nil);

  const bfs = () => {
    const queue: number[] = [];
    for (let u = 0; u < m; u++) {
      if (uPair[u] === nil) {
        dists[u + 1] = 0;
        queue.push(u);
      } else {
        dists[u + 1] = inf;
      }
    }
    dists[nil + 1] = inf;
    for (let u; (u = queue.shift()) !== undefined; ) {
      if (dists[u + 1] < dists[nil + 1]) {
        for (const v of adj[u]) {
          if (dists[vPair[v] + 1] === inf) {
            dists[vPair[v] + 1] = dists[u + 1] + 1;
            queue.push(vPair[v]);
          }
        }
      }
    }
    return dists[nil + 1] !== inf;
  };

  const dfs = (u: number) => {
    if (u !== nil) {
      for (const v of adj[u]) {
        if (dists[vPair[v] + 1] === dists[u + 1] + 1) {
          if (dfs(vPair[v])) {
            vPair[v] = u;
            uPair[u] = v;
            return true;
          }
        }
      }
      dists[u + 1] = inf;
      return false;
    }
    return true;
  };

  let matching = 0;
  while (bfs()) {
    for (let u = 0; u < m; u++) {
      if (uPair[u] === nil) {
        if (dfs(u)) {
          matching += 1;
        }
      }
    }
  }

  return Array.from(uPair)
    .map((v, u) => [u, v])
    .filter(([u, v]) => v !== nil) as [number, number][];
}