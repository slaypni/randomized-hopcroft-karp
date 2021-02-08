import findMatching from "#/index";

test("", () => {
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
