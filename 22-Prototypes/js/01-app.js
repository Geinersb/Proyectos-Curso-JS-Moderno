//objet literal es mas comun pero no permite hacer objetos dinamicos ni reutilizables
const cliente = {
    nombre: 'Geiner',
    saldo: 500
}

console.log(cliente);


//este es menos comun pero si permite hacer objetos dinamicos y reutilizables 
function Cliente(nombre, saldo){
    this.nombre = nombre;
    this.saldo = saldo;
}

const geiner = new Cliente('Geiner',500)
console.log(geiner)