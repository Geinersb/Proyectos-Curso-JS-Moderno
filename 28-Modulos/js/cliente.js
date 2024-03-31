// (function(){
//     console.log('Desde un IIFE');

//     const nombreCliente = 'Geiner';
// })();

//con esto puedo exportar esta variable e importarla desde otro archivo 
export const nombreCliente = 'Geiner';
export const ahorro = 200;


export function mostrarInformacion(nombre,ahorro){
    return `Cliente: ${nombre} - Ahorro: ${ahorro}`
}

export function tieneSaldo (ahorro){
    if (ahorro>0) {
        console.log('Si tiene Saldo ');
    }
    else{
        console.log('El cliewnte no tiene saldo');
    }
}

export class Cliente{
    constructor(nombre,ahorro){
        this.nombre = nombre;
        this.ahorro = ahorro;
    }

    mostrarInformacion(){
        return `Cliente: ${this.nombre} - Ahorro: ${this.ahorro}`
    }
    
}

// SOLO SE PUEDE TENER UN EXPORT DEFAULT POR ARCHIVO
export default function nuevaFuncion(){
    console.log('Este es el export Default');
}

