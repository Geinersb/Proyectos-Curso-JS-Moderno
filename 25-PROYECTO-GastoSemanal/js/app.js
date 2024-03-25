//VARIABLES Y SELECTORES 
const formulario = document.querySelector('#agregar-gasto');
const gastoListado = document.querySelector('#gastos ul');



///EVENTOS 
eventListeners();
function eventListeners() {
    document.addEventListener('DOMContentLoaded', preguntarPresupuesto);

    formulario.addEventListener('submit', agregarGasto);
}



///CLASES 

class Presupuesto {
    constructor(presupuesto) {
        this.presupuesto = Number(presupuesto);
        this.restante = Number(presupuesto);
        this.gastos = [];
    }

    nuevoGasto(gasto) {
        this.gastos = [...this.gastos, gasto];
        this.calcularRestante();

    }

    calcularRestante() {
        const gastado = this.gastos.reduce((total, gasto) => total + gasto.cantidad, 0);
        this.restante = this.presupuesto - gastado;
    }

    eliminarGasto(id){
        this.gastos = this.gastos.filter(gasto => gasto.id  !== id);
        this.calcularRestante();
    }

}



class UI {
    insertarPresupuesto(cantidad) {
        //Extrayendo los valores 
        const { presupuesto, restante } = cantidad;
        //Agregar al HTML 
        document.querySelector('#total').textContent = presupuesto;
        document.querySelector('#restante').textContent = restante;
    }

    imprimirAlerta(mensaje, tipo) {
        //crear el DIV
        const divMensaje = document.createElement('div');
        divMensaje.classList.add('text-center', 'alert');

        if (tipo === 'error') {
            divMensaje.classList.add('alert-danger');
        } else {
            divMensaje.classList.add('alert-success');
        }

        //MENSAJE DE ERROR 
        divMensaje.textContent = mensaje;

        //INSERTAR EN EL HTML 
        document.querySelector('.primario').insertBefore(divMensaje, formulario);

        //QUITAR DEL HTML 
        setTimeout(() => {
            divMensaje.remove();
        }, 3000);
    }

    mostrarGastos(gastos) {

        this.limpiarHTML(); //ELIMINA EL HTML PREVIO 

        //ITERAR SOBRE LOS GASTOS 
        gastos.forEach(gasto => {
            const { cantidad, nombre, id } = gasto;

            //CREAR UN LI 
            const nuevoGasto = document.createElement('li');
            nuevoGasto.className = 'list-group-item d-flex justify-content-between align-items-center ';
            nuevoGasto.dataset.id = id;


            ///AGREGAR EL HTML DEL GASTO 
            nuevoGasto.innerHTML = `${nombre} <span class="badge badge-primary badge-pill"> $ ${cantidad} </span> `

            //BOTON PARA BORRAR EL GASTO 
            const btnBorrar = document.createElement('button');
            btnBorrar.classList.add('btn', 'btn-danger', 'borrar-gasto');
            btnBorrar.innerHTML = 'Borrar &times;'
            btnBorrar.onclick = ()=>{
                eliminarGasto(id);
            }
            nuevoGasto.appendChild(btnBorrar);




            //AGREGAR AL HTML 
            gastoListado.appendChild(nuevoGasto);
        });
    }

    limpiarHTML() {
        ''
        while (gastoListado.firstChild) {
            gastoListado.removeChild(gastoListado.firstChild);
        }
    }

    actualizarRestante(restante) {
        document.querySelector('#restante').textContent = restante;
    }

    comprobarPresupuesto(presupuestoObj) {
        const { presupuesto, restante } = presupuestoObj;

        const restanteDiv = document.querySelector('.restante');


        //COMPROBAR EL 25% DE PRESUPUESTO
        if ((presupuesto / 4) > restante) {
            restanteDiv.classList.remove('alert-success', 'alert-warning');
            restanteDiv.classList.add('alert-danger');
        }else if((presupuesto / 2 ) > restante){
            restanteDiv.classList.remove('alert-success');
            restanteDiv.classList.add('alert-warning');
        }else{
            restanteDiv.classList.remove('alert-danger', 'alert-warning');
            restanteDiv.classList.add('alert-success');
        }

        //SI EL TOTAL ES 0 O MENOR 
        if(restante <= 0){
            ui.imprimirAlerta('El presupuesto se ha agotado','error');
            formulario.querySelector('button[type="submit"]').disabled = true;
        }
    }
}



//instanciar
const ui = new UI();
let presupuesto;




///FUNCIONES 
function preguntarPresupuesto() {
    const presupuestoUsuario = prompt('Cual es tu Presupuesto?');

    // console.log(Number( presupuestoUsuario));

    if (presupuestoUsuario === '' || presupuestoUsuario === null || isNaN(presupuestoUsuario) || presupuestoUsuario <= 0) {
        window.location.reload();
    }

    //presupuesto valido 
    presupuesto = new Presupuesto(presupuestoUsuario);
   

    ui.insertarPresupuesto(presupuesto)
}


//AGREGAR GASTOS 
function agregarGasto(e) {
    e.preventDefault();

    //Leer los datos del formulario
    const nombre = document.querySelector('#gasto').value;
    const cantidad = Number(document.querySelector('#cantidad').value);

    //Validar 
    if (nombre === '' || cantidad === '') {
        ui.imprimirAlerta('Ambos campos son obligatorios', 'error');
        return;
    } else if (cantidad <= 0 || isNaN(cantidad)) {

        ui.imprimirAlerta('Cantidad no valida', 'error');
        return;
    }

    //GENERAR UN OBJETO CON EL GASTO 
    const gasto = { nombre, cantidad, id: Date.now() }

    //AGREGA UN NUEVO GASTO 
    presupuesto.nuevoGasto(gasto);

    //MENSAJE DE GASTRO AGREGADO CORRECTAMENTE 
    ui.imprimirAlerta('Gasto Agregado', 'OK');

    //IMPRMIR LOS GASTOS 
    const { gastos, restante } = presupuesto;
    ui.mostrarGastos(gastos);

    ui.actualizarRestante(restante);

    ui.comprobarPresupuesto(presupuesto)

    //REINICIA EL FORMULARIO 
    formulario.reset();

}

function eliminarGasto(id){
    //ELIMINA DEL OBJETO LOS GASTOS
    presupuesto.eliminarGasto(id);

    //ELIMINA LOS GATOS DEL HTML 
    const {gastos,restante} = presupuesto;
    ui.mostrarGastos(gastos);

    ui.actualizarRestante(restante);

    ui.comprobarPresupuesto(presupuesto)
}