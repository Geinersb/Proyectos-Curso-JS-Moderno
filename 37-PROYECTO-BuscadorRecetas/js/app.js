function iniciarApp(){

const selectCategorias = document.querySelector('#categorias');
    obtenerCategorias();

    //obtenemos la informacion del API CON EL FETCH 
    function obtenerCategorias(){
        const url = 'https://www.themealdb.com/api/json/v1/1/categories.php';

        fetch(url)
        .then(respuesta =>{
                return respuesta.json();
        })
        //enviamos los datos al otro metodo mostrar categorias
        .then(resultado=>{
           mostrarCategorias(resultado.categories);
        })
    }

//los datos que vienen de la otra funcion los mostramos en el select 
    function mostrarCategorias(categorias=[]){
        categorias.forEach(categoria=>{
            const option = document.createElement('OPTION');
                    option.value =categoria.strCategory;
                    option.textContent = categoria.strCategory;
           selectCategorias.appendChild(option);
        })
    }
}

document.addEventListener('DOMContentLoaded',iniciarApp);