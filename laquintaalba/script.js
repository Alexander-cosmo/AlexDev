// Contenido para cada tipo de evento: imagen, título y texto del hero
const eventos = {
  boda: {
    imagen: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1600",
    titulo: "Un salón que se adapta<br>a tu historia",
    texto: "Bodas, cumpleaños, aniversarios y eventos corporativos: un mismo espacio, pensado para transformarse según lo que estés celebrando."
  },
  cumple: {
    imagen: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=1600",
    titulo: "Cumpleaños que se<br>festejan a lo grande",
    texto: "Ambientación a medida, pista de baile y toda la logística resuelta para que solo tengas que soplar las velitas."
  },
  corporativo: {
    imagen: "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?w=1600",
    titulo: "Eventos corporativos<br>con la logística resuelta",
    texto: "Espacio, sonido y catering pensados para cierres de año, lanzamientos y encuentros de equipo."
  },
  aniversario: {
    imagen: "https://images.unsplash.com/photo-1519741497674-611481863552?w=1600",
    titulo: "Aniversarios que merecen<br>un buen escenario",
    texto: "Un espacio cálido para celebrar cada etapa, con la ambientación que la ocasión se merece."
  }
};

// Elementos del DOM que vamos a modificar
const heroFondo = document.getElementById('heroFondo');
const heroTitulo = document.getElementById('heroTitulo');
const heroTexto = document.getElementById('heroTexto');
const botonesEvento = document.querySelectorAll('.pill');

// Por cada botón del selector, escuchamos el click
botonesEvento.forEach(function (boton) {
  boton.addEventListener('click', function () {
    // Sacamos la clase "activo" de todos los botones...
    botonesEvento.forEach(function (b) { b.classList.remove('activo'); });
    // ...y se la ponemos solo al botón que tocaron
    boton.classList.add('activo');

    // Leemos el atributo data-evento del botón tocado (ej: "boda", "cumple")
    const tipoEvento = boton.getAttribute('data-evento');
    const datos = eventos[tipoEvento];

    // Actualizamos la imagen de fondo y los textos del hero
    heroFondo.style.backgroundImage = `url('${datos.imagen}')`;
    heroTitulo.innerHTML = datos.titulo;
    heroTexto.textContent = datos.texto;
  });
});

// Manejo del formulario de contacto (mismo patrón que tus otros proyectos)
const formulario = document.querySelector('.formulario');
const modal = document.getElementById('modal');

formulario.addEventListener('submit', function (e) {
  e.preventDefault();
  fetch(formulario.action, {
    method: 'POST',
    body: new FormData(formulario),
    headers: { 'accept': 'application/json' }
  }).then(function (response) {
    if (response.ok) {
      modal.classList.add('activo');
      formulario.reset();
    }
  });
});

function cerrarModal() {
  modal.classList.remove('activo');
}
