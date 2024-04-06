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



})();