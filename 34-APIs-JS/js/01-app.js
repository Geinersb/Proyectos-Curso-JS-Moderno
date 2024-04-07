
const notificarBtn = document.querySelector('#notificar');

//esto lo que hace es que cuando da click a boton pide permiso si desea notificaciones, si acepta es granted
notificarBtn.addEventListener('click',()=>{

    //esta es la api de javascript para pedir permiso
        Notification
            .requestPermission()
            .then(resultado =>{
                console.log('El resultado es',resultado);
            })
});

const verNotificacion = document.querySelector('#verNotificacion');

//con esto cuando pulsa en ver notificacion revisa si ya tiene el permiso y muestra la notificacion y se puede modificar
verNotificacion.addEventListener('click',()=>{
    if(Notification.permission === 'granted'){
       const notificacion = new Notification('Esta es la notificacion',{
            icon: 'img/ccj.png',
            body: 'Aprendiendo con proyectos reales'
        });

        notificacion.onclick = function(){
            window.open('https://www.google.com')
        }
    }
});