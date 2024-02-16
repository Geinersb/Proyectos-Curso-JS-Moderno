//VARIABLES 
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarrito = [];

cargarEventListener();
function cargarEventListener() {
    //cuando agrega un curso presionado "Agregar al carrito"
    listaCursos.addEventListener('click', agregarCurso);

    //ELIMINA CURSOS DEL CARRITO 
    carrito.addEventListener('click', eliminarCurso);

    //vaciar el carrito
    vaciarCarritoBtn.addEventListener('click', ()=>{
        articulosCarrito =[]; //reseteamos el arreglo
        limpiarHTML(); //eliminamos todo el HTML 
    });
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

//ELIMINA UN CURSO DEL CARRITO 
function eliminarCurso(e){

   if(e.target.classList.contains('borrar-curso')){

    const cursoId = e.target.getAttribute('data-id');
    const existe = articulosCarrito.some(curso => {
        if(curso.id === cursoId){
            if(curso.cantidad>1){
                curso.cantidad--;
                carritoHTML();
            }else{
                articulosCarrito = articulosCarrito.filter((curso) => curso.id !== cursoId);
                carritoHTML();
            }
        }
    })
  
   }
}



//LEE EL CONTENIDO DEL HTML AL QUE DIMOS CLICK 
function leerDatosCurso(curso) {
    // console.log(curso);

    //crear un objeto con el contenido del curso actual seleccionado
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }

//REVISA SI UN ELEMENTO YA EXISTE EN EL CARRITO 
const existe = articulosCarrito.some(curso => curso.id  === infoCurso.id);

if(existe){
//Actualizamos la cantidad
const cursos = articulosCarrito.map(curso =>{

    if(curso.id  === infoCurso.id){
        curso.cantidad++;
        return curso;  //retorna el objeto actualizado
    }  else{
        return curso; //retorna los objetos que no son los duplicados
    }
});
articulosCarrito = [...cursos];
}else{
 //AGREGA ELEMENTOS AL ARREGLO DE CARRITO 
 articulosCarrito = [...articulosCarrito, infoCurso];   
}
   

console.log(articulosCarrito);

    //se llama funciona que muestra el carrito en html
    carritoHTML();
}


//MUESTRA EL CARRITO DE COMPRAS EN HTML
function carritoHTML() {
    //LIMPIAR EL HTML
    limpiarHTML();

    //RECORRE EL CARRITO Y GENERA EL HTML 
    articulosCarrito.forEach((curso) => {
        const{imagen,titulo,precio,cantidad,id} = curso;


        const row = document.createElement('tr');
        row.innerHTML = `
        <td>
                <img src="${imagen}" width="100">
        </td>

        <td>
            ${titulo}
        </td>

        <td>
            ${precio}
        </td>
        
        <td>
            ${cantidad}
        </td>

        <td>
          <a href="#" class="borrar-curso" data-id="${id}"> X </a>
        </td>
        `;

        //AGREGA EL HTML DEL CARRITO EN EL TBODY DE LA TABLA 
        contenedorCarrito.appendChild(row);
    });
}

//ELIMINA LOS CURSOS DEL TBODY
function limpiarHTML() {
    //forma lenta para limpiar
     //contenedorCarrito.innerHTML = '';

    while (contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}

