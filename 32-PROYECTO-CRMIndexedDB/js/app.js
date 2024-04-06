(function () {

    //variable global 
    let DB;

    document.addEventListener('DOMContentLoaded', () => {

        crearDB();

        //esta funcion se ejecuta en caso de que ya exista la base de datos 
        if (window.indexedDB.open('crm', 1)) {
            obtenerClientes();
        }
    });

    //CREA LA BASE DE DATOS DE INDEXDB
    function crearDB() {
        //con esto se pone el nombre a la base de datos y la version  y se abre la conexion
        const crearDB = window.indexedDB.open('crm', 1);

        //en caso de error 
        crearDB.onerror = function () {
            console.log('Hubo un error');
        };

        //en caso que se crea correctamente 
        crearDB.onsuccess = function () {
            DB = crearDB.result;
        };

        //esto es una funcion que se corre solo una vez para registrar las tablas 
        crearDB.onupgradeneeded = function (e) {
            const db = e.target.result;

            //con esto se crea el id incrementable y se crea el objecstore el cual sirve para ir creando las columnas 
            const objectStore = db.createObjectStore('crm', { keyPath: 'id', autoIncrement: true });

            //aqui se crea las columnas de los campos del formulario en la  BD 
            objectStore.createIndex('nombre', 'nombre', { unique: false });
            objectStore.createIndex('email', 'email', { unique: true });
            objectStore.createIndex('telefono', 'telefono', { unique: false });
            objectStore.createIndex('empresa', 'empresa', { unique: false });
            objectStore.createIndex('id', 'id', { unique: true });

            console.log('DB lista y creada ');

        }
    }

    function obtenerClientes() {
        //abrimos la conexion a la base de datos 
        const abrirConexion = window.indexedDB.open('crm', 1);

        //si hay error 
        abrirConexion.onerror = function () {
            console.log('hubo un error ');
        }

        //si esta bien 
        abrirConexion.onsuccess = function () {
            DB = abrirConexion.result;

            const objectStore = DB.transaction('crm').objectStore('crm');

            //el cursor lo que hace es burcar los resultados en la DB, y va al siguiente registro y al siguiente automaticamente
            objectStore.openCursor().onsuccess = function (e) {
                const cursor = e.target.result;

                if (cursor) {
                    const { nombre, empresa, email, telefono, id } = cursor.value;

                    //llamamos el id de la tabla del listado del html 
                    const listadoClientes = document.querySelector('#listado-clientes');

                    //insertamos la tabla en el HTML 
                    listadoClientes.innerHTML += ` <tr>
                    <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                        <p class="text-sm leading-5 font-medium text-gray-700 text-lg  font-bold"> ${nombre} </p>
                        <p class="text-sm leading-10 text-gray-700"> ${email} </p>
                    </td>
                    <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 ">
                        <p class="text-gray-700">${telefono}</p>
                    </td>
                    <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200  leading-5 text-gray-700">    
                        <p class="text-gray-600">${empresa}</p>
                    </td>
                    <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5">
                        <a href="editar-cliente.html?id=${id}" class="text-teal-600 hover:text-teal-900 mr-5">Editar</a>
                        <a href="#" data-cliente="${id}" class="text-red-600 hover:text-red-900">Eliminar</a>
                    </td>
                </tr>
            `;


                    //con esto trae el siguiente registro 
                    cursor.continue();
                } else {
                    console.log('No hay mas registros...');
                }
            }


        }


    }
})();