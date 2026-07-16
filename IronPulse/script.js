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

// ---------- REVEAL AL HACER SCROLL ----------
const observador = new IntersectionObserver(function (entradas) {
  entradas.forEach(function (entrada) {
    if (entrada.isIntersecting) {
      entrada.target.classList.add('visible');
      observador.unobserve(entrada.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach(function (el) {
  observador.observe(el);
});

// ---------- FORMULARIO CON MODAL PROPIO ----------
const formulario = document.getElementById('formularioContacto');
const modal = document.getElementById('modal');
const modalCerrar = document.getElementById('modalCerrar');

formulario.addEventListener('submit', function (e) {
  e.preventDefault();

  fetch(formulario.action, {
    method: 'POST',
    body: new FormData(formulario),
    headers: { 'Accept': 'application/json' }
  }).then(function (response) {
    if (response.ok) {
      modal.classList.add('activo');
      formulario.reset();
    }
  });
});

modalCerrar.addEventListener('click', function () {
  modal.classList.remove('activo');
});
