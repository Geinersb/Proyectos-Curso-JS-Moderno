
//si yo quiero que el contenido cargue de forma automatica 
// document.addEventListener('DOMContentLoaded',obtenerDatos);

//AQUI SE VE EL USO DEL FETCH PERO CON UN JSON ARRAY

const cargarJSONArrayBtn = document.querySelector('#cargarJSONArray');
cargarJSONArrayBtn.addEventListener('click',obtenerDatos);

function obtenerDatos(){
    const url = 'data/empleados.json';

    fetch(url)
        .then(respuesta =>{
            return respuesta.json();
        })
        .then(resultado =>{
            mostrarHTML(resultado);
        })
        .catch(error=>{
            console.log(error);
        })
}

function mostrarHTML(empleados){
    const contenido = document.querySelector('.contenido');

    let html = '';

    empleados.forEach(empleado => {
                const {id,nombre,empresa,trabajo}=empleado;

                html += `
                <p> id: ${id} </p>
                <p> nombre: ${nombre} </p>
                <p> empresa: ${empresa} </p>
                <p> trabajo: ${trabajo} </p>
               
            `
    });

        contenido.innerHTML = html;
  
}