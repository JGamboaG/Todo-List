const tareas = [
    { id: 43, nombre: "Ir de compras al supermercado", realizada: false},
    { id: 1240, nombre: "Sacar a pasear al perro", realizada: false},
    { id: 5410, nombre: "Cortar el pasto", realizada: false},
    { id: 664, nombre: "Lavar el auto", realizada: false},
]

const listaDeTareas = document.querySelector("#tareas");
const tareaInput = document.querySelector("#nuevaTarea");
const btnAgregar = document.querySelector("#agregarTarea");
const total = document.querySelector("#total");
const finalizadas = document.querySelector("#finalizadas");

function tareasFinalizadas(){
    const y = tareas.filter(tarea => tarea.realizada === true);
    const z = y.length;
    finalizadas.innerHTML = z;
}

btnAgregar.addEventListener("click", () => {
    if(tareaInput.value !== ""){
        const nuevaTarea = { id: (Date.now()%10000), nombre: tareaInput.value, realizada: false }
        tareas.push(nuevaTarea)
        tareaInput.value = ""
        render();
    }
})

function borrar(id) {
    const index = tareas.findIndex((elemento) => elemento.id === id);
    if(index !== -1){
        tareas.splice(index, 1);
        render();
    }
}

function render(){
    let html = "";
    tareas.forEach(tarea => {
        html += `<li>
            <div class=contenido-tarea>
                <span class="id-tarea ${tarea.realizada ? 'tachado"' : '"'}>${tarea.id}</span>
                <span class="descripcion-tarea ${tarea.realizada ? 'tachado"' : '"'}>${tarea.nombre}</span>
            </div>
            <input type="checkbox" ${tarea.realizada ? "checked" : ""} onchange="tareaRealizada(${tarea.id}, this.checked)">
            <span class="eliminar-elemento" onclick="borrar(${tarea.id})">X</span>
        </li>`
    });
    listaDeTareas.innerHTML = html;
    total.innerHTML = tareas.length;
    tareasFinalizadas();
}

function tareaRealizada(id, estado){
    const index = tareas.findIndex((tarea) => tarea.id === id);
    if(index !== -1){
        tareas[index].realizada = estado;
        render();
    }
}

render();
tareasFinalizadas();