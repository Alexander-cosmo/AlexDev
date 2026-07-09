// ---------- ESTADO DEL CARRITO ----------
// Recuperamos el carrito guardado en el navegador (si existe), o arrancamos vacío
let carrito = JSON.parse(localStorage.getItem('voltek_carrito')) || [];

// ---------- ELEMENTOS DEL DOM ----------
const productosGrid = document.getElementById('productosGrid');
const filtros = document.querySelectorAll('.filtro');
const carritoPanel = document.getElementById('carritoPanel');
const carritoOverlay = document.getElementById('carritoOverlay');
const carritoItems = document.getElementById('carritoItems');
const carritoVacio = document.getElementById('carritoVacio');
const carritoTotal = document.getElementById('carritoTotal');
const carritoBadge = document.getElementById('carritoBadge');
const modal = document.getElementById('modal');

// ---------- FUNCIÓN: formatear precio en pesos ----------
function formatearPrecio(numero) {
  return '$' + numero.toLocaleString('es-AR');
}

// ---------- FUNCIÓN: filtrar por categoría y dibujar ----------
function renderizarProductos(categoria) {
  const listaFiltrada = categoria === 'todos'
    ? productos
    : productos.filter(function (p) { return p.categoria === categoria; });

  dibujarCards(listaFiltrada);
}

// ---------- FUNCIÓN: dibujar las cards de producto (recibe una lista ya filtrada) ----------
function dibujarCards(lista) {
  productosGrid.innerHTML = ''; // Borramos lo que hubiera antes de volver a dibujar

  if (lista.length === 0) {
    productosGrid.innerHTML = '<p class="sin-resultados">No encontramos componentes que coincidan con tu búsqueda.</p>';
    return;
  }

  lista.forEach(function (producto) {
    // Por cada producto armamos un bloque de HTML y lo insertamos en la grilla
    const card = document.createElement('div');
    card.className = 'producto-card';
    card.innerHTML = `
      <div class="producto-imagen-wrap">
        <img class="producto-imagen" src="${producto.imagen}" alt="${producto.nombre}" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
        <div class="producto-icono-respaldo">${producto.icono}</div>
      </div>
      <h3>${producto.nombre}</h3>
      <span class="producto-specs">${producto.specs}</span>
      <span class="producto-precio">${formatearPrecio(producto.precio)}</span>
      <button class="btn-agregar" data-id="${producto.id}">Agregar al carrito</button>
    `;
    productosGrid.appendChild(card);
  });

  // Cada vez que redibujamos las cards, hay que volver a "enganchar" los botones nuevos
  document.querySelectorAll('.btn-agregar').forEach(function (boton) {
    boton.addEventListener('click', function () {
      const idProducto = parseInt(boton.getAttribute('data-id'));
      agregarAlCarrito(idProducto);
    });
  });
}

// ---------- BUSCADOR ----------
const inputBuscar = document.getElementById('inputBuscar');

inputBuscar.addEventListener('input', function () {
  const texto = inputBuscar.value.toLowerCase().trim();

  // Si borraron todo el texto, mostramos según el filtro de categoría activo
  if (texto === '') {
    const categoriaActiva = document.querySelector('.filtro.activo').getAttribute('data-categoria');
    renderizarProductos(categoriaActiva);
    return;
  }

  // Filtramos por nombre, sin importar la categoría seleccionada
  const resultados = productos.filter(function (p) {
    return p.nombre.toLowerCase().includes(texto);
  });
  dibujarCards(resultados);
});

// ---------- FILTROS DE CATEGORÍA ----------
filtros.forEach(function (filtro) {
  filtro.addEventListener('click', function () {
    filtros.forEach(function (f) { f.classList.remove('activo'); });
    filtro.classList.add('activo');
    renderizarProductos(filtro.getAttribute('data-categoria'));
  });
});

// ---------- AGREGAR PRODUCTO AL CARRITO ----------
function agregarAlCarrito(idProducto) {
  const producto = productos.find(function (p) { return p.id === idProducto; });

  // Buscamos si ese producto ya estaba en el carrito
  const itemExistente = carrito.find(function (item) { return item.id === idProducto; });

  if (itemExistente) {
    itemExistente.cantidad += 1; // Si ya estaba, solo le sumamos 1 a la cantidad
  } else {
    carrito.push({ id: producto.id, nombre: producto.nombre, icono: producto.icono, precio: producto.precio, cantidad: 1 });
  }

  guardarCarrito();
  renderizarCarrito();
  abrirCarrito();
}

