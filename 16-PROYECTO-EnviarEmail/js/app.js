document.addEventListener('DOMContentLoaded', function () {

    const email = {
        email: '',
        asunto: '',
        mensaje: ''
    }



    //SELECCiONAR ELEMENTOS DE LA INTERFAZ 

    const inputEmail = document.querySelector('#email');
    const inputAsunto = document.querySelector('#asunto');
    const inputMensaje = document.querySelector('#mensaje');
    const formulario = document.querySelector('#formulario');
    const btnSubmit = document.querySelector('#formulario button[type="submit"]');
    const btnReset = document.querySelector('#formulario button[type="reset"]');
    const spinner = document.querySelector('#spinner');

    //ASIGNAR EVENTOS DE VALIDACION
    inputEmail.addEventListener('input', validar);
    inputAsunto.addEventListener('input', validar);
    inputMensaje.addEventListener('input', validar);

    formulario.addEventListener('submit', enviarEmail);

    //evento para resetear el formulario
    btnReset.addEventListener('click',function(e){
        e.preventDefault();

        //reiniciar el objeto
        resetFormmulario();
    })

//FUNCION PARA ACTIVAR EL SPINNER EN EL FORMULARIO CUANDO ENVIA 
    function enviarEmail(e){
        e.preventDefault();

        spinner.classList.add('flex'); 
        spinner.classList.remove('hidden'); 

        setTimeout(() => {
            spinner.classList.remove('flex'); 
            spinner.classList.add('hidden'); 

             //reiniciar el objeto
             resetFormmulario();

             //CREAR UNA ALERTA 
             const alertaExito = document.createElement('P');
            alertaExito.classList.add('bg-green-500','text-white', 'p-2','text-center','rounded-lg','mt-10','font-bold','text-sm','uppercase');
            alertaExito.textContent=('Mensaje enviado correctamente!');

            formulario.appendChild(alertaExito);

            setTimeout(() => {
                alertaExito.remove();
            }, 3000);

        }, 3000);

    }
    //FUNCION PARA VALIDAR LOS CAMPOS DEL FORMULARIO 

    function validar(e) {
        e.target.parentElemnt
        if (e.target.value.trim() === '') {
            mostrarAlerta(`El campo ${e.target.id} es obligatorio`, e.target.parentElement);
            email[e.target.name] = '';
            comprobarEmail();
            return;
        }

        //llama la funcion para validar el email
        if (e.target.id === 'email' && !validarEmail(e.target.value)) {
            mostrarAlerta('El email no es valido', e.target.parentElement);
            email[e.target.name] = '';
            comprobarEmail();
            return;
        }

        //llama la funcion limpiar e indica a cual input es que la dispara
        limpiarAlerta(e.target.parentElement);

        ///ASIGNAR LOS VALORES AL OBJETO EMAIL
        email[e.target.name] = e.target.value.trim().toLowerCase();


        //COMPROBAR EL OBJETO DE EMAIL
        comprobarEmail();

    }

    //FUNCION PARA MOSTRAR ALERTA CUANDO CAMPO VACIO
    function mostrarAlerta(mensaje, referencia) {
        //llama la funcion limpiar e indica a cual input es que la dispara
        limpiarAlerta(referencia);


        //generar alerta en el HTML 
        const error = document.createElement('P');
        error.textContent = mensaje;
        error.classList.add('bg-red-600', 'text-white', 'p-2', 'text-center')

        //INYECTAR EL ERROR AL FORMULARIO
        referencia.appendChild(error);
    }


    //FUNCION PARA QUITAR LA ALERTA 
    function limpiarAlerta(referencia) {
        //comprueba si ya existe una alerta 
        const alerta = referencia.querySelector('.bg-red-600');
        if (alerta) {
            alerta.remove();
        }
    }
    //FUNCION PARA VALIDAR EL FORMATO DEL EMAIL
    function validarEmail(email) {
        const regex = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
        const resultado = regex.test(email);
        return resultado;
    }


    function comprobarEmail() {
        if (Object.values(email).includes('')) {
            btnSubmit.classList.add('opacity-50');
            btnSubmit.disabled = true;
            return;
        } 
        btnSubmit.classList.remove('opacity-50');
        btnSubmit.disabled = false;
    }


    function resetFormmulario(){
        email.email = '';
        email.asunto = '';
        email.mensaje = '';

        formulario.reset();
        comprobarEmail();
    }

});