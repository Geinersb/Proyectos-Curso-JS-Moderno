//////VARIABLES 
const marca = document.querySelector('#marca');
const year = document.querySelector('#year');
const minimo = document.querySelector('#minimo');
const maximo = document.querySelector('#maximo');
const puertas = document.querySelector('#puertas');
const transmision = document.querySelector('#transmision');
const color = document.querySelector('#color');

//contenedor para los resultados
const resultado = document.querySelector('#resultado');

const max = new Date().getFullYear();
const min = max-10;

//GENERAR UN OBJETO CON LA BUSQUEDA 
const datosBusqueda = {
    marca:'',
    year:'',
    minimo:'',
    maximo:'',
    puertas:'',
    transmision:'',
    color:''
   
}

/////EVENTOS
document.addEventListener('DOMContentLoaded', () => {
    mostrarAutos(); //muestra los autos al cargar pagina

    //llena las opciones de años
    llenarSelect();
});

//EVENT LISTENER PARA LOS SELECT DE BUSQUEDA
marca.addEventListener('change',(e)=>{
    datosBusqueda.marca = e.target.value;    
});
year.addEventListener('change',(e)=>{
    datosBusqueda.year = e.target.value;   
  
});
minimo.addEventListener('change',(e)=>{
    datosBusqueda.minimo = e.target.value;   
   
});
maximo.addEventListener('change',(e)=>{
    datosBusqueda.maximo = e.target.value;   
   
});
puertas.addEventListener('change',(e)=>{
    datosBusqueda.puertas = e.target.value;   
  
});
transmision.addEventListener('change',(e)=>{
    datosBusqueda.transmision = e.target.value;   
   
});
color.addEventListener('change',(e)=>{
    datosBusqueda.color = e.target.value;   
    console.log(datosBusqueda) 
})


/////FUNCIONES
function mostrarAutos() {
    autos.forEach(auto => {
        const { marca, modelo, year, puertas, transmision, precio, color } = auto;

        const autoHTML = document.createElement('P');

        autoHTML.textContent = `${marca} ${modelo} - ${year} -${puertas} Puertas - Transmision: ${transmision} - 
    Precio: ${precio}$ - Color: ${color}  
    
    ` ;

        //INSERTAR EN EL HTML
        resultado.appendChild(autoHTML);
    });
}

//GENERA LOS AÑOS DEL SELECT 
function llenarSelect(){
for(let i = max; i >= min; i--  ){
    const opcion = document.createElement('option');
    opcion.value = i;
    opcion.textContent = i;
    year.appendChild(opcion); //agrega opciones del year al Select 
}
}