//COMO AGREGAR METODOS A LAS CLASES 

class Cliente {
    constructor(nombre, saldo) {
        this.nombre = nombre,
            this.saldo = saldo
    }

    mostrarInformacion() {
        return `Cliente: ${this.nombre}, tu saldo es de ${this.saldo} `
    }

    static bienvenida() {
        return `Bienvenido al cajero`
    }

}

//HERENCIA 
class Empresa extends Cliente {
    constructor(nombre, saldo, telefono, categoria) {
      super(nombre,saldo);
        this.telefono = telefono
        this.categoria = categoria        
    }

    static bienvenida() {     //reescribir un metodo 
        return `Bienvenido al cajero de Empresas`
    }
}

const juan = new Cliente('juan', 400);
const empresa = new Empresa('Geiner', 600,60602020, 'Aprendisaje en linea')

console.log(empresa);
console.log(empresa.mostrarInformacion())
console.log(Cliente.bienvenida());
console.log(Empresa.bienvenida());