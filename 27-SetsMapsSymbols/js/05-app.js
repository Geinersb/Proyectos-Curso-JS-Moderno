//AQUI SE VEN LOS SYMBOLS 
//es parte de librerias 
//los symbols no son iguales nunca 

const sym = Symbol('1');
const sym2 = Symbol('1');

if (sym === sym2) {
    console.log('Son iguales ');
}
else{
    console.log('Son Diferentes ');
}

//otro ejemplo 
const nombre = Symbol(); 
const apellido = Symbol(); 

const persona = {};

//agregar nombre y apellido como llaves del objeto 
persona[nombre]= 'Geiner';
persona[apellido]= 'Sanchez';
persona.tipocliente = 'Premium';
persona.saldo = 500;

console.log(persona);
console.log(persona[nombre]);

//las propiedades que utilizan un Symbol no son iterables 

//Definir una descripcion del symbol 
const nombreCliente = Symbol('Nombre del cliente ');
const cliente = {};

cliente[nombreCliente] = 'Pedro'

console.log(cliente);
console.log(cliente[nombreCliente]);
console.log(nombreCliente);