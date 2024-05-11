
const url = 'http://localhost:4000/clientes';


//CUANDO SE CREA UN NUEVO CLIENTE 
export const nuevoCliente =  async (cliente)=>{

    //para decirle al api que es insertar datos al metodo fetch se le agrega el metodo POST y se agrega el body 
    try {
    await  fetch(url,{
        method: 'POST',
        //el body se envia como string o como objeto 
        body: JSON.stringify(cliente),
        //el tipo que se le envia al header es application/json si es archivos lo que se envia es otro tipo 
        headers:{
            'Content-Type': 'application/json'
        }
       })  ;

       //una vez se inserte enviamos al usuario al index

       window.location.href = 'index.html';

    } catch (error) {
        console.log(error);
    }
}

//OBTIENE INFORMACION DE TODOS LOS CLIENTES 
export const obtenerclientes = async()=>{
    try {
            const resultado = await fetch(url);
            const clientes = await resultado.json();
            return clientes;

    } catch (error) {
        console.log(error);
    }
}

///ELIMINA UN CLIENTE 
//se le envia como metodo DELETE y al url se le envia el id a eliminar 
export const eliminarcliente = async (id)=>{
    try {
        await fetch(`${url}/${id}`,{
            method: 'DELETE',
            
        });
    } catch (error) {
        console.log(error);
    }
}

//OBTIENE UN CLIENTE POR ID PARA EDITARLO 

export const obtenerCliente  =  async(id)=>{
try {
    
const resultado =  await fetch(`${url}/${id}`);
const cliente = await resultado.json();

return cliente;


} catch (error) {
    console.log(error);
}
}


//ACTUALIZA UN REGISTRO DE CLIENTE 
export const editarCliente  = async(cliente) =>{
try {
 await fetch(`${url}/${cliente.id}`,{
    method:'PUT',
    body: JSON.stringify(cliente),
    headers: {
        'Content-Type': 'application/json'
    }
   } );

   window.location.href = 'index.html'; 

} catch (error) {
 console.log(error);   
}
}