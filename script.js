// ---------- FORMULARIO DE CONTACTO CON VALIDACIÓN PROPIA ----------
const formulario = document.getElementById('formularioContacto');
const modal = document.getElementById('modal');

const campoNombre = document.getElementById('campoNombre');
const campoEmail = document.getElementById('campoEmail');
const campoMensaje = document.getElementById('campoMensaje');

// Un patrón simple para chequear que el email tenga forma de email: algo@algo.algo
function esEmailValido(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Muestra el error debajo de un campo y le pone el borde rojo
function marcarError(campo, elementoError, mensaje) {
  campo.classList.add('invalido');
  elementoError.textContent = mensaje;
  elementoError.classList.add('visible');
}

// Saca el error de un campo (cuando ya está bien completado)
function limpiarError(campo, elementoError) {
  campo.classList.remove('invalido');
  elementoError.classList.remove('visible');
}

function validarFormulario() {
  let esValido = true;

  // Nombre: no puede estar vacío
  if (campoNombre.value.trim() === '') {
    marcarError(campoNombre, document.getElementById('errorNombre'), 'Ingresá tu nombre.');
    esValido = false;
  } else {
    limpiarError(campoNombre, document.getElementById('errorNombre'));
  }

  // Email: no puede estar vacío y tiene que tener formato válido
  if (campoEmail.value.trim() === '') {
    marcarError(campoEmail, document.getElementById('errorEmail'), 'Ingresá tu email.');
    esValido = false;
  } else if (!esEmailValido(campoEmail.value.trim())) {
    marcarError(campoEmail, document.getElementById('errorEmail'), 'Ese email no parece válido. Revisá que tenga "@" y un dominio (ej: gmail.com).');
    esValido = false;
  } else {
    limpiarError(campoEmail, document.getElementById('errorEmail'));
  }

  // Mensaje: no puede estar vacío
  if (campoMensaje.value.trim() === '') {
    marcarError(campoMensaje, document.getElementById('errorMensaje'), 'Contame brevemente en qué te puedo ayudar.');
    esValido = false;
  } else {
    limpiarError(campoMensaje, document.getElementById('errorMensaje'));
  }

  return esValido;
}

// Mientras el usuario va escribiendo, le sacamos el error apenas corrige el campo
[campoNombre, campoEmail, campoMensaje].forEach(function (campo) {
  campo.addEventListener('input', function () {
    if (campo.classList.contains('invalido')) {
      validarFormulario();
    }
  });
});

formulario.addEventListener('submit', function (e) {
  e.preventDefault();

  if (!validarFormulario()) {
    return; // Si hay algún error, no mandamos el formulario
  }

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

// ---------- MENÚ HAMBURGUESA (mobile) ----------
const btnHamburguesa = document.getElementById('btnHamburguesa');
const menu = document.getElementById('menu');

btnHamburguesa.addEventListener('click', function () {
  menu.classList.toggle('abierto');
});

// Si tocás un link del menú mobile, se cierra solo (mejor experiencia)
menu.querySelectorAll('a').forEach(function (link) {
  link.addEventListener('click', function () {
    menu.classList.remove('abierto');
  });
});

// ---------- BARRA DE PROGRESO DE SCROLL ----------
const scrollProgreso = document.getElementById('scrollProgreso');

window.addEventListener('scroll', function () {
  // Cuánto scrolleaste hasta ahora, sobre el total posible de scroll de la página
  const alturaTotal = document.documentElement.scrollHeight - window.innerHeight;
  const progreso = (window.scrollY / alturaTotal) * 100;
  scrollProgreso.style.width = progreso + '%';
});

// ---------- EFECTO 3D + BRILLO EN LAS CARDS (sigue al mouse) ----------
document.querySelectorAll('.card').forEach(function (card) {
  card.addEventListener('mousemove', function (e) {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Actualizamos dos variables CSS con la posición del mouse dentro de la card.
    // El CSS las usa para mover el centro del brillo radial (ver .card::before)
    card.style.setProperty('--mouse-x', x + 'px');
    card.style.setProperty('--mouse-y', y + 'px');

    // Calculamos cuánto inclinar la card según qué tan lejos del centro está el mouse
    const porcentajeX = (x / rect.width - 0.5) * 2;  // va de -1 a 1
    const porcentajeY = (y / rect.height - 0.5) * 2;

    const inclinacionMax = 6; // grados máximos de inclinación
    card.style.transform = `perspective(600px) rotateX(${-porcentajeY * inclinacionMax}deg) rotateY(${porcentajeX * inclinacionMax}deg) translateY(-4px)`;
  });

  // Al sacar el mouse, la card vuelve a su posición original suavemente
  card.addEventListener('mouseleave', function () {
    card.style.transform = 'perspective(600px) rotateX(0deg) rotateY(0deg)';
  });
});

// ---------- ANIMACIÓN: las secciones aparecen al hacer scroll ----------
// IntersectionObserver le avisa a nuestro código cuándo un elemento entra en pantalla,
// sin tener que estar escuchando el scroll a mano (mucho más liviano para el navegador).
const observador = new IntersectionObserver(function (entradas) {
  entradas.forEach(function (entrada) {
    if (entrada.isIntersecting) {
      entrada.target.classList.add('visible');
      observador.unobserve(entrada.target); // ya apareció una vez, no hace falta seguir mirándolo
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach(function (seccion) {
  observador.observe(seccion);
});
