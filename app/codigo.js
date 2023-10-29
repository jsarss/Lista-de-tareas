//Variables

const formulario = document.querySelector('#formulario');
const listaTareas = document.querySelector('#lista-tarea')
let tareas = [];


//Eventos
eventListener();

function eventListener(){
    //Cuando agrega una tarea
    formulario.addEventListener('submit', agregarTarea);

    //Cuando el documento esta listo
    document.addEventListener('DOMContentLoaded', ()=>{
        tareas = JSON.parse(localStorage.getItem('tareas')) || [];

        crearHtml()
    })

}








//Funciones

function agregarTarea(e){
   e.preventDefault();
//    limpiarHtml()

   const tarea = document.querySelector('#tarea').value;

   if(tarea === ''){

    mensajeError('Una tarea no puede ir vacia..');
    return;
      
   }

   //Añadir al arreglo de tweets

   const tareaObj = {
     id: Date.now(),
     tarea
   }

   tareas = [...tareas, tareaObj];

   crearHtml();  

   formulario.reset()
   

   
}





function mensajeError(error){
    const mensajeError = document.createElement('P');
    mensajeError.textContent = error;
    mensajeError.classList.add('error');


    const contenido = document.querySelector('#contenido');
    contenido.appendChild(mensajeError);

    setTimeout(() => {
        mensajeError.remove()
    }, 3000);

}

function crearHtml(){
    limpiarHtml();

    if(tareas.length > 0){
        tareas.forEach( tarea =>{
           //Crea un boton para eliminar tareas
           const btnEliminar = document.createElement('a');
           btnEliminar.classList.add('borrar-tarea');
           btnEliminar.innerText = 'X';

           //Añadir funcion de eleiminar

           btnEliminar.onclick = ()=>{
              borrarTarea(tarea.id);
           }


            //Crear el HTML
            const li = document.createElement('LI');
            li.innerHTML = tarea.tarea;

            //Asignar el boton
            li.appendChild(btnEliminar);
            listaTareas.appendChild(li);
        })
    }

    //Sincronizar storage

    sincronizarStorage();
}

function sincronizarStorage(){
    localStorage.setItem('tareas', JSON.stringify(tareas));
}

function borrarTarea(id){
    tareas = tareas.filter(tarea => tarea.id !== id);
    crearHtml()
}


function limpiarHtml(){
    while(listaTareas.firstChild){
        listaTareas.removeChild(listaTareas.firstChild);
    }
}
