//////VARIABLES 
const resultado = document.querySelector('#resultado');
const year = document.querySelector('#year');

const max = new Date().getFullYear();
const min = max-10;



/////EVENTOS
document.addEventListener('DOMContentLoaded', () => {
    mostrarAutos(); //muestra los autos al cargar pagina


    //llena las opciones de años
    llenarSelect();



});


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