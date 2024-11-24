console.log("************** DELIVERABLE 02 *********************");
const arr1: any[] = [1, 2, 3, 4];
const arr2: any[] = ["Hola", "Mundo"];

// Implementa una función concat (inmutable) tal que,
// dados 2 arrays como entrada, devuelva la concatenación de ambos.
// Utiliza rest / spread operators.
const concat = (a: any[], b: any[]) => {
  return [...a, ...b];
};
console.log(concat(arr1, arr2));

// Implementa una nueva versión de concat
// donde se acepten múltiples arrays de entrada (más de 2).
// No utilices el método Array.prototype.concat.
const concatMultiple = (...arrays: any[]) => {
  return arrays.reduce((acc, array) => [...acc, ...array], []);
};
console.log(concatMultiple(arr1, arr2, arr1, arr2, arr1, arr2));
