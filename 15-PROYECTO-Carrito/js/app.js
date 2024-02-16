//VARIABLES 
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarrito = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarrito = [];

cargarEventListener();
function cargarEventListener() {
    //cuando agrega un curso presionado "Agregar al carrito"
    listaCursos.addEventListener('click', agregarCurso);
}


//FUNCIONES 
function agregarCurso(e) {
    //esto para evitar que salte al inicio cuando presiono boton agregar carrito
    e.preventDefault();
    //busca el boton con la clase indicada 
    if (e.target.classList.contains('agregar-carrito')) {
        const cursoSeleccionado = e.target.parentElement.parentElement;

        leerDatosCurso(cursoSeleccionado);
    }

}

//LEE EL CONTENIDO DEL HTML AL QUE DIMOS CLICK 
function leerDatosCurso(curso) {
   // console.log(curso);

    //crear un objeto con el contenido del curso actual seleccionado
    const infoCurso ={
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }

    //AGREGA ELEMENTOS AL ARREGLO DE CARRITO 
    articulosCarrito = [...articulosCarrito, infoCurso];

    console.log(articulosCarrito);

    //se llama funciona que muestra el carrito en html
    carritoHTML();
}

//MUESTRA EL CARRITO DE COMPRAS EN HTML
function carritoHTML(){

//LIMPIAR EL HTML
limpiarHTML();

//RECORRE EL CARRITO Y GENERA EL HTML 
    articulosCarrito.forEach( (curso) =>{
        const row = document.createElement('tr');
        row.innerHTML= `
        <td>
            ${curso.titulo}
        </td>
        `;

        //AGREGA EL HTML DEL CARRITO EN EL TBODY DE LA TABLA 
        contenedorCarrito.appendChild(row)
    });
}

//ELIMINA LOS CURSOS DEL TBODY
function limpiarHTML(){
    //forma lenta para limpiar
   // contenedorCarrito.innerHTML = '';

   while(contenedorCarrito.firstChild){
    contenedorCarrito.removeChild(contenedorCarrito.firstChild);
   }
}