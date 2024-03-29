//ejemplo de un SET 
//estos solo reciben valores no llave y valor y no agregar valores repetidos 
const carrito = new Set();

//agregar valores a un set 
carrito.add('camisa');
carrito.add('Disco #1');
carrito.add('Disco #2');

//saber cuantos valores tiene un set 
console.log(carrito.size)

//para saber si un set ya contiene un valor 
console.log(carrito.has('camisa'));

//los set tambien son iterables 
carrito.forEach(producto =>{
    console.log(producto)
})

//para eliminar un valor del set 
carrito.delete('camisa')

console.log(carrito)

//para vaciar los elementos del set 
carrito.clear();

console.log(carrito)


//ejemplo de uso de Set 
//Del siguiente arreglo, eliminar los duplicados 
const numeros = [10,20,30,40,50,10,20,];

const noDuplicados = new Set(numeros);
console.log(noDuplicados)