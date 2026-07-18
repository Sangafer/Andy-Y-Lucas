const enlaces = document.querySelectorAll('.list-enlaces a');
const secciones = document.querySelectorAll('section');
const botonSorpresa = document.querySelector('#btn-form')
const ticketVip = document.querySelector('.ticket-vip')

const botonNota= document.querySelector('.link-nota')
const contenidoNota= document.querySelector('.nota')

// 2. Función para "apagar" todas las pantallas
function ocultarSecciones() {
    secciones.forEach(seccion => {
        seccion.style.display = 'none';
    });
}

function renderCalendar(){
    const año = new Date().getFullYear();
    const mes = new Date().getMonth();

    const diasEnMeses=new Date(año, mes+1, 0).getDate();
    const primerDiaDelMes=new Date(año, mes, 1).getDay();

    const contenedorDias=document.querySelector('.days-number');
    const mesHTML= document.querySelector('.month');
    const añoHTML= document.querySelector('.year');

    const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    const nombreMes=meses[mes]

    mesHTML.innerHTML=nombreMes;
    añoHTML.innerHTML=año
    contenedorDias.innerHTML="";

    for (let i = 0; i < primerDiaDelMes; i++) {
        const espacioVacio = document.createElement('div');
        contenedorDias.appendChild(espacioVacio);
    }

    for(let i=1; i<=diasEnMeses;i++){
        const diaDiv=document.createElement('div');
        diaDiv.innerHTML=i;
        contenedorDias.appendChild(diaDiv)
    }

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

            // 1. Quitamos la clase 'activo' a todos los enlaces
            enlaces.forEach(e => e.classList.remove('activo'));
            
            // 2. Añadimos 'activo' solo al que hemos pulsado (this)
            this.classList.add('activo');

            const seccionAMostrar = document.querySelector(destino);
            if (seccionAMostrar) {
                seccionAMostrar.style.display = 'block';
            }
        }
    });
});

botonSorpresa.addEventListener('click', function(){
    botonSorpresa.style.display = 'none';
    ticketVip.style.display = 'flex';
})

botonNota.addEventListener('click', function(evento){
    evento.preventDefault();
    botonNota.style.display='none';
    contenidoNota.style.display='block'
})

ocultarSecciones();
renderCalendar();
document.querySelector('#citas').style.display = 'block';