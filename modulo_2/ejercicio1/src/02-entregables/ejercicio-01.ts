console.log("************** DELIVERABLE 01 *********************");
const array: number[] = [1, 2, 3, 4];

// Implementa una función head (inmutable), tal que,
// dado un array como entrada extraiga y devuelva su primer elemento.
// Utiliza destructuring.
const head = (array: number[]) => {
  const [first] = array;
  console.log(first);
};
head(array);

// Implementa una función tail (inmutable), tal que,
// dado un array como entrada devuelta todos menos el primer elemento.
// Utiliza rest operator.
const tail = (array: number[]) => {
  const [_first, ...rest] = array;
  console.log(rest);
};
tail(array);

// Implementa una función init (inmutable), tal que,
// dado un array como entrada devuelva todos los elementos menos el último.
// Utiliza los métodos que ofrece Array.prototype.
const init = (array: number[]) => {
  console.log(array.slice(0, array.length - 1));
};
init(array);

// Implementa una función last (inmutable), tal que, dado un array
// como entrada devuelva el último elemento.
const last = (array: number[]) => {
  console.log(array[array.length - 1]);
};
last(array);
