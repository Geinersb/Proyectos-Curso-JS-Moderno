function iniciarApp() {

    const resultado = document.querySelector('#resultado');
    const selectCategorias = document.querySelector('#categorias');

    if(selectCategorias){
        selectCategorias.addEventListener('change', seleccionarCategoria);
        obtenerCategorias();
    }

    const favoritosDiv = document.querySelector('.favoritos');
    if(favoritosDiv){
        obtenerFavoritos();
    }

    const modal = new bootstrap.Modal('#modal',{});



    //obtenemos la informacion del API CON EL FETCH 
    function obtenerCategorias() {
        const url = 'https://www.themealdb.com/api/json/v1/1/categories.php';

        fetch(url)
            .then(respuesta => {
                return respuesta.json();
            })
            //enviamos los datos al otro metodo mostrar categorias
            .then(resultado => {
                mostrarCategorias(resultado.categories);
            })
    }

    //los datos que vienen de la otra funcion los mostramos en el select 
    function mostrarCategorias(categorias = []) {
        categorias.forEach(categoria => {
            const option = document.createElement('OPTION');
            option.value = categoria.strCategory;
            option.textContent = categoria.strCategory;
            selectCategorias.appendChild(option);
        })
    }

    function seleccionarCategoria(e) {
        const categoria = e.target.value;
        const url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoria}`

        fetch(url)
            .then(respuesta => {
                return respuesta.json();
            })
            .then(resultado => {
                mostrarRecetas(resultado.meals);
            })

    }

    function mostrarRecetas(recetas = []) {
        limpiarHTML(resultado);

        const heading = document.createElement('H2');
        heading.classList.add('text-center','text-black','my-5');
        heading.textContent = recetas.length ? 'Resultados' : 'No hay Resultados';
        resultado.appendChild(heading);

        //ITERAR EN LOS RESULTADOS 
        recetas.forEach(receta => {
            const { idMeal, strMeal, strMealThumb } = receta;

            //se crea contenedor
            const recetaContenedor = document.createElement('DIV');
            recetaContenedor.classList.add('col-md-4');

            ///se crea la tarjeta
            const recetaCard = document.createElement('DIV');
            recetaCard.classList.add('card', 'mb-4');

            //se inserta la imagen
            const recetaImagen = document.createElement('IMG');
            recetaImagen.classList.add('card-img-top');
            recetaImagen.alt = `Imagen de la receta ${strMeal ?? receta.titulo}`;
            recetaImagen.src = strMealThumb ?? receta.img;

            //se crea el cuerpo 
            const recetaCardBody = document.createElement('DIV');
            recetaCardBody.classList.add('card-body');

            //se crea el titulo 
            const recetaHeading = document.createElement('H3');
            recetaHeading.classList.add('card-title', 'mb-3');
            recetaHeading.textContent = strMeal ?? receta.titulo;

            //se crea el boton 
            const recetaButton = document.createElement('BUTTON');
            recetaButton.classList.add('btn', 'btn-danger', 'w-100');
            recetaButton.textContent = 'Ver Receta';
            // recetaButton.dataset.bsTarget = "#modal";
            // recetaButton.dataset.bsToggle = "modal";
            recetaButton.onclick = function(){
                seleccionarReceta(idMeal ?? receta.id);
            }

                //INYECTAR EN EL HTML 
                //al body se ingresa el heading y el boton
                recetaCardBody.appendChild(recetaHeading);
                recetaCardBody.appendChild(recetaButton);
                // a la tarjeta se inserta imagen y lo que trae el heading y boton 
                recetaCard.appendChild(recetaImagen);
                recetaCard.appendChild(recetaCardBody);

                //al contenedor se ingresa la tarjeta ya completa 
                recetaContenedor.appendChild(recetaCard);

                //al div que esta en html se inyecta ya toda la tarjeta 
                resultado.appendChild(recetaContenedor);
        })
    }

    function seleccionarReceta(id){
       
        const url = `https://themealdb.com/api/json/v1/1/lookup.php?i=${id}`;

        fetch(url)
            .then(respuesta=>{
              return respuesta.json();
            })
            .then(resultado =>{
                mostrarRecetaModal(resultado.meals[0]);
            })
    }

    function mostrarRecetaModal(receta){
       
        const {idMeal, strInstructions,strMeal,strMealThumb}= receta;

        //agregar contenido al modal 
        const modalTitle= document.querySelector('.modal .modal-title');
        const modalBody= document.querySelector('.modal .modal-body');

        modalTitle.textContent = strMeal;
        modalBody.innerHTML = `
                <img class="img-fluid" src="${strMealThumb}" alt="receta ${strMeal}"/>
                <h3 class ="my-3">Instrucciones</h3>
                <p>${strInstructions}</p>
                <h3 class ="my-3">Ingredientes y Cantidades</h3>
        `;

        const listGroup = document.createElement('UL');
        listGroup.classList.add('list-group');

        //mostrar cantidades e ingredientes 
        for(let i=1; i<=20; i++){
            if(receta[`strIngredient${i}`]){
                const ingrediente = receta[`strIngredient${i}`];
                const cantidad = receta[`strMeasure${i}`];

                const ingredienteLi = document.createElement('LI');
                ingredienteLi.classList.add('list-group-item');
                ingredienteLi.textContent = `${ingrediente} - ${cantidad}`

                listGroup.appendChild(ingredienteLi);
               
            }
        }
        //se inserta en el modal los ingredientes y cantidades
            modalBody.appendChild(listGroup);

            const modalFooter = document.querySelector('.modal-footer');

            limpiarHTML(modalFooter);

        //botones de cerrar y favorito 
        const btnFavorito = document.createElement('BUTTON');
        btnFavorito.classList.add('btn','btn-danger', 'col');
        btnFavorito.textContent =  existeStorage(idMeal) ? 'Eliminar Favorito': 'Guardar Favorito' ;

    //ALMACENAR EN EL LOCAL STORAGE EL FAVORITO 
        btnFavorito.onclick = function(){

            if(existeStorage(idMeal)){
                eliminarFavorito(idMeal);
                btnFavorito.textContent = 'Guardar Favorito';
                mostrarToast('Eliminado Correctamente');
                return
            }

            agregarFavorito({
                id: idMeal,
                titulo: strMeal,
                img: strMealThumb
            });
            btnFavorito.textContent = 'Eliminar Favorito';
            mostrarToast('Agregado Correctamente');
        }


        //SE CONFIGURA BOTON DE CERRAR MODAL 

        const btnCerrarModal = document.createElement('BUTTON');
        btnCerrarModal.classList.add('btn','btn-secondary', 'col');
        btnCerrarModal.textContent = 'Cerrar';
        btnCerrarModal.onclick = function(){
            modal.hide();
        }

        modalFooter.appendChild(btnFavorito);
        modalFooter.appendChild(btnCerrarModal);


        //muestra el modal
        modal.show();
    }

    function agregarFavorito(receta){
        const favoritos =JSON.parse(localStorage.getItem('favoritos')) ?? [];
        localStorage.setItem('favoritos', JSON.stringify([...favoritos, receta]));
    }

    function eliminarFavorito(id){
        const favoritos =JSON.parse(localStorage.getItem('favoritos')) ?? [];
        const nuevosFavoritos = favoritos.filter(favorito => favorito.id !== id);
        localStorage.setItem('favoritos', JSON.stringify(nuevosFavoritos));

    }

    //esto es para validar que ya no exista un id repetido en el LocalStorage 
    function existeStorage(id){
        const favoritos =JSON.parse(localStorage.getItem('favoritos')) ?? [];
        return favoritos.some(favorito => favorito.id === id);
    }

    function mostrarToast(mensaje){
        const toastDiv = document.querySelector('#toast');
        const toastBody = document.querySelector('.toast-body');
        const toast = new bootstrap.Toast(toastDiv);
        toastBody.textContent = mensaje;

        toast.show();
    }

    function  obtenerFavoritos(){
        const favoritos = JSON.parse(localStorage.getItem('favoritos')) ?? [];
        console.log(favoritos);
        if(favoritos.length){

            mostrarRecetas(favoritos);
            return
        }

        const noFavoritos = document.createElement('P');
        noFavoritos.textContent = 'No hay favoritos aun';
        noFavoritos.classList.add('fs-4','text-center','font-bold','mt-5');
        favoritosDiv.appendChild(noFavoritos);

    }

    function limpiarHTML(selector){
        while(selector.firstChild){
            selector.removeChild(selector.firstChild);
        }
    }
}

document.addEventListener('DOMContentLoaded', iniciarApp);