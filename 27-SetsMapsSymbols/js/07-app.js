//ESTO ES DE GENERADORES 
//se agrega un * y esto lo hace un generador 
function *crearGenerador(){
    yield 1;
    yield 'Geiner';
    yield 3+3;
    yield true;
}

// const iterador = crearGenerador();

// console.log(iterador);
// console.log(iterador.next().value);
// console.log(iterador.next());
// console.log(iterador.next().value);
// console.log(iterador.next());

//GENERADOR PARA CARRITO DE COMPRAS 
function *generadorCarrito(carrito){
    for (let i = 0; i < carrito.length; i++) {
      yield carrito[i];
        
    }
}

const carrito = ['Producto1','Producto2', 'Producto3'];

const iterador = generadorCarrito(carrito);

console.log(iterador.next());
console.log(iterador.next());
console.log(iterador.next());
console.log(iterador.next());