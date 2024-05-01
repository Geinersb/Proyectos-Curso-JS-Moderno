//se instala Json Server por cli con npm install -g json-server
//PAra poder crear la API con json se ejecuta el ultimo comando para que lea el json y si no se corre estos codigos
// Lo primero que tienes que hacer es ir a Powershell y ejecutarla como administrador
// Después de eso poner el comando
// Get-ExecutionPolicy
// Si les sale algo como Restrcited o Allsigned usen el comando:
// Set-ExecutionPolicy Bypass
// ahora si podrán correr el comando de:
// json-server --watch db.json

let cliente = {
  mesa: "",
  hora: "",
  pedido: [],
};

const categorias ={
    1: 'Comida',
    2: 'Bebidas',
    3: 'Postres'
}

const btnGuardarCliente = document.querySelector("#guardar-cliente");
btnGuardarCliente.addEventListener("click", guardarCliente);

function guardarCliente() {
  const mesa = document.querySelector("#mesa").value;
  const hora = document.querySelector("#hora").value;

  //revisar si hay campos vacios, si hay uno vacio el lo encuentra con some
  const camposVacios = [mesa, hora].some((campo) => campo === "");

  if (camposVacios) {
    //verificar si ya hay una alerta
    const existeAlerta = document.querySelector(".invalid-feedback");

    if (!existeAlerta) {
      const alerta = document.createElement("DIV");
      alerta.classList.add("invalid-feedback", "d-block", "text-center");
      alerta.textContent = "Todos los campos son obligatorios";
      document.querySelector(".modal-body form").appendChild(alerta);

      //eliminar la alerta
      setTimeout(() => {
            alerta.remove();
      }, 3000);
    }
    return;
  }
 
 //asignar datos del formulario al cliente
  cliente = {...cliente,mesa,hora}

//ocultar modal 
const modalFormulario = document.querySelector('#formulario');
const modalBootstrap = bootstrap.Modal.getInstance(modalFormulario);
modalBootstrap.hide();

//mostrar las secciones
mostrarSecciones();

//obtener platillos de la API de JSON-SERVER 
obtenerPlatillos();
}

function mostrarSecciones(){
    const seccionesOcultas = document.querySelectorAll('.d-none');
    seccionesOcultas.forEach(seccion =>{
       return seccion.classList.remove('d-none');
    })

}

function obtenerPlatillos(){
    const url = 'http://localhost:4000/platillos';

    fetch(url)
    .then(respuesta =>{
        return respuesta.json();
    })
    .then(resultado =>{
        mostrarPlatillos(resultado);
    })
    .catch(error => console.log(error));
}

function mostrarPlatillos(platillos){
   const contenido = document.querySelector('#platillos .contenido');

   platillos.forEach(platillo =>{
    const row = document.createElement('DIV');
    row.classList.add('row' ,'py-3','border-top');

    const nombre = document.createElement('DIV');
    nombre.classList.add('col-md-4');
    nombre.textContent = platillo.nombre;


    const precio = document.createElement('DIV');
    precio.classList.add('col-md-3', 'fw-bold');
    precio.textContent = `$ ${platillo.precio}` ;

    const categoria = document.createElement('DIV');
    categoria.classList.add('col-md-3');
    categoria.textContent = categorias[platillo.categoria];

    const inputCantidad = document.createElement('INPUT');
    inputCantidad.type = 'number';
    inputCantidad.min = 0;
    inputCantidad.value = 0;
    inputCantidad.id = `producto-${platillo.id}`;
    inputCantidad.classList.add('form-control');

    //funcion que detecta la cantidad y el platillo seleccionado 
    inputCantidad.onchange = function(){
        const cantidad = parseInt(inputCantidad.value);
        agregarPlatillo({...platillo,cantidad});
    }

    const agregar = document.createElement('DIV');
    agregar.classList.add('col-md-2');
    agregar.appendChild(inputCantidad);

    row.appendChild(nombre);
    row.appendChild(precio);
    row.appendChild(categoria);
    row.appendChild(agregar);
    contenido.appendChild(row);
   })

}

function agregarPlatillo(producto){
//extraer el pedido actual 
let {pedido} = cliente;

   //revisar que la cantidad sea mayor a 0

   if(producto.cantidad >0){
        cliente.pedido = [...pedido,producto];
   }
   else{

   }

   console.log(cliente.pedido);
}