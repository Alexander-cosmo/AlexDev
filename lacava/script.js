// ---------- LOADER INICIAL ----------
window.addEventListener('load', function () {
  const loader = document.getElementById('loader');
  setTimeout(function () {
    loader.classList.add('oculto');
  }, 900);
});

// ---------- CURSOR PERSONALIZADO ----------
const cursorPunto = document.getElementById('cursorPunto');
const cursorAnillo = document.getElementById('cursorAnillo');

let mouseX = 0, mouseY = 0;
let anilloX = 0, anilloY = 0;

document.addEventListener('mousemove', function (e) {
  mouseX = e.clientX;
  mouseY = e.clientY;
  // El punto sigue al mouse instantáneamente
  cursorPunto.style.left = mouseX + 'px';
  cursorPunto.style.top = mouseY + 'px';
});

// El anillo sigue con un pequeño delay (efecto elástico), recalculado en cada frame
// Bajamos el factor (antes 0.15) para que el seguimiento sea más suave y menos "nervioso"
function animarAnillo() {
  anilloX += (mouseX - anilloX) * 0.09;
  anilloY += (mouseY - anilloY) * 0.09;
  cursorAnillo.style.left = anilloX + 'px';
  cursorAnillo.style.top = anilloY + 'px';
  requestAnimationFrame(animarAnillo);
}
animarAnillo();

// El anillo crece al pasar sobre elementos clicables
document.querySelectorAll('a, button, .plato-card, .ambiente-item, input, textarea, select').forEach(function (el) {
  el.addEventListener('mouseenter', function () { cursorAnillo.classList.add('hover-activo'); });
  el.addEventListener('mouseleave', function () { cursorAnillo.classList.remove('hover-activo'); });
});

// ---------- BARRA DE PROGRESO DE SCROLL ----------
const scrollProgreso = document.getElementById('scrollProgreso');

window.addEventListener('scroll', function () {
  const alturaTotal = document.documentElement.scrollHeight - window.innerHeight;
  const progreso = (window.scrollY / alturaTotal) * 100;
  scrollProgreso.style.width = progreso + '%';
});

// ---------- PARALLAX EN EL HERO ----------
// La imagen de fondo se mueve más lento que el scroll, dando sensación de profundidad
const heroParallax = document.getElementById('heroParallax');

window.addEventListener('scroll', function () {
  const scrollY = window.scrollY;
  if (scrollY < window.innerHeight) {
    heroParallax.style.transform = 'translateY(' + (scrollY * 0.4) + 'px)';
  }
});

// ---------- SPLIT DE TEXTO: separa el título en letras animadas ----------
function dividirEnLetras(elemento) {
  const texto = elemento.innerHTML;
  // Separamos por el <br> para no romper el salto de línea
  const lineas = texto.split('<br>');

  elemento.innerHTML = lineas.map(function (linea, indiceLinea) {
    const letras = linea.split('').map(function (letra, indice) {
      const delay = (indiceLinea * 15 + indice) * 0.03;
      const espacio = letra === ' ' ? '&nbsp;' : letra;
      return '<span class="letra-split" style="animation-delay:' + delay + 's">' + espacio + '</span>';
    }).join('');
    return letras;
  }).join('<br>');
}

const tituloHero = document.querySelector('[data-split]');
if (tituloHero) dividirEnLetras(tituloHero);

// ---------- MENÚ HAMBURGUESA ----------
const btnHamburguesa = document.getElementById('btnHamburguesa');
const menu = document.getElementById('menu');

btnHamburguesa.addEventListener('click', function () {
  menu.classList.toggle('abierto');
});

menu.querySelectorAll('a').forEach(function (link) {
  link.addEventListener('click', function () {
    menu.classList.remove('abierto');
  });
});

// ---------- REVEAL AL HACER SCROLL (con IntersectionObserver) ----------
const observador = new IntersectionObserver(function (entradas) {
  entradas.forEach(function (entrada) {
    if (entrada.isIntersecting) {
      entrada.target.classList.add('visible');

      // Si el elemento que aparece tiene contadores numéricos adentro, los arrancamos
      const contadores = entrada.target.querySelectorAll('[data-contador]');
      contadores.forEach(animarContador);

      observador.unobserve(entrada.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach(function (el) {
  observador.observe(el);
});

// ---------- CONTADOR NUMÉRICO ANIMADO ----------
function animarContador(elemento) {
  const valorFinal = parseInt(elemento.getAttribute('data-contador'));
  const duracion = 1500; // milisegundos que tarda en llegar al número final
  const inicio = performance.now();

  function paso(ahora) {
    const progreso = Math.min((ahora - inicio) / duracion, 1);
    // easeOutQuad: arranca rápido y frena suave al final
    const progresoSuave = 1 - Math.pow(1 - progreso, 2);
    elemento.textContent = Math.floor(progresoSuave * valorFinal);

    if (progreso < 1) {
      requestAnimationFrame(paso);
    } else {
      elemento.textContent = valorFinal;
    }
  }
  requestAnimationFrame(paso);
}

// ---------- FORMULARIO DE RESERVA: interceptamos el envío para mostrar modal propio ----------
// (en vez de dejar que redirija a la página de "gracias" de Formspree)
const formularioReserva = document.getElementById('formularioReserva');
const modal = document.getElementById('modal');
const modalCerrar = document.getElementById('modalCerrar');

formularioReserva.addEventListener('submit', function (e) {
  e.preventDefault();

  fetch(formularioReserva.action, {
    method: 'POST',
    body: new FormData(formularioReserva),
    headers: { 'Accept': 'application/json' }
  }).then(function (response) {
    if (response.ok) {
      modal.classList.add('activo');
      formularioReserva.reset();
    }
  });
});

modalCerrar.addEventListener('click', function () {
  modal.classList.remove('activo');
});
