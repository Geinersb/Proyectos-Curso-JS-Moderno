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

const categorias = {
  1: "Comida",
  2: "Bebidas",
  3: "Postres",
};

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
  cliente = { ...cliente, mesa, hora };

  //ocultar modal
  const modalFormulario = document.querySelector("#formulario");
  const modalBootstrap = bootstrap.Modal.getInstance(modalFormulario);
  modalBootstrap.hide();

  //mostrar las secciones
  mostrarSecciones();

  //obtener platillos de la API de JSON-SERVER
  obtenerPlatillos();
}

function mostrarSecciones() {
  const seccionesOcultas = document.querySelectorAll(".d-none");
  seccionesOcultas.forEach((seccion) => {
    return seccion.classList.remove("d-none");
  });
}

function obtenerPlatillos() {
  const url = "http://localhost:4000/platillos";

  fetch(url)
    .then((respuesta) => {
      return respuesta.json();
    })
    .then((resultado) => {
      mostrarPlatillos(resultado);
    })
    .catch((error) => console.log(error));
}

function mostrarPlatillos(platillos) {
  const contenido = document.querySelector("#platillos .contenido");

  platillos.forEach((platillo) => {
    const row = document.createElement("DIV");
    row.classList.add("row", "py-3", "border-top");

    const nombre = document.createElement("DIV");
    nombre.classList.add("col-md-4");
    nombre.textContent = platillo.nombre;

    const precio = document.createElement("DIV");
    precio.classList.add("col-md-3", "fw-bold");
    precio.textContent = `$ ${platillo.precio}`;

    const categoria = document.createElement("DIV");
    categoria.classList.add("col-md-3");
    categoria.textContent = categorias[platillo.categoria];

    const inputCantidad = document.createElement("INPUT");
    inputCantidad.type = "number";
    inputCantidad.min = 0;
    inputCantidad.value = 0;
    inputCantidad.id = `producto-${platillo.id}`;
    inputCantidad.classList.add("form-control");

    //funcion que detecta la cantidad y el platillo seleccionado
    inputCantidad.onchange = function () {
      const cantidad = parseInt(inputCantidad.value);
      agregarPlatillo({ ...platillo, cantidad });
    };

    const agregar = document.createElement("DIV");
    agregar.classList.add("col-md-2");
    agregar.appendChild(inputCantidad);

    row.appendChild(nombre);
    row.appendChild(precio);
    row.appendChild(categoria);
    row.appendChild(agregar);
    contenido.appendChild(row);
  });
}

function agregarPlatillo(producto) {
  //extraer el pedido actual
  let { pedido } = cliente;

  //revisar que la cantidad sea mayor a 0

  if (producto.cantidad > 0) {
    //comprueba si elemento ya existe en el arreglo
    if (pedido.some((articulo) => articulo.id === producto.id)) {
      //el articulo ya existe , actualizar la cantidad
      const pedidoActualizado = pedido.map((articulo) => {
        if (articulo.id === producto.id) {
          articulo.cantidad = producto.cantidad;
        }
        return articulo;
      });
      //se asigna el nuevo array a cliente.pedido
      cliente.pedido = [...pedidoActualizado];
    } else {
      //el articulo no existe lo agregamos al array de pedido
      cliente.pedido = [...pedido, producto];
    }
  } else {
    //ELIMINAR ELEMENTOS CUANDO LA CANTIDAD ES 0
    const resultado = pedido.filter((articulo) => articulo.id !== producto.id);
    cliente.pedido = [...resultado];
  }

  //limpiar el codigo HTML previo
  limpiarHTML();

  // MOSTRAR EL RESUMEN
  actualizarResumen();
}

function actualizarResumen() {
  const contenido = document.querySelector("#resumen .contenido");

  const resumen = document.createElement("DIV");
  resumen.classList.add("col-md-6", "card", "py-5", "px-3", "shadow");

  //informacion de la mesa
  const mesa = document.createElement("P");
  mesa.textContent = "Mesa: ";
  mesa.classList.add("fw-bold");

  const mesaSpan = document.createElement("SPAN");
  mesaSpan.textContent = cliente.mesa;
  mesaSpan.classList.add("fw-normal");

  //informacion de la hora
  const hora = document.createElement("P");
  hora.textContent = "Hora: ";
  hora.classList.add("fw-bold");

  const horaSpan = document.createElement("SPAN");
  horaSpan.textContent = cliente.hora;
  horaSpan.classList.add("fw-normal");

  //agregar a los elementos padre
  mesa.appendChild(mesaSpan);
  hora.appendChild(horaSpan);

  //Titulo de la seccion
  const heading = document.createElement("H3");
  heading.textContent = "Platillos Consumidos";
  heading.classList.add("my-4", "text-center");

  // Iterar sobre el Array de pedidos
  const grupo = document.createElement("UL");
  grupo.classList.add("list-group");

  const { pedido } = cliente;
  pedido.forEach((articulo) => {
    const { nombre, cantidad, precio, id } = articulo;

    const lista = document.createElement("LI");
    lista.classList.add('list-group-item');
   
    //nombre del platillo 
    const nombreEl = document.createElement('H4');
    nombreEl.classList.add('my-4');
    nombreEl.textContent = nombre;

    //cantidad del articulo 
    const canditadEl = document.createElement('P');
    canditadEl.classList.add('fw-bold');
    canditadEl.textContent = 'Cantidad: ';

    const cantidadValor = document.createElement('SPAN');
    cantidadValor.classList.add('fw-normal');
    cantidadValor.textContent = cantidad;

       //precio del articulo 
       const precioEl = document.createElement('P');
       precioEl.classList.add('fw-bold');
       precioEl.textContent = 'Precio: ';
   
       const precioValor = document.createElement('SPAN');
       precioValor.classList.add('fw-normal');
       precioValor.textContent = `$ ${precio}`;

         //SUBTOTAL del articulo 
         const subtotalEl = document.createElement('P');
         subtotalEl.classList.add('fw-bold');
         subtotalEl.textContent = 'Subtotal: ';
     
         const subtotalValor = document.createElement('SPAN');
         subtotalValor.classList.add('fw-normal');
         subtotalValor.textContent = calcularSubtotal(precio, cantidad);

    //Agregar valores a sus contenedores
    canditadEl.appendChild(cantidadValor);
    precioEl.appendChild(precioValor);
    subtotalEl.appendChild(subtotalValor);

    //Agregar Elementos al LI 
    lista.appendChild(nombreEl);
    lista.appendChild(canditadEl);
    lista.appendChild(precioEl);
    lista.appendChild(subtotalEl);

    //Agregar lista al grupo principal
    grupo.appendChild(lista);

  });

  //agregar al contenido
  resumen.appendChild(mesa);
  resumen.appendChild(hora);
  resumen.appendChild(heading);
  resumen.appendChild(grupo);

  contenido.appendChild(resumen);
}

function limpiarHTML() {
  const contenido = document.querySelector("#resumen .contenido");

  while (contenido.firstChild) {
    contenido.removeChild(contenido.firstChild);
  }
}

function calcularSubtotal(precio, cantidad){
 const subtotal = `$ ${precio * cantidad}`;
 return subtotal;
}