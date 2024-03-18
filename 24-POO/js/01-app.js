//ESTA CLASE ES MAS COMUN DE USAR 
class Cliente {
    constructor(nombre, saldo){
        this.nombre = nombre,
        this.saldo = saldo
    }

}

const juan = new Cliente('juan',400);
console.log(juan);


//CLASS EXPRESSION 
const Cliente2 = class{
    constructor(nombre, saldo){
        this.nombre = nombre,
        this.saldo = saldo
    }
}

const juan2 = new Cliente2();
console.log(juan2)