///SE VE LOS WEAKMAP 

//no se pueden iterar 
//solo aceptan objetos y no se puede usar el size 
const producto = {
    idProducto :10
}

const weakMap = new WeakMap();

weakMap.set(producto,'Monitor')

console.log(weakMap.has(producto))
console.log(weakMap.get(producto))
console.log(weakMap.delete(producto))
console.log(weakMap)