// ---------- CAMBIAR CANTIDAD DE UN ITEM ----------
function cambiarCantidad(idProducto, delta) {
  const item = carrito.find(function (i) { return i.id === idProducto; });
  if (!item) return;

  item.cantidad += delta;

  if (item.cantidad <= 0) {
    // Si la cantidad llega a 0, sacamos el producto del carrito
    carrito = carrito.filter(function (i) { return i.id !== idProducto; });
  }

  guardarCarrito();
  renderizarCarrito();
}

// ---------- QUITAR ITEM DEL CARRITO ----------
function quitarDelCarrito(idProducto) {
  carrito = carrito.filter(function (i) { return i.id !== idProducto; });
  guardarCarrito();
  renderizarCarrito();
}

// ---------- GUARDAR CARRITO EN EL NAVEGADOR ----------
function guardarCarrito() {
  localStorage.setItem('voltek_carrito', JSON.stringify(carrito));
}

// ---------- DIBUJAR EL CONTENIDO DEL CARRITO ----------
function renderizarCarrito() {
  carritoItems.innerHTML = '';

  if (carrito.length === 0) {
    carritoItems.innerHTML = '<p class="carrito-vacio">Todavía no agregaste productos.</p>';
  } else {
    carrito.forEach(function (item) {
      const div = document.createElement('div');
      div.className = 'carrito-item';
      div.innerHTML = `
        <div class="carrito-item-icono">${item.icono}</div>
        <div class="carrito-item-info">
          <h4>${item.nombre}</h4>
          <span class="carrito-item-precio">${formatearPrecio(item.precio)}</span>
          <div class="carrito-item-cantidad">
            <button class="btn-restar" data-id="${item.id}">-</button>
            <span>${item.cantidad}</span>
            <button class="btn-sumar" data-id="${item.id}">+</button>
            <button class="carrito-item-quitar" data-id="${item.id}" title="Quitar"><i class="fa-solid fa-trash"></i></button>
          </div>
        </div>
      `;
      carritoItems.appendChild(div);
    });
  }

  // Enganchamos los botones de + / - / Quitar que acabamos de crear
  document.querySelectorAll('.btn-sumar').forEach(function (b) {
    b.addEventListener('click', function () { cambiarCantidad(parseInt(b.getAttribute('data-id')), 1); });
  });
  document.querySelectorAll('.btn-restar').forEach(function (b) {
    b.addEventListener('click', function () { cambiarCantidad(parseInt(b.getAttribute('data-id')), -1); });
  });
  document.querySelectorAll('.carrito-item-quitar').forEach(function (b) {
    b.addEventListener('click', function () { quitarDelCarrito(parseInt(b.getAttribute('data-id'))); });
  });

  // Calculamos el total sumando precio x cantidad de cada item
  const total = carrito.reduce(function (acumulado, item) {
    return acumulado + (item.precio * item.cantidad);
  }, 0);

  carritoTotal.textContent = formatearPrecio(total);

  // Actualizamos el numerito rojo del ícono del carrito
  const cantidadTotal = carrito.reduce(function (acum, item) { return acum + item.cantidad; }, 0);
  carritoBadge.textContent = cantidadTotal;
}

// ---------- ABRIR / CERRAR EL PANEL DEL CARRITO ----------
function abrirCarrito() {
  carritoPanel.classList.add('abierto');
  carritoOverlay.classList.add('activo');
}

function cerrarCarrito() {
  carritoPanel.classList.remove('abierto');
  carritoOverlay.classList.remove('activo');
}

document.getElementById('btnCarrito').addEventListener('click', abrirCarrito);
document.getElementById('carritoCerrar').addEventListener('click', cerrarCarrito);
carritoOverlay.addEventListener('click', cerrarCarrito);

// ---------- CHECKOUT (simulado) ----------
document.getElementById('btnCheckout').addEventListener('click', function () {
  if (carrito.length === 0) return; // Si no hay nada en el carrito, no hacemos nada

  modal.classList.add('activo');
  carrito = [];
  guardarCarrito();
  renderizarCarrito();
  cerrarCarrito();
});

