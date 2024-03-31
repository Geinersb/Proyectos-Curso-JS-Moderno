//se recomienda que los import esten en la parte de arriba 
import nuevaFuncion,{nombreCliente,ahorro,mostrarInformacion,tieneSaldo,Cliente} from './cliente.js'
import { Empresa } from './empresa.js'; 

console.log(nombreCliente);
console.log(ahorro);

console.log(mostrarInformacion(nombreCliente,ahorro));

tieneSaldo(ahorro);


const cliente = new Cliente(nombreCliente,ahorro);

console.log(cliente.mostrarInformacion());

//utilizamos lo que viene de empresa 
const empresa = new Empresa('Pedro',100,'Aprendizaje');
console.log(empresa.mostrarInformacion());

//mando a llamar la nueva funcion que es por default en el cliente.js
nuevaFuncion();