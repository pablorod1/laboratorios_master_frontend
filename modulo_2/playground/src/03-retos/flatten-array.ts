console.log("************** FLATTEN ARRAY *********************");

const sample = [1, [2, 3], [[4], [5, 6, [7, 8, [9]]]]];

const flatArray = (
  arr: (number | number[] | (number | (number | number[])[])[][])[]
) => {
  return arr.flat(Infinity);
};

console.log(flatArray(sample));
