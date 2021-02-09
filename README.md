# Randomized Hopcroft-Karp

## Install

```
npm install randomized-hopcroft-karp
```

## Usage

```typescript
function findMatching(
  m: number,
  n: number,
  edges: [number, number][],
  groups?: number[]
): [number, number][];
```

- `m`: Number of nodes U.
- `n`: Number of nodes V.
- `edges`: Edges between U and V.
- `groups`: Groups which nodes U belong to. The algorithm tries to maximize cardinality of chosen groups.
- Returns an array of edges representing the matching.

## Example

```typescript
import findMatching from "randomized-hopcroft-karp";

const matching = findMatching(3, 4, [
  [0, 0],
  [0, 1],
  [1, 1],
  [1, 2],
  [2, 1],
  [2, 3],
]);
```
