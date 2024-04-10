//el visibilityChange sirve para detectar si estoy en la pagina o si cambio de pagina mostrando hidden o visible

document.addEventListener('visibilitychange',()=>{
   if(document.visibilityState === 'visible'){
    console.log('Ejecutar la funcion para reproducir el video');
   }
   else{
console.log('Pausar el video');
   }
})