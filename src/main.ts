const inf = 0x7fffffff;
const nil = -1;

export default function findMatching(
  m: number, // number of nodes U
  n: number, // number of nodes V
  edges: [number, number][], // edges between U and V
  groups: number[] = new Array(n).fill(0) // groups which nodes V belong to. The algorithm tries to maximize cardinality of chosen groups.
): [number, number][] {
  const card = Object.fromEntries(groups.map((v) => [v, 0]));
  const compareByGroupCardinality = (v1: number, v2: number) =>
    card[groups[v1]] - card[groups[v2]];

  const adj: number[][] = new Array(m).fill(undefined).map(() => []);
  edges.forEach(([u, v]) => {
    adj[u].push(v);
  });

  const uPair = new Int32Array(m).fill(nil);
  const vPair = new Int32Array(n).fill(nil);
  const dists = new Int32Array(m + 1);

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

  const dfs = (u: number, v?: number) => {
    if (u !== nil) {
      for (const v of shuffle(adj[u]).sort(compareByGroupCardinality)) {
        if (dists[vPair[v] + 1] === dists[u + 1] + 1) {
          if (dfs(vPair[v], v)) {
            vPair[v] = u;
            uPair[u] = v;
            return true;
          }
        }
      }
      dists[u + 1] = inf;
      return false;
    }
    card[groups[v!]] += 1;
    return true;
  };

  let matching = 0;
  while (bfs()) {
    for (const u of shuffle(Array(m).keys())) {
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

const shuffle = <T>(iter: Iterable<T>): T[] => {
  const array = [...iter];
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};