document.getElementById('modalCerrar').addEventListener('click', function () {
  modal.classList.remove('activo');
});

// ---------- LOGIN / REGISTRO SIMULADO ----------
const modalLogin = document.getElementById('modalLogin');
const btnLoginNav = document.getElementById('btnLogin');
const loginTabs = document.querySelectorAll('.login-tab');
const formLogin = document.getElementById('formLogin');
const formRegistro = document.getElementById('formRegistro');
const loginError = document.getElementById('loginError');
const registroError = document.getElementById('registroError');

// ---------- Cambiar entre pestaña "Iniciar sesión" y "Crear cuenta" ----------
loginTabs.forEach(function (tab) {
  tab.addEventListener('click', function () {
    loginTabs.forEach(function (t) { t.classList.remove('activo'); });
    tab.classList.add('activo');

    const esLogin = tab.getAttribute('data-tab') === 'login';
    formLogin.style.display = esLogin ? 'flex' : 'none';
    formRegistro.style.display = esLogin ? 'none' : 'flex';
  });
});

// ---------- Abrir / cerrar el modal de login ----------
function abrirModalLogin() {
  modalLogin.classList.add('activo');
}

function cerrarModalLogin() {
  modalLogin.classList.remove('activo');
}

document.getElementById('loginCerrarX').addEventListener('click', cerrarModalLogin);

// ---------- Registrar un usuario nuevo ----------
formRegistro.addEventListener('submit', function (e) {
  e.preventDefault();

  const nombre = document.getElementById('registroNombre').value.trim();
  const email = document.getElementById('registroEmail').value.trim().toLowerCase();
  const password = document.getElementById('registroPassword').value;

  const usuarios = JSON.parse(localStorage.getItem('voltek_usuarios')) || [];

  // Chequeamos que no exista ya una cuenta con ese email
  const yaExiste = usuarios.find(function (u) { return u.email === email; });
  if (yaExiste) {
    mostrarError(registroError, 'Ya existe una cuenta registrada con ese email.');
    return;
  }

  usuarios.push({ nombre: nombre, email: email, password: password });
  localStorage.setItem('voltek_usuarios', JSON.stringify(usuarios));

  iniciarSesion(nombre, email);
  formRegistro.reset();
});

// ---------- Iniciar sesión con una cuenta existente ----------
formLogin.addEventListener('submit', function (e) {
  e.preventDefault();

  const email = document.getElementById('loginEmail').value.trim().toLowerCase();
  const password = document.getElementById('loginPassword').value;

  const usuarios = JSON.parse(localStorage.getItem('voltek_usuarios')) || [];
  const usuario = usuarios.find(function (u) { return u.email === email && u.password === password; });

  if (!usuario) {
    mostrarError(loginError, 'Email o contraseña incorrectos.');
    return;
  }

  iniciarSesion(usuario.nombre, usuario.email);
  formLogin.reset();
});

function mostrarError(elemento, mensaje) {
  elemento.textContent = mensaje;
  elemento.classList.add('visible');
}

// ---------- Guardar la sesión activa y actualizar el botón del navbar ----------
function iniciarSesion(nombre, email) {
  localStorage.setItem('voltek_sesion', JSON.stringify({ nombre: nombre, email: email }));
  cerrarModalLogin();
  actualizarBotonLogin();
}

function cerrarSesion() {
  localStorage.removeItem('voltek_sesion');
  actualizarBotonLogin();
}

// ---------- Revisa si hay una sesión guardada y ajusta el botón del navbar ----------
function actualizarBotonLogin() {
  const sesion = JSON.parse(localStorage.getItem('voltek_sesion'));

  if (sesion) {
    btnLoginNav.innerHTML = `<i class="fa-solid fa-user"></i> <span class="usuario-saludo">Hola, ${sesion.nombre.split(' ')[0]}</span>`;
    btnLoginNav.onclick = cerrarSesion;
  } else {
    btnLoginNav.innerHTML = `<i class="fa-solid fa-user"></i> <span>Iniciar sesión</span>`;
    btnLoginNav.onclick = abrirModalLogin;
  }
}

// Al cargar la página, dejamos el botón como corresponda según si hay sesión o no
actualizarBotonLogin();

// ---------- ARRANQUE: primer dibujo al cargar la página ----------
renderizarProductos('todos');
renderizarCarrito();
