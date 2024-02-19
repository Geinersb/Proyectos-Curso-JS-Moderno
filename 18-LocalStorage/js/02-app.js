//con esta forma puedo obtener los datos que se guardan en el LocalStorage
const nombre = localStorage.getItem('nombre');
console.log(nombre)

//con esta forma puedo obtener los datos que se guardan en el LocalStorage de un objeto que es String y convertilo a objeto
const productoJson =localStorage.getItem('producto');
console.log(JSON.parse(productoJson));


const mesesArray = localStorage.getItem('meses');
console.log(JSON.parse(mesesArray));