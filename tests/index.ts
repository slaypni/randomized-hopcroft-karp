import findMatching from "#/index";

const findAll = (
  find: () => [number, number][],
  matchings: [number, number][][],
  max: number = 100
): boolean => {
  let _matchings = [...matchings];
  for (let n = 0; n < max && _matchings.length > 0; n++) {
    const matching = find();
    // console.log(matching);
    _matchings = _matchings.filter(
      (_matching) => JSON.stringify(matching) !== JSON.stringify(_matching)
    );
    if (
      !matchings.some(
        (_matching) => JSON.stringify(matching) === JSON.stringify(_matching)
      )
    ) {
      return false;
    }
  }
  return _matchings.length === 0;
};

test("m:3, n:2, match:3, pattern:1", () => {
  expect(
    findMatching(3, 3, [
      [0, 0],
      [1, 2],
      [2, 1],
    ])
  ).toEqual([
    [0, 0],
    [1, 2],
    [2, 1],
  ]);
});

test("m:3, n:2, match:2, pattern:2", () => {
  expect(
    findAll(
      () =>
        findMatching(3, 3, [
          [0, 0],
          [1, 0],
          [2, 1],
        ]),
      [
        [
          [0, 0],
          [2, 1],
        ],
        [
          [1, 0],
          [2, 1],
        ],
      ]
    )
  ).toEqual(true);
});

test("m:3, n:4, match:3, pattern:4", () => {
  expect(
    findAll(
      () =>
        findMatching(3, 4, [
          [0, 0],
          [0, 1],
          [1, 1],
          [1, 2],
          [2, 1],
          [2, 3],
        ]),
      [
        [
          [0, 0],
          [1, 1],
          [2, 3],
        ],
        [
          [0, 0],
          [1, 2],
          [2, 1],
        ],
        [
          [0, 0],
          [1, 2],
          [2, 3],
        ],
        [
          [0, 1],
          [1, 2],
          [2, 3],
        ],
      ]
    )
  ).toEqual(true);
});

test("m:4, n:2, match:2, pattern:4, grouped", () => {
  expect(
    findAll(
      () =>
        findMatching(
          4,
          2,
          [
            [0, 0],
            [0, 1],
            [1, 1],
            [2, 1],
            [3, 0],
            [3, 1],
          ],
          [0, 0, 1, 1]
        ),
      [
        [
          [0, 0],
          [2, 1],
        ],
        [
          [0, 0],
          [3, 1],
        ],
        [
          [0, 1],
          [3, 0],
        ],
        [
          [1, 1],
          [3, 0],
        ],
      ]
    )
  ).toEqual(true);
});

test("m:4, n:2, match:2, pattern:4, grouped", () => {
  expect(
    findAll(
      () =>
        findMatching(
          4,
          2,
          [
            [0, 0],
            [0, 1],
            [1, 1],
            [2, 1],
            [3, 0],
            [3, 1],
          ],
          [0, 1, 1, 1]
        ),
      [
        [
          [0, 0],
          [1, 1],
        ],
        [
          [0, 0],
          [2, 1],
        ],
        [
          [0, 0],
          [3, 1],
        ],
        [
          [0, 1],
          [3, 0],
        ],
      ]
    )
  ).toEqual(true);
});

test("m:6, n:3, match:2, pattern:13, grouped", () => {
  expect(
    findAll(
      () =>
        findMatching(
          6,
          3,
          [
            [0, 0],
            [0, 1],
            [1, 1],
            [2, 0],
            [2, 1],
            [3, 0],
            [4, 0],
            [4, 1],
          ],
          [0, 1, 1, 2, 2, 1]
        ),
      [
        [
          [0, 0],
          [1, 1],
        ],
        [
          [0, 0],
          [2, 1],
        ],
        [
          [0, 0],
          [4, 1],
        ],
        [
          [0, 1],
          [2, 0],
        ],
        [
          [0, 1],
          [3, 0],
        ],
        [
          [0, 1],
          [4, 0],
        ],
        [
          [1, 1],
          [3, 0],
        ],
        [
          [0, 1],
          [4, 0],
        ],
        [
          [1, 1],
          [3, 0],
        ],
        [
          [1, 1],
          [4, 0],
        ],
        [
          [2, 0],
          [4, 1],
        ],
        [
          [2, 1],
          [3, 0],
        ],
        [
          [2, 1],
          [4, 0],
        ],
      ]
    )
  ).toEqual(true);
});
