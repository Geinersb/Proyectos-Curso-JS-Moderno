//SELECTORES

const pacienteInput = document.querySelector('#paciente');
const propietarioInput = document.querySelector('#propietario');
const emailInput = document.querySelector('#email');
const fechaInput = document.querySelector('#fecha');
const sintomasInput = document.querySelector('#sintomas');

const formulario = document.querySelector('#formulario-cita');

const contenedorCitas = document.querySelector('#citas');


//OBJETO DE CITA

const citaObj = {
    paciente: '',
    propietario: '',
    email: '',
    fecha: '',
    sintomas: ''
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

        //ELIMINAR ALERTAS DUPLICADAS 
        const alertaPrevia = document.querySelector('.alert')
        if (alertaPrevia) {
            alertaPrevia.remove();
        }

        //si es de TIPO ERROR,   agrega una clase
        this.tipo === 'error' ? alerta.classList.add('bg-red-500') : alerta.classList.add('bg-green-500')

        //MENSAJE DE ERROR 
        alerta.textContent = this.texto

        //INSERTAR EN EL DOM 
        formulario.parentElement.insertBefore(alerta, formulario)

        //QUITAR DESPUES DE 5 SEGUNDOS 
        setTimeout(() => {
            alerta.remove();
        }, 3000);
    }
}

class AdminCitas {
    constructor() {
        this.citas = [];
    }

    agregar(cita) {
        this.citas = [...this.citas, cita];
    }

    mostrar() {

        //LIMPIAR EL HTML 
        while (contenedorCitas.firstChild) {
            contenedorCitas.removeChild(contenedorCitas.firstChild)
        }

        //GENERANDO LAS CITAS 
        this.citas.forEach(cita => {
            const divCita = document.createElement('DIV');
            divCita.classList.add('mx-5', 'my-10', 'bg-white', 'shadow-md', 'px-5', 'py-10', 'rounded-xl');

            const paciente = document.createElement('P');
            paciente.classList.add('font-normal', 'mb-3', 'text-gray-700', 'normal-case')
            paciente.innerHTML = `<span class = "font-bold uppercase">Paciente:</span>${cita.paciente}`

            //INYECTAR AL HTML el contenido de paciente
            divCita.appendChild(paciente);


            //se agrega al contenedor informacion del paciente 
            contenedorCitas.appendChild(divCita);
        })
    }
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


const citas = new AdminCitas();

function submitCita(e) {
    e.preventDefault();

    if (Object.values(citaObj).some(valor => valor.trim() === '')) {

        const notificacion = new Notificacion({
            texto: 'Todos los campos son obligatorios',
            tipo: 'error'
        })
        return
    }

    citas.agregar(citaObj);
}

