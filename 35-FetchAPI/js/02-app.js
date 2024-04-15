//EN ESTE EJEMPLO SE VA A TRAER DATOS DE UN JSON CON EL FETCH API

const cargarJsonBtn = document.querySelector('#cargarJSON');

cargarJsonBtn.addEventListener('click',obtenerDatos);

function obtenerDatos(){
//aqui declaramos el fetch  y el url de donde se trae la informacion 
const url = 'data/empleado.json';

fetch(url)
    .then(respuesta =>{
        //qui se dice que queremos la respuesta en formatdo JSON 
        return respuesta.json();
    })
    //una vez tengamos la respuesta si quiero la puedo enviar a otra funcion para mostrar en HTML 
    .then(resultado =>{
       mostrarHTML(resultado);
    })   
}

//cons esta funcion muestra en HTMl lo que trae de la funcion del fetch 
function mostrarHTML({empresa, id, nombre, trabajo}){
    const contenido = document.querySelector('.contenido');

    contenido.innerHTML = `
        <p>id: ${id}</p>
        <p>Empleado: ${nombre}</p>
        <p>Empresa: ${empresa}</p>
        <p>Trabajo: ${trabajo}</p>
    `;
}
