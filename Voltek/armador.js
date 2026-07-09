// ---------- ESTADO: qué eligió el usuario en cada categoría ----------
// Arranca todo vacío (null = todavía no eligió nada en esa categoría)
const armado = {
  cpu: null,
  mother: null,
  ram: null,
  gpu: null,
  almacenamiento: null,
  fuente: null
};

// ---------- ELEMENTOS DEL DOM ----------
const selects = document.querySelectorAll('.select-componente');
const alertaSocket = document.getElementById('alertaSocket');
const alertaPotencia = document.getElementById('alertaPotencia');
const armadorTotal = document.getElementById('armadorTotal');
const btnAgregarArmado = document.getElementById('btnAgregarArmado');
const modal = document.getElementById('modal');

// Mapeamos cada categoría con el <rect> del SVG que le corresponde.
// La CPU y las 2 RAM son varias zonas a la vez, por eso son arrays.
const zonasPorCategoria = {
  cpu: [document.getElementById('zonaCpu')],
  mother: [document.getElementById('zonaMother')],
  ram: [document.getElementById('zonaRam'), document.getElementById('zonaRam2')],
  gpu: [document.getElementById('zonaGpu')],
  almacenamiento: [document.getElementById('zonaAlmacenamiento')],
  fuente: [document.getElementById('zonaFuente')]
};

// ---------- FUNCIÓN: formatear precio ----------
function formatearPrecio(numero) {
  return '$' + numero.toLocaleString('es-AR');
}

// ---------- PASO 1: llenar cada <select> con los productos de su categoría ----------
selects.forEach(function (select) {
  const categoria = select.getAttribute('data-categoria');
  const opciones = productos.filter(function (p) { return p.categoria === categoria; });

  opciones.forEach(function (producto) {
    const option = document.createElement('option');
    option.value = producto.id;
    option.textContent = producto.nombre + ' — ' + formatearPrecio(producto.precio);
    select.appendChild(option);
  });

  // Cuando el usuario elige algo en este select, actualizamos todo
  select.addEventListener('change', function () {
    const idElegido = parseInt(select.value) || null;
    const productoElegido = productos.find(function (p) { return p.id === idElegido; });

    armado[categoria] = productoElegido || null;

    actualizarZonaVisual(categoria, !!productoElegido);
    chequearCompatibilidad();
    actualizarTotal();
    actualizarBotonAgregar();
  });
});

// ---------- PASO 2: encender o apagar la zona del dibujo ----------
function actualizarZonaVisual(categoria, elegido) {
  zonasPorCategoria[categoria].forEach(function (zona) {
    if (elegido) {
      zona.classList.add('zona-llena');
    } else {
      zona.classList.remove('zona-llena');
    }
  });
}

// ---------- PASO 3: chequear compatibilidad ----------
function chequearCompatibilidad() {
  // --- Regla 1: el socket del CPU tiene que coincidir con el de la motherboard ---
  if (armado.cpu && armado.mother) {
    if (armado.cpu.socket === armado.mother.socket) {
      mostrarAlerta(alertaSocket, 'ok', `Compatibles: ambos usan socket ${armado.cpu.socket}.`);
    } else {
      mostrarAlerta(alertaSocket, 'error', `Incompatibles: el procesador es ${armado.cpu.socket} y la motherboard es ${armado.mother.socket}.`);
    }
  } else {
    ocultarAlerta(alertaSocket);
  }

  // --- Regla 2: la fuente tiene que dar suficientes watts ---
  if (armado.fuente && (armado.cpu || armado.gpu)) {
    const consumoCpu = armado.cpu ? armado.cpu.consumo : 0;
    const consumoGpu = armado.gpu ? armado.gpu.consumo : 0;
    const consumoEstimado = consumoCpu + consumoGpu + 100; // +100W de margen para el resto de la PC

    if (armado.fuente.watts >= consumoEstimado) {
      mostrarAlerta(alertaPotencia, 'ok', `Alcanza: tu PC consume ~${consumoEstimado}W y la fuente da ${armado.fuente.watts}W.`);
    } else {
      mostrarAlerta(alertaPotencia, 'error', `No alcanza: tu PC necesita ~${consumoEstimado}W y esta fuente solo da ${armado.fuente.watts}W.`);
    }
  } else {
    ocultarAlerta(alertaPotencia);
  }
}

function mostrarAlerta(elemento, tipo, mensaje) {
  elemento.textContent = mensaje;
  elemento.className = 'alerta-compatibilidad visible ' + tipo;
}

function ocultarAlerta(elemento) {
  elemento.className = 'alerta-compatibilidad';
}

// ---------- PASO 4: sumar el precio total del armado ----------
function actualizarTotal() {
  const total = Object.values(armado).reduce(function (acumulado, producto) {
    return acumulado + (producto ? producto.precio : 0);
  }, 0);

  armadorTotal.textContent = formatearPrecio(total);
}

// ---------- PASO 5: habilitar el botón solo si el armado es válido ----------
function actualizarBotonAgregar() {
  // Están todas las categorías elegidas?
  const completo = Object.values(armado).every(function (producto) { return producto !== null; });

  // Hay algún error de compatibilidad visible?
  const hayError = document.querySelector('.alerta-compatibilidad.error') !== null;

  if (completo && !hayError) {
    btnAgregarArmado.disabled = false;
    btnAgregarArmado.textContent = 'Agregar armado completo al carrito';
  } else if (hayError) {
    btnAgregarArmado.disabled = true;
    btnAgregarArmado.textContent = 'Resolvé la incompatibilidad para continuar';
  } else {
    btnAgregarArmado.disabled = true;
    btnAgregarArmado.textContent = 'Completá tu armado para continuar';
  }
}

// ---------- PASO 6: agregar todo el armado al carrito ----------
btnAgregarArmado.addEventListener('click', function () {
  // Leemos el carrito que ya exista guardado (el mismo que usa el catálogo)
  let carrito = JSON.parse(localStorage.getItem('voltek_carrito')) || [];

  Object.values(armado).forEach(function (producto) {
    const itemExistente = carrito.find(function (item) { return item.id === producto.id; });

    if (itemExistente) {
      itemExistente.cantidad += 1;
    } else {
      carrito.push({ id: producto.id, nombre: producto.nombre, icono: producto.icono, precio: producto.precio, cantidad: 1 });
    }
  });

  localStorage.setItem('voltek_carrito', JSON.stringify(carrito));
  modal.classList.add('activo');
});

document.getElementById('modalCerrar').addEventListener('click', function () {
  modal.classList.remove('activo');
  window.location.href = 'index.html#catalogo';
});
