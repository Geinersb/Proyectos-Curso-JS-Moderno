const url ='https://picsum.photos/list';


document.addEventListener('DOMContentLoaded', obtenerDatos);


// function obtenerDatos (){
//     fetch(url)
//         .then(respuesta =>  respuesta.json())
//         .then( (resultado)=>{
//             return console.log(resultado);
//         })
//         .catch(error => console.log(error));
// }

//mismo procedimiento pero con Async y Await 

async function obtenerDatos(){
try {
    const respuesta = await fetch(url);
    const resultado = await respuesta.json();
    console.log(resultado);
} catch (error) {
    console.log(error);
}
}