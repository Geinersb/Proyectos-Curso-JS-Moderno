function Cliente(nombre, saldo) {
    this.nombre = nombre;
    this.saldo = saldo;
}

Cliente.prototype.tipocliente = function () {
    let tipo;

    if (this.saldo > 10000) {
        tipo = 'Gold';
    } else if (this.saldo > 5000) {
        tipo = 'Platinum';
    } else {
        tipo = 'normal';
    }

    return tipo;
}

Cliente.prototype.nombreclienteSaldo = function(){
    return `Nombre: ${this.nombre}, Saldo: ${this.saldo}, Tipo cliente: ${this.tipocliente()} `
}

Cliente.prototype.retiraSaldo = function(retira){
this.saldo -= retira;
}




function Persona(nombre, saldo, telefono){
    Cliente.call(this, nombre, saldo);
    this.telefono = telefono;
}

Persona.prototype = Object.create(Cliente.prototype);

Persona.prototype.constructo = Cliente;

//instanciarlo 
const juan = new Persona('Juan',5000, 60203040);

console.log(juan);
console.log(juan.nombreclienteSaldo());

Persona.prototype.mostrarTelefono = function(){
    return `El telefono  de esta persona es ${this.telefono}`
}

console.log(juan.mostrarTelefono());