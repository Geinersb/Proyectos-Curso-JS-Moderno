(function () {

    //variable global 
    let DB;

    document.addEventListener('DOMContentLoaded', () => {

        crearDB();
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
            const objectStore = db.createObjectStore('crm',{keyPath: 'id', autoIncrement:true});

            //aqui se crea las columnas de los campos del formulario en la  BD 
            objectStore.createIndex('nombre','nombre',{unique:false});
            objectStore.createIndex('email','email',{unique:true});
            objectStore.createIndex('telefono','telefono',{unique:false});
            objectStore.createIndex('empresa','empresa',{unique:false});
            objectStore.createIndex('id','id',{unique:true});

            console.log('DB lista y creada ');


        }
    }
})();