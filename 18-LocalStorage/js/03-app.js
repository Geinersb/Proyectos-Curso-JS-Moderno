//Con esta forma elimino los datos del Local Storage
localStorage.removeItem('nombre');

//PARA ACTUALIZAR UN REGISTRO EN EL LOCAL STORAGE NO HAY ELEMENTO HAY QUE AGREGARLO
const mesesArrayNuevo = JSON.parse(localStorage.getItem('meses'));
console.log(mesesArrayNuevo);
mesesArrayNuevo.push('Nuevo Mes');
console.log(mesesArrayNuevo);

localStorage.setItem('meses',JSON.stringify(mesesArrayNuevo));


//METODO PARA LIMPIAR TODO EL LOCAL STORAGE 
localStorage.clear();