import{obtenerCliente,editarCliente} from './API.js';
import{mostrarAlerta,validar} from './funciones.js';

(function(){

    //CAMPOS DEL FORMULARIO 

    const nombreInput= document.querySelector('#nombre');
    const emailInput= document.querySelector('#email');
    const telefonoInput= document.querySelector('#telefono');
    const empresaInput= document.querySelector('#empresa');
    const idInput= document.querySelector('#id');

document.addEventListener('DOMContentLoaded', async ()=>{
    //para saber a cual id le estamos dando click para editar la cual viene en el URL de la pagina  se realiza lo siguiente 
const parametrosURL = new URLSearchParams(window.location.search);

const idCliente = parametrosURL.get('id');

const cliente = await obtenerCliente(idCliente);

mostrarCliente(cliente);

//SUBMIT AL FORMULARIO 

const formulario = document.querySelector('#formulario');
formulario.addEventListener('submit',validarCliente);

});


function mostrarCliente(cliente) {
    
const {nombre,email,telefono,empresa,id } = cliente;

nombreInput.value= nombre;
emailInput.value= email;
telefonoInput.value= telefono;
empresaInput.value= empresa;
idInput.value=id;


}


function validarCliente(e){
    e.preventDefault();

    
const cliente = {
    nombre: nombreInput.value,
    email: emailInput.value,
    telefono: telefonoInput.value,
    empresa: empresaInput.value,
    id: idInput.value
}


if (validar(cliente)){
   mostrarAlerta('Todos los campos son obligatorios');
    return;
}


//REESCRIBE EL OBJETO DE CLIENTE 
editarCliente(cliente);


}


})();