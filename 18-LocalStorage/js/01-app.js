//por defecto el local Storage solo guarda Strings, pero se puede usar un metodos para poder utilizar objetos como String.
localStorage.setItem('nombre','Geiner');

const producto ={
    nombre: 'Monitor 24 Pulgadas',
    precio: 300
}

//con este metodo transformo un objeto en un String 
const productoString = JSON.stringify(producto);
localStorage.setItem('producto',productoString);

////con este metodo transformo un Array  en un String 
const meses = ['enero', 'febrero','Marzo'];
const mesesString = JSON.stringify(meses);
localStorage.setItem('meses',mesesString);
