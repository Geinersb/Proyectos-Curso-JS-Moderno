
const criptomonedasSelect = document.querySelector('#criptomonedas');
const formulario = document.querySelector('#formulario');

//CREAR UN PORMISE
// const obtenerCriptomonedas = criptomonedas => new Promise(resolve =>{
//     resolve(criptomonedas);
// });

document.addEventListener('DOMContentLoaded',()=>{
    consultarCriptomonedas();
})


function consultarCriptomonedas(){
    const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';

    fetch(url)
        .then(respuesta=>{
         return  respuesta.json();
        })
        .then(resultado=>{
            selectCriptomonedas(resultado.Data)
        })
        // .then(criptomonedas => console.log(criptomonedas))
}

function selectCriptomonedas(criptomonedas){
   criptomonedas.forEach(cripto => {
       const {FullName, Name} = cripto.CoinInfo;

       const option = document.createElement('option');
       option.value = Name;
       option.textContent = FullName;
       criptomonedasSelect.appendChild(option);


   });
}