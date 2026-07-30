const enlaces = document.querySelectorAll('.list-enlaces a, .link');
const secciones = document.querySelectorAll('section');
const formCita= document.querySelector('.form-cita')
const botonSorpresa = document.querySelector('.btn-sorpresa')
const formulariosPlanes=document.querySelectorAll('.tarjeta-cita form')
const ticketVip = document.querySelector('.ticket-vip')

const botonNota= document.querySelector('.link-nota')
const contenidoNota= document.querySelector('.nota')

let mesActual=new Date().getMonth();
let añoActual=new Date().getFullYear();

const botonAtras=document.querySelector('#last-month');
const botonSiguiente=document.querySelector('#next-month');

function ocultarSecciones() {
    secciones.forEach(seccion => {
        seccion.style.display = 'none';
    });
}

function renderCalendar(){
    const año = añoActual;
    const mes = mesActual;

    const diasEnMeses=new Date(año, mes+1, 0).getDate();
    let primerDiaDelMes=new Date(año, mes, 1).getDay()-1;

    if(primerDiaDelMes===-1){
        primerDiaDelMes=6
    }

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
        if(i===new Date().getDate() && mes===new Date().getMonth() && año===new Date().getFullYear()){
            diaDiv.classList.add('hoy')
        }

        if(i === 31 && mes === 6){
        diaDiv.classList.add('aniversario');
        }

        diaDiv.addEventListener("click", () => {
          const diaPrevio = document.querySelector(".seleccionado");
          if (diaPrevio) {
            diaPrevio.classList.remove("seleccionado");
          }
          diaDiv.classList.add("seleccionado");
          const inputFecha=document.querySelector('#fecha-seleccionada')
          inputFecha.value = `${i}/${mesActual + 1}/${añoActual}`;
        });
    }

}

botonAtras.addEventListener('click', ()=>{
    if(mesActual===0){
        mesActual=11;
        añoActual=añoActual-1
    }else{
        mesActual=mesActual-1
    }
    renderCalendar()
})

botonSiguiente.addEventListener('click', ()=>{
    if(mesActual===11){
        mesActual=0;
        añoActual=añoActual+1
    }else{
        mesActual=mesActual+1
    }
    renderCalendar()
})

formCita.addEventListener('submit',(evento)=>{
    evento.preventDefault()
    const botonEnviar=formCita.querySelector('.btn-form')
    botonEnviar.innerHTML="Propuesta enviada"

    botonEnviar.disabled=true;

    const datos=new FormData(formCita)
    fetch('https://formsubmit.co/ajax/sngafer@gmail.com',{
        method:'POST',
        body:datos
    })

})

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
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        }
    });
});

formulariosPlanes.forEach((boton) => {
  boton.addEventListener("submit", (evento) => {
    evento.preventDefault();
    const botonEnviar = boton.querySelector(".link");
    botonEnviar.innerHTML = "Propuesta enviada";

    botonEnviar.disabled = true;

    const datos = new FormData(boton);
    fetch("https://formsubmit.co/ajax/sngafer@gmail.com", {
      method: "POST",
      body: datos,
    });
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
document.querySelector('#inicio').style.display = 'block';