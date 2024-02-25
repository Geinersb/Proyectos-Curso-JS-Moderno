function Cliente(nombre, saldo){
    this.nombre = nombre;
    this.saldo = saldo;
}

const geiner = new Cliente('Geiner',500)

function formatearCliente(cliente){
    const {nombre, saldo} = cliente; 
    return `El cliente ${nombre} tiene un saldo de ${saldo}`
}

function formatearempresa(empresa){
    const {nombre, saldo,categoria} = empresa; 
    return `El cliente ${nombre} tiene un saldo de ${saldo} y pertenece a la categoria ${categoria}`
}


console.log(formatearCliente(geiner));


function Empresa(nombre, saldo,categoria){
    this.nombre = nombre;
    this.saldo = saldo;
    this.categoria = categoria;
}

const gsbWeb = new Empresa('gsbWeb',6000,'Cursos en linea');
console.log(formatearempresa(gsbWeb));