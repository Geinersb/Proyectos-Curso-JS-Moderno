document.addEventListener('DOMContentLoaded',function(){
    //SELECCiONAR ELEMENTOS DE LA INTERFAZ 

    const inputEmail = document.querySelector('#email');
    const inputAsunto = document.querySelector('#asunto');
    const inputMensaje = document.querySelector('#mensaje');
    const formulario = document.querySelector('#formulario');

//ASIGNAR EVENTOS
inputEmail.addEventListener('blur', validar);

inputAsunto.addEventListener('blur', validar);

inputMensaje.addEventListener('blur', validar);

function validar(e){
    e.target.parentElemnt 
 if(e.target.value.trim() ===''){
    mostrarAlerta(`El campo ${e.target.id} es obligatorio`, e.target.parentElement );
    return;
 }

//llama la funcion para validar el email
if(e.target.id === 'email' && !validarEmail(e.target.value)){
    mostrarAlerta('El email no es valido',e.target.parentElement);
    return;
}


 //llama la funcion limpiar e indica a cual input es que la dispara
 limpiarAlerta(e.target.parentElement);
 
}

//FUNCION PARA MOSTRAR ALERTA CUANDO CAMPO VACIO
function mostrarAlerta(mensaje, referencia){
//llama la funcion limpiar e indica a cual input es que la dispara
limpiarAlerta(referencia);


//generar alerta en el HTML 
const error = document.createElement('P');
error.textContent= mensaje;
error.classList.add('bg-red-600','text-white', 'p-2', 'text-center')

//INYECTAR EL ERROR AL FORMULARIO
referencia.appendChild(error);
}


//FUNCION PARA QUITAR LA ALERTA 
function limpiarAlerta(referencia){
    //comprueba si ya existe una alerta 
    const alerta = referencia.querySelector('.bg-red-600');
    if(alerta){
        alerta.remove();
    }
}
//FUNCION PARA VALIDAR EL FORMATO DEL EMAIL
function validarEmail(email){
    const regex =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
    const resultado = regex.test(email);
    return resultado;
}



})