//ESTE ES UN EJEMPLO DE UN MAP 
//ES UNA LISTA QUE CONTIENE LLAVE Y VALOR Y RECIBE CUALQUIER TIPO DE VALOR 

const cliente = new Map();

//para agregar datos a un map 
cliente.set('nombre','karen');
cliente.set('tipo','Premium');
cliente.set('saldo',3000);

console.log(cliente)

//para saber cantidad de datos 
console.log(cliente.size)

//comprobar si llave existe 
console.log(cliente.has('nombre'));

//para obtener el valor de una llave 
console.log(cliente.get('nombre'))

//para eliminar un dato 
cliente.delete('saldo')
console.log(cliente)

//para recorrer un map 
cliente.forEach((datos,index)=>{
    console.log(datos)
})
//para limpiar el map
cliente.clear();
console.log(cliente)