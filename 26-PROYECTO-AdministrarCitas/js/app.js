//SELECTORES

const pacienteInput = document.querySelector('#paciente');
const propietarioInput = document.querySelector('#propietario');
const emailInput = document.querySelector('#email');
const fechaInput = document.querySelector('#fecha');
const sintomasInput = document.querySelector('#sintomas');

const formulario = document.querySelector('#formulario-cita');


//OBJETO DE CITA

const citaObj = {
    paciente: '',
    propietario: '',
    email: '',
    fecha: '',
    sintomas: ''
}


//EVENTOS 
pacienteInput.addEventListener('change', datosCita)

propietarioInput.addEventListener('change', datosCita)

emailInput.addEventListener('change', datosCita)

fechaInput.addEventListener('change', datosCita)

sintomasInput.addEventListener('change', datosCita)

formulario.addEventListener('submit', submitCita)


//FUNCIONES 
function datosCita(e) {
    citaObj[e.target.name] = e.target.value;
}


function submitCita(e) {
    e.preventDefault();

    if (Object.values(citaObj).some(valor => valor.trim() === '')) {

        const notificacion = new Notificacion({
            texto: 'Todos los campos son obligatorios',
            tipo: 'error'
        })


        return
    }
}



//CLASES 
class Notificacion {
    constructor({ texto, tipo }) {
        this.texto = texto,
        this.tipo = tipo

        this.mostrar()
    }

    mostrar() {
        //crear la NOTIFICACION 
        const alerta = document.createElement('DIV')
        alerta.classList.add('text-center', 'w-full', 'p-3', 'text-white', 'my-5', 'alert', 'uppercase', 'font-bold', 'text-sm')

        //si es de TIPO ERROR,   agrega una clase
        this.tipo === 'error' ? alerta.classList.add('bg-red-500') : alerta.classList.add('bg-green-500')

        //MENSAJE DE ERROR 
        alerta.textContent = this.texto

        //INSERTAR EN EL DOM 
        formulario.parentElement.insertBefore(alerta, formulario)
    }
}