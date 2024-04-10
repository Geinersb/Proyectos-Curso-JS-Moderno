//Intersection observer permite identificar cuando un elemento esta visible

document.addEventListener('DOMContentLoaded',()=>{

    //se crea primero el observer 
    const observer = new IntersectionObserver((entries)=>{
     if(entries[0].isIntersecting){
        console.log('Ya esta visible');
     }
    });

//luego se le indica al observer cual elemento ver 
observer.observe(document.querySelector('.premium'));

//**lo que muestra es en consola en el intersecting que diga true o false */
});