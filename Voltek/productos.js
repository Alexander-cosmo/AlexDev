// Catálogo de productos. Cada objeto representa un componente.
// categoria sirve para el filtro, icono es el respaldo si la imagen no carga,
// imagen es una foto real (una por categoría, no por modelo exacto).
const imagenesPorCategoria = {
  cpu: "https://images.unsplash.com/photo-1670751782084-dffc982dc63b?w=500&q=80",
  gpu: "https://images.unsplash.com/photo-1634672350437-f9632adc9c3f?w=500&q=80",
  ram: "https://images.unsplash.com/photo-1541029071515-84cc54f84dc5?w=500&q=80",
  mother: "https://images.unsplash.com/photo-1736779181091-5fed004bea5d?w=500&q=80",
  almacenamiento: "https://images.unsplash.com/photo-1650526573230-8f8dfb89e509?w=500&q=80",
  fuente: "https://images.unsplash.com/photo-1756576170672-1123237f1d77?w=500&q=80"
};

const productos = [
  { id: 1, nombre: "Ryzen 5 7600X", categoria: "cpu", icono: "🧠", specs: "6 núcleos · 4.7GHz · AM5", precio: 285000, socket: "AM5", consumo: 105 },
  { id: 2, nombre: "Core i5-13400F", categoria: "cpu", icono: "🧠", specs: "10 núcleos · 4.6GHz · LGA1700", precio: 260000, socket: "LGA1700", consumo: 65 },
  { id: 3, nombre: "Ryzen 7 7800X3D", categoria: "cpu", icono: "🧠", specs: "8 núcleos · 5.0GHz · AM5", precio: 520000, socket: "AM5", consumo: 120 },

  { id: 4, nombre: "RTX 4060 8GB", categoria: "gpu", icono: "🎮", specs: "8GB GDDR6 · PCIe 4.0", precio: 480000, consumo: 115 },
  { id: 5, nombre: "RTX 4070 Super 12GB", categoria: "gpu", icono: "🎮", specs: "12GB GDDR6X · PCIe 4.0", precio: 850000, consumo: 220 },
  { id: 6, nombre: "RX 7600 8GB", categoria: "gpu", icono: "🎮", specs: "8GB GDDR6 · PCIe 4.0", precio: 420000, consumo: 165 },

  { id: 7, nombre: "Kingston Fury 16GB", categoria: "ram", icono: "📊", specs: "DDR5 · 6000MHz · 2x8GB", precio: 95000 },
  { id: 8, nombre: "Corsair Vengeance 32GB", categoria: "ram", icono: "📊", specs: "DDR5 · 6000MHz · 2x16GB", precio: 175000 },

  { id: 9, nombre: "ASUS TUF B650", categoria: "mother", icono: "🔌", specs: "AM5 · DDR5 · WiFi 6", precio: 320000, socket: "AM5" },
  { id: 10, nombre: "MSI PRO B760", categoria: "mother", icono: "🔌", specs: "LGA1700 · DDR5", precio: 260000, socket: "LGA1700" },

  { id: 11, nombre: "SSD NVMe 1TB", categoria: "almacenamiento", icono: "💾", specs: "PCIe 4.0 · 7000MB/s", precio: 110000 },
  { id: 12, nombre: "SSD SATA 500GB", categoria: "almacenamiento", icono: "💾", specs: "SATA III · 560MB/s", precio: 55000 },

  { id: 13, nombre: "Fuente 650W 80+ Bronze", categoria: "fuente", icono: "⚡", specs: "650W · Certificada 80+", precio: 130000, watts: 650 },
  { id: 14, nombre: "Fuente 850W 80+ Gold", categoria: "fuente", icono: "⚡", specs: "850W · Certificada 80+ Gold", precio: 210000, watts: 850 }
];

// A cada producto le agregamos su imagen según la categoría que tenga
productos.forEach(function (producto) {
  producto.imagen = imagenesPorCategoria[producto.categoria];
});
