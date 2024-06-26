function conectarDB() {
    //aqui abrimos la conexion 
    const abrirConexion = window.indexedDB.open('crm', 1);

    //si se produce un error 
    abrirConexion.onerror = function () {
        console.log('Hubo un error');
    };

    //si esta correcto 
    abrirConexion.onsuccess = function () {
        DB = abrirConexion.result;
    }
}


function imprimirAlerta(mensaje, tipo) {

    //valida si ya no existe la alerta y la muestra para que no se duplique
    const alerta = document.querySelector('.alerta');
    if (!alerta) {
        //crear la alerta 
        //se crea el div 
        const divMensaje = document.createElement('DIV');
        //se agregan las clases al div 
        divMensaje.classList.add('px-4', 'py-3', 'rounded', 'max-w-lg', 'mx-auto', 'mt-6', 'text-center', 'border', 'alerta');

        if (tipo === 'error') {
            divMensaje.classList.add('bg-red-100', 'border-red-400', 'text-red-700');
        }
        else {
            divMensaje.classList.add('bg-green-100', 'border-green-400', 'text-green-700');

        }

        //se agrega el mensaje al div 
        divMensaje.textContent = mensaje;

        //se inyecta el div al formulario 
        formulario.appendChild(divMensaje);

        setTimeout(() => {
            divMensaje.remove();
        }, 3000);

    }
}