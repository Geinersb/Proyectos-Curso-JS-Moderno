
document.addEventListener('DOMContentLoaded',()=>{
    crmDB();
})

function crmDB(){
    //CREAR BASE DE DATOS VERSION 1.0 
    let crmDB = window.indexedDB.open('crm',1.0);

    //si hay un error 
crmDB.onerror = function(){
    console.log('hubo un error a la hora de crear la BD');
}

    //si se creo bien 

    crmDB.onsuccess = function(){
        console.log('Base de datos creada');
    }

    //configuracion de la base de datos 
//este metodo solo se ejecuta una vez 
    crmDB.onupgradeneeded = function (e) {
      const db = e.target.result;

      //aqui se configura para que el id sea autoincrementable
      const objectStore = db.createObjectStore('crm',{
        keyPath: 'crm',
        autoIncrement: true
      });

      //DEFINIR LAS COLUMNAS 
      objectStore.createIndex('nombre', 'nombre',{unique:false});
      objectStore.createIndex('email', 'email',{unique:true});
      objectStore.createIndex('telefono', 'telefono',{unique:false});

      console.log('Columnas creadas');



    }
}