console.log("************** UNDERSTANDING JS *********************");
console.log("******* CUESTION 1 ********");
let x = NaN;

console.log(x === x); // false

console.log("******* CUESTION 2 ********");
const isNaNValue = (v) => v !== v;

console.log(isNaNValue(NaN)); // true

console.log("******* CUESTION 3 ********");
const y = NaN;
console.log("x !== x", y !== y); // true
console.log("!isNaNValue(y)", !isNaNValue(y)); // false

console.log(y !== y && !isNaNValue(y)); // true
