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

const pedro = new Cliente('pedro', 6000);
pedro.tipocliente();
console.log(pedro.tipocliente());

console.log(pedro.nombreclienteSaldo());

pedro.retiraSaldo(1000);
console.log(pedro.nombreclienteSaldo());


