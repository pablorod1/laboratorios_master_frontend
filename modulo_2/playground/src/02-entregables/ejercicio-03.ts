console.log("************** DELIVERABLE 03 *********************");
const a = { name: "Maria", surname: "Ibañez", country: "SPA" };
const b = { name: "Luisa", age: 31, married: true };

// Implementa una función clone que, a partir de un objeto de entrada
// source devuelva un nuevo objeto con las propiedades de source:
function clone(source: any) {
  return { ...source };
}
console.log(clone(a));

// Implementa una función merge que,
// dados dos objetos de entrada source y target,
// devuelva un nuevo objeto con todas las propiedades de target
// y de source, y en caso de propiedades con el mismo nombre,
// source sobreescribe a target.
// TIP: Puedes usar la función "clone" del apartado A.
/*
Por ejemplo, dados estos 2 objetos:

const a = { name: "Maria", surname: "Ibañez", country: "SPA" };
const b = { name: "Luisa", age: 31, married: true };
el resultado de mezclar a sobre b sería:
merge(a, b); // {name: "Maria", age: 31, married: true, surname: "Ibañez", country: "SPA"}
*/
function merge(source: any, target: any) {
  return clone({ ...target, ...source });
}
console.log(merge(a, b));
