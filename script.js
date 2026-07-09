const enlaces = document.querySelectorAll('a');
const secciones = document.querySelectorAll('section');

// 2. Función para "apagar" todas las pantallas
function ocultarSecciones() {
    secciones.forEach(seccion => {
        seccion.style.display = 'none';
    });
}

flatpickr("#fecha-cita",{
    enableTime:true,
    dateFormat: "d/m/Y H:i",
    time_24h:true,
    locale:"es"
}
)

enlaces.forEach(enlace => {
    enlace.addEventListener('click', function(evento) {
        
        let destino = this.getAttribute('href');

        if (destino && destino.startsWith('#')) {

            evento.preventDefault();

            ocultarSecciones();

            const seccionAMostrar = document.querySelector(destino);
            if (seccionAMostrar) {
                seccionAMostrar.style.display = 'block';
            }
        }
    });
});

ocultarSecciones();
document.querySelector('#citas').style.display = 'block';