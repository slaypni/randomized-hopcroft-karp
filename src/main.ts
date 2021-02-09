const inf = 0x7fffffff;
const nil = -1;

export default function findMatching(
  m: number, // number of nodes U
  n: number, // number of nodes V
  edges: [number, number][], // edges between U and V
  groups?: number[] // groups which nodes U belong to. The algorithm tries to maximize cardinality of chosen groups.
): [number, number][] {
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

  const dfs = (u: number) => {
    if (u !== nil) {
      for (const v of shuffle(adj[u])) {
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

  if (groups === undefined) {
    while (bfs()) {
      for (const u of shuffle(Array(m).keys())) {
        if (uPair[u] === nil) {
          dfs(u);
        }
      }
    }
  } else {
    let gsByCount = [new Set(groups)];
    const remainingUs = new Set(Array(m).keys());

    while (bfs()) {
      let scheduledGs: Set<number>;
      let scheduledUs: number[] = [];
      let lastCount = -1;

      const unvisitedUsByGroup = Object.fromEntries(
        [...new Set(groups)].map((g) => [g, new Set<number>()])
      );
      for (const u of remainingUs) {
        unvisitedUsByGroup[groups[u]].add(u);
      }

      const pop = () => {
        let u: number | undefined;
        while (
          (u = scheduledUs.shift()) === undefined ||
          scheduledGs.size === 0
        ) {
          lastCount += 1;
          const gs = gsByCount[lastCount];
          if (gs === undefined) {
            return undefined;
          }
          scheduledUs = shuffle(
            [...gs].flatMap((g) => [...unvisitedUsByGroup[g]])
          );
          scheduledGs = gs;
        }

        if (scheduledGs.has(groups[u])) {
          unvisitedUsByGroup[groups[u]].delete(u);
          return u;
        }
      };

      const match = (u: number) => {
        const g = groups[u];
        gsByCount[lastCount + 1] ??= new Set<number>();
        gsByCount[lastCount + 1].add(g);
        gsByCount[lastCount].delete(g);
        scheduledGs.delete(g);
        remainingUs.delete(u);
      };

      for (let u; (u = pop()) !== undefined; ) {
        if (dfs(u)) {
          match(u);
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
