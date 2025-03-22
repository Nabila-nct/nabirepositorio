function llamaDoubleClick(event) {
    cuadroMorado.textContent='Hiciste doble click en el cuadro morado';
}

function logEvent(eventos) {
    console.log(`El evento ${eventos.type} fue disparado`);
}

function agregarClase(event){
    cuadroCyan.classList.add('claseNueva');
}

const cuadroMorado=document.querySelector('#miID');
//const CuadroMorado=document.getElementById('miID');
cuadroMorado.textContent='Este texto viene de JavaScript';
cuadroMorado.innerText='Este texto reemplaza al anterior';
cuadroMorado.innerHTML='<h1>Esto es un titulo</h1>';

const cuadroCyan=document.querySelector('.miClase');
cuadroCyan.textContent="Contenido en MiClase";

//Eventos
//Anónima
cuadroMorado.addEventListener('click', () => {
    cuadroMorado.textContent='Hiciste click en el cuadro morado';


});

//Con nombre de función
cuadroMorado.addEventListener('dblclick', llamaDoubleClick);
cuadroMorado.addEventListener('mouseover', logEvent);

// Nuevos eventos con logEvent
cuadroMorado.addEventListener('mouseout', logEvent); // Evento mouseout
cuadroMorado.addEventListener('contextmenu', logEvent); // Evento contextmenu (clic derecho)

cuadroCyan.addEventListener('dblclick', agregarClase); 