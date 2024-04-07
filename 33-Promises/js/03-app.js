
//definimos el promise
//se le agregan dos parametros, uno cuando resuelve bien se cumple el promise y otro cuando da un error (resolve, reject)
const aplicarDescuento = new Promise((resolve,reject)=>{

    const descuento = true;

    if (descuento) {
        resolve('Descuento aplicado')
    }else{
        reject('No se pudo aplicar el descuento')
    }

})

//para utilizar el promise se llama de esta forma
aplicarDescuento
    .then(resultado =>{
    console.log(resultado);
})//si el promise da error entra al catch 
    .catch(error =>{
        console.log(error);
    })

//hay 3 valores posibles de respuesta del promise 

//fulfilled - El promise se cumplio
//rejected - El promise no se cumplio 
//pending - no se ha cumplido y tampoco fue rechazado 
