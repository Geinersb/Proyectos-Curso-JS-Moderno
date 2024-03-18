class Cliente {

//para hacer una propiedad privada 
#nombre;

    constructor(nombre, saldo) {
        this.#nombre = nombre,
            this.saldo = saldo
    }

    mostrarInformacion() {
        return `Cliente: ${this.#nombre}, tu saldo es de ${this.saldo} `
    }

    static bienvenida() {
        return `Bienvenido al cajero`
    }
}

const juan = new Cliente('Juan',200);
//para acceder a la propiedad de nombre por ser privada se puede hacer pero hay que  llamar desde el metodo que esta en la clase 
console.log(juan.mostrarInformacion());

//otra forma es por medio de un Set y Get para obtener el valor de nombre;
