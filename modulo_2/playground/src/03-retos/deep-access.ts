console.log("************** DEEP ACCESS *********************");
const myObject = {
  a: 1,
  b: {
    c: null,
    d: {
      e: 3,
      f: {
        g: "bingo",
      },
    },
  },
};

const deepGet = (obj, ...properties) => {
  if (properties.length === 0) return obj;
  const [first, ...rest] = properties;
  if (obj[first] === undefined) return undefined;
  return deepGet(obj[first], ...rest);
};

console.log(deepGet(myObject, "x")); // undefined
console.log(deepGet(myObject, "a")); // 1
console.log(deepGet(myObject, "b")); // { c: null, d: {....}}
console.log(deepGet(myObject, "b", "c")); // null
console.log(deepGet(myObject, "b", "d", "f", "g")); // bingo
console.log(deepGet(myObject)); // {a: 1, b: {...}}

const myObjectB = {};

const deepSet = (value, obj, ...properties) => {
  if (properties.length === 0) return value;
  const [first, ...rest] = properties;
  obj[first] = deepSet(value, obj[first] || {}, ...rest);
  return obj;
};

deepSet(1, myObjectB, "a", "b");
console.log(JSON.stringify(myObjectB)); // {a: { b: 1}}
deepSet(2, myObjectB, "a", "c");
console.log(JSON.stringify(myObjectB)); // {a: { b: 1, c: 2}}
deepSet(3, myObjectB, "a");
console.log(JSON.stringify(myObjectB)); // {a: 3}
deepSet(4, myObjectB);
console.log(JSON.stringify(myObjectB)); // Do nothing // {a: 3}
