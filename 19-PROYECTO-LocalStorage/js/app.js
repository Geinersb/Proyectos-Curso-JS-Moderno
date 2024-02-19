//VARIABLES
const formulario = document.querySelector('#formulario');
const listaTweets = document.querySelector('#lista-tweets');

let tweets = [];

//EVENT LISTENERS 
eventListeners();

function eventListeners() {
    //Cuando el usuario agregar un nuevo Tweet 
    formulario.addEventListener('submit', agregarTweet);

    //Cuando el documento esta listo 
    document.addEventListener('DOMContentLoaded',()=>{
        tweets = JSON.parse(localStorage.getItem('tweets')) || [];

crearHTML();

    })
}


///FUNCIONES 

function agregarTweet(e) {
    e.preventDefault();
    //Textarea donde el usuario escribe 
    const tweet = document.querySelector('#tweet').value;

    //validacion si hay tweet 
    if (tweet === '') {
        mostrarError('Un mensaje No puede ir vacio');
        return; //evita que se ejecute mas lineas de codigo
    }

    const tweetObj = {
        id: Date.now(),
        tweet: tweet
    }
    //SE AGREGA LOS DATOS AL ARREGLO DE TWEETS 
    tweets = [...tweets, tweetObj];

    //una vez agregadop el tweet al arreglo creamos el HTMl 
    crearHTML();

    //REINICIAR EL FORMULARIO 
    formulario.reset();


}

//MOSTRAR MENSAJE DE ERROR 
function mostrarError(error) {
    const mensajeError = document.createElement('P');
    mensajeError.textContent = error;
    mensajeError.classList.add('error');

    //INSERTARLO EN EL CONTENIDO 
    const contenido = document.querySelector('#contenido');
    contenido.appendChild(mensajeError);

    //ELIMINAR LA ALERTA DESPUES DE 3 SEGUNDOS 
    setTimeout(() => {
        mensajeError.remove();
    }, 3000);
}

//muestra el listado de los tweet en el HTML
function crearHTML() {
//se limpia primero el html y luego se agrega 
    limpiarHTML();


    if (tweets.length > 0) {
        tweets.forEach(tweet => {
            //Agregar un boton de eliminar 
            const btnEliminar = document.createElement('a');
            btnEliminar.classList.add('borrar-tweet');
            btnEliminar.innerText = 'X';

            //agregar la funcion de Eliminar
            btnEliminar.onclick = ()=>{
                borrarTweet(tweet.id);
            }

            //crear html 
            const li = document.createElement('li');

            //agregar el texto
            li.textContent = tweet.tweet;

            //Asignar el boton eliminar
            li.appendChild(btnEliminar);

            //insertarlo en el html 
            listaTweets.appendChild(li);
        });
    }

    //esto agrega mis tweets en el Storage
    sincronizarStorage();
}

//funcion que agrega los tweets actuales al local storage
function sincronizarStorage(){

    localStorage.setItem('tweets',JSON.stringify(tweets));
}


//ELIMINAR EL TWEET
function borrarTweet(id){
tweets = tweets.filter(tweet => tweet.id !== id);

crearHTML();
}


//limpiar el HTML 
function limpiarHTML(){
    while(listaTweets.firstChild){
        listaTweets.removeChild(listaTweets.firstChild);
    }
}

