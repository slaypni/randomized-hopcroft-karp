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
  edges: [number, number][]
): [number, number][];
```

- `m`: number of nodes U
- `n`: number of nodes V
- `edges`: edges between U and V
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
