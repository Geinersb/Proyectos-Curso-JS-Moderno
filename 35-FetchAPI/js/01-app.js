//se recomienda mas usar fetch Api, antes era ajax el que mas usaban 
//este es un ejemplo de como traer datos de un TXT
const cargarTxtBtn = document.querySelector('#cargarTxt');

//al dar click a boton llama funcion obtener datos 
cargarTxtBtn.addEventListener('click', obtenerDatos);



function obtenerDatos(){

    //aqui se pone el url de a donde envia o se trae la informacion 
    const url = 'data/datos.txt';

    //se declara el fetch y se le envia el url , y el fetch utiliza Promises 
    fetch(url)
        .then(respuesta =>{
            //esto es para ver lo que trae respuesta y ver su estado url o tipo
            console.log(respuesta);
            console.log(respuesta.status);
            console.log(respuesta.statusText);
            console.log(respuesta.url);
            console.log(respuesta.type);

            //se puede ver el retorno ya sea Json o Text  en este caso text porque trae texto 
            return respuesta.text();
        })
        //una vez yo tenga la respuesta a la solicitud quiero ejecutar lo siguiente para ver el contenido
        //de la respuesta 
        .then(datos =>{
            console.log(datos);
        })
        //en caso de error de respuesta se usa el catch 
        .catch(error =>{
            console.log(error);
        })
}