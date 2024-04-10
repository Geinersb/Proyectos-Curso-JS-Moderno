//esto nos permite poner contenido en pantalla completa o salir de pantalla completa 
const abriBtn = document.querySelector('#abrir-pantalla-completa');
const salirBtn = document.querySelector('#salir-pantalla-completa');

abriBtn.addEventListener('click',pantallaCompleta);
salirBtn.addEventListener('click',cerrarPantallaCompleta);



function pantallaCompleta(){
    document.documentElement.requestFullscreen();
}

function cerrarPantallaCompleta(){
    document.exitFullscreen();
}