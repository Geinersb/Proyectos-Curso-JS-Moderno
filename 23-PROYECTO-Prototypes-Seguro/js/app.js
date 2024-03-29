

//CONSTRUCTORES
function Seguro(marca, year, tipo) {
    this.marca = marca;
    this.year = year;
    this.tipo = tipo;
}

//REALIZA LA COTIZACION CON LOS DATOS 
Seguro.prototype.cotizarSeguro = function () {
    /*
    1 = Americano 1.15
    2= Asiatico 1.05
    3 = Europeo 1.35    
    */
    let cantidad;
    const base = 2000;
    // console.log(this.marca);

    switch (this.marca) {
        case '1':
            cantidad = base * 1.15;
            break;

        case '2':
            cantidad = base * 1.05;

            break;

        case '3':
            cantidad = base * 1.35;

            break;

        default:
            break;
    }

    //LEER EL YEAR 
    const diferencia = new Date().getFullYear() - this.year;
    //cada year que la diferencia es mayor, el costo va a reducire un 3%
    cantidad -= ((diferencia * 3) * cantidad) / 100;

    /*
    Si el seguro es basico se multiplica por un 30% mas
    Si el seguro es Completo  se multiplica por un 50% mas
    */

    if (this.tipo === 'basico') {
        cantidad *= 1.30;
    } else {
        cantidad *= 1.50;
    }

    return cantidad;
}

function UI() { }

//Llena las opciones de los years
UI.prototype.llenarOpciones = () => {
    const max = new Date().getFullYear(),
        min = max - 20;
    const selectYear = document.querySelector('#year');

    for (let i = max; i >= min; i--) {
        let option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        selectYear.appendChild(option);
    }
}


//MUESTRA ALERTAS EN PANTALL 
UI.prototype.mostrarMensaje = (mensaje, tipo) => {
    const div = document.createElement('div');
    if (tipo === 'error') {
        div.classList.add('error');
    } else {
        div.classList.add('correcto');
    }

    div.classList.add('mensaje', 'mt-10');
    div.textContent = mensaje;

    //INSERTAR EN EL HTML 
    const formulario = document.querySelector('#cotizar-seguro');
    formulario.insertBefore(div, document.querySelector('#resultado'));

    setTimeout(() => {
        div.remove();
    }, 3000);
}

//MOSTRAR EL RESULTADO 
UI.prototype.mostrarResultado = (total, seguro) => {

    const { marca, year, tipo } = seguro;
    let textoMarca;
    switch (marca) {
        case '1':
            textoMarca= 'Americano';
            break;
        case '2':
            textoMarca= 'Asiatico';

            break;
        case '3':
            textoMarca= 'Europeo';
            break;

        default:
            break;
    }

    //crear el resultado 
    const div = document.createElement('div');
    div.classList.add('mt-10');
    div.innerHTML = `
        <p class="header"> Tu Resumen </p>
        <p class="font-bold"> Marca: <span class="font-normal"> ${textoMarca}</span></p>
        <p class="font-bold"> Año: <span class="font-normal"> ${year}</span></p>
        <p class="font-bold"> Tipo de Seguro: <span class="font-normal capitalize"> ${tipo}</span></p>
        <p class="font-bold"> Total: <span class="font-normal"> $${total}</span></p>
    `;

    const resultadoDiv = document.querySelector('#resultado');
    //MOSTRAR EL SPINNER
    const spinner = document.querySelector('#cargando');
    spinner.style.display = 'block';

    setTimeout(() => {
        spinner.style.display = 'none'; //se borra el spinner 
        resultadoDiv.appendChild(div); //se muestra el resultado 
    }, 3000);
}

//INSTANCIAR UI 
const ui = new UI();

//cuando el documento este listo se llama la funcion
document.addEventListener('DOMContentLoaded', () => {
    ui.llenarOpciones(); //LENA EL SELECT CON LOS YEARS 
})

evenListeners();
function evenListeners() {
    const formulario = document.querySelector('#cotizar-seguro');
    formulario.addEventListener('submit', cotizarSeguro);
}

function cotizarSeguro(e) {
    e.preventDefault();

    //LEER LA MARCA SELECCIONADA
    const marca = document.querySelector('#marca').value;

    //LEER EL YEAR SELECCIONADO
    const year = document.querySelector('#year').value;

    //LEER EL TIPO DE COBERTURA
    const tipo = document.querySelector('input[name="tipo"]:checked').value;

    if (marca === '' || year === '' || tipo === '') {
        ui.mostrarMensaje('Todos los campos son obligatorios', 'error');
        return;
    }

    ui.mostrarMensaje('Cotizando...', 'exito');

    //OCULTAR LAS COTIZACIONES PREVIAS 
    const resultados = document.querySelector('#resultado div');
    if (resultados != null) {
        resultados.remove();
    }

    //INSTANCIAR EL SEGURO 
    const seguro = new Seguro(marca, year, tipo);
    const total = seguro.cotizarSeguro();

    //utilizar el prototype que va a cotizar
    ui.mostrarResultado(total, seguro);

}