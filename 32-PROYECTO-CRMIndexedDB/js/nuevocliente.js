//se crea nifi que es para que no salga la informacion de este archivo 
(function () {
    let DB;
    const formulario = document.querySelector('#formulario');

    document.addEventListener('DOMContentLoaded', () => {

        //aqui nos conectamos a la base de datos que ya esta creada en el otro archivo 
        conectarDB();

        //eventos 
        formulario.addEventListener('submit', validarCliente);
    });

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


    function validarCliente(e) {
        e.preventDefault();


        //como solo en esta pantalla se leen dejamos los input locales 
        const nombre = document.querySelector('#nombre').value;
        const email = document.querySelector('#email').value;
        const telefono = document.querySelector('#telefono').value;
        const empresa = document.querySelector('#empresa').value;

        if (nombre === '' || email === '' || telefono === '' || empresa === '') {
            imprimirAlerta('Todos los campos son obligatorios', 'error');

            return;
        }

        //CREAR UN OBJETO CON LA INFORMACION DEL FORMULARIO 
            const cliente = {
                nombre: nombre,
                email: email,
                telefono: telefono,
                empresa: empresa,
                //si no tenemos una bd podemos generar el id con esto 
                id: Date.now()
            }
            
            crearNuevoCliente(cliente);
    }


    function crearNuevoCliente(cliente){
        //con esto llamamos la instancia de la base de datos para utilizar las transacciones 
        const transaction = DB.transaction(['crm'],'readwrite');

        //definimos el object store y le decimos que base a utilizar
        const objectStore = transaction.objectStore('crm');

        //aqui agregamos el registro 
        objectStore.add(cliente);

        //si hay un error
        transaction.onerror = function(){
            imprimirAlerta('Hubo un error a la hora de ingresar registro','error');         
        };
        //si fue correcto 
        transaction.oncomplete = function(){
            imprimirAlerta('Registro ingresado correctamente','sucess');

            //esto me desvia a la pagina de clientes index
            setTimeout(() => {
                    window.location.href = 'index.html';
            }, 3000);
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





})();