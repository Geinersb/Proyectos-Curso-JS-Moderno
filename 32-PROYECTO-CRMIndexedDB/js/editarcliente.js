(function(){

    let  DB;
    let idCliente;

    const nombreInput = document.querySelector('#nombre');
    const emailInput = document.querySelector('#email');
    const telefonoInput = document.querySelector('#telefono');
    const empresaInput = document.querySelector('#empresa');
   
    const formulario = document.querySelector('#formulario');


    document.addEventListener('DOMContentLoaded',()=>{
        //conectamos a la BD
        conectarDB();

        //Actualiza el registro 
        formulario.addEventListener('submit',actualizarCliente);

            //verificar el ID de la URL, con esto puedo ver los parametros que trae la Url 
            const parametrosURL = new URLSearchParams(window.location.search);

            //con esto obtenemos el id que viene en el url
             idCliente = parametrosURL.get('id');

            if(idCliente){
                //como la creacion de la bd dura un momento en crear hay que atrasar un momento el llamada de esta funcion
                //esto debido a que todavia no se usa asyn y await 
                setTimeout(() => {
                    obtenerCliente(idCliente);
                }, 1000);
                
            }          

    });

    function actualizarCliente(e){
        e.preventDefault();

        if(nombreInput.value === ''|| emailInput.value === ''|| telefonoInput.value === ''|| empresaInput.value === ''){
          imprimirAlerta('Todos los campos son requeridos','error');
                
            return
        }

        //ACTUALIZAR CLIENTE 
        //crea un objeto con los datos que vienen del formulario 
        const clienteActualizado = {
            nombre: nombreInput.value,
            email: emailInput.value,
            telefono: telefonoInput.value,
            empresa: empresaInput.value,
            id: Number(idCliente)
        }

       //ahora con los datos del formulario se insertan en la base de datos con transaction
       const transaction =DB.transaction(['crm'],'readwrite');
       //se crea el objectstore 
       const objectStore = transaction.objectStore('crm');

        objectStore.put(clienteActualizado);

        transaction.oncomplete = function(){
            imprimirAlerta('Registro Actualizado correctamente','sucess');

            setTimeout(() => {
                    window.location.href = 'index.html'; 
            }, 2000);
        }

        transaction.onerror = function(){
            imprimirAlerta('Hubo un error','error');
        }

    }

    function obtenerCliente(id){
        //para traer informacion del registro en la bd hay que usar transaction

        const transaction = DB.transaction(['crm'],'readwrite');

        //luego se crea el objectstore
        const objectStore = transaction.objectStore('crm');

        //se crea el cursor 
        const cliente = objectStore.openCursor();
        //si esta correcto trae la informacion de los datos 
        cliente.onsuccess = function(e){
            const cursor = e.target.result;

            if(cursor){
                //esto compara el id de los datos con el id que trae en el URL que recibe por parametro
                if(cursor.value.id === Number(id)){
                    //con esto llama al metodo para que llene el formulario a editar
                    llenarFormulario(cursor.value);
                }

                cursor.continue();
            }
        }


    }

    function llenarFormulario(datosCliente){
        const {nombre,email,telefono,empresa} = datosCliente

        nombreInput.value = nombre;
        emailInput.value = email;
        telefonoInput.value = telefono;
        empresaInput.value = empresa;
    }


    function conectarDB(){
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


})();