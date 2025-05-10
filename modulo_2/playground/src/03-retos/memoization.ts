console.log("************** MEMOIZATION *********************");
const expensiveFunction = () => {
  console.log("Una única llamada");
  return 3.1415;
};

const memoize = (f) => {
  let cache = {};
  return (...args) => {
    let argStr = JSON.stringify(args);
    cache[argStr] = cache[argStr] || f(...args);
    return cache[argStr];
  };
};

const memoized = memoize(expensiveFunction);
console.log(memoized()); // Una única llamada // 3.1415
console.log(memoized()); // 3.1415
console.log(memoized()); // 3.1415
