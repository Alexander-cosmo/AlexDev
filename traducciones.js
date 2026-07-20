// ---------- DICCIONARIO DE TRADUCCIONES ----------
// Cada clave (ej: "hero.titulo") tiene su versión en español e inglés.
// Los data-i18n del HTML apuntan a estas claves.
const traducciones = {
  es: {
    'nav.inicio': 'Inicio',
    'nav.servicios': 'Servicios',
    'nav.proyectos': 'Mis Proyectos',
    'nav.proyectos2': 'Proyectos',
    'nav.contactar': 'Contactame',

    'hero.eyebrow': 'Desarrollo web · Automatización · Soporte técnico',
    'hero.titulo': 'Hola, soy Alexander <span class="hero-wave">👋</span>',
    'hero.subtitulo': 'Desarrollo soluciones digitales a medida: automatización, páginas web, aplicaciones y soporte técnico.',
    'hero.boton': 'Ver mis servicios',

    'servicios.titulo': 'Mis Servicios',
    'servicios.card1.titulo': 'Automatización',
    'servicios.card1.texto': 'Automatizá procesos repetitivos con Google Forms, Sheets y Apps Script. Ahorrá horas de trabajo manual.',
    'servicios.card2.titulo': 'Páginas web',
    'servicios.card2.texto': 'Landing pages y sitios web profesionales, modernos y responsive para tu negocio o emprendimiento.',
    'servicios.card3.titulo': 'Apps y bases de datos',
    'servicios.card3.texto': 'Desarrollo de aplicaciones a medida con bases de datos relacionales adaptadas a tus necesidades.',
    'servicios.card4.titulo': 'Soporte técnico',
    'servicios.card4.texto': 'Reparación, mantenimiento y optimización de equipos. Instalación y configuración de Windows y Linux.',

    'sobreMi.titulo': 'Sobre mí',
    'sobreMi.parrafo1': 'Soy un desarrollador freelance de Buenos Aires con experiencia en automatización de procesos, desarrollo de aplicaciones, páginas web y soporte técnico. Me especializo en detectar procesos manuales repetitivos y convertirlos en soluciones digitales eficientes.',
    'sobreMi.parrafo2': 'Trabajo con Google Workspace, HTML, CSS, JavaScript, Java, C++ y bases de datos relacionales. Siempre con foco en soluciones prácticas que ahorren tiempo real a mis clientes.',
    'sobreMi.dato1': '📍 Buenos Aires, Argentina',
    'sobreMi.dato2': '💻 Desarrollo web y automatización',
    'sobreMi.dato3': '🎓 Técnico Universitario en Programación',

    'proyectos.titulo': 'Mis Proyectos',
    'proyectos.subtitulo': 'Una selección de trabajos hechos con distintas tecnologías y enfoques',
    'proyectos.verProyecto': 'Ver proyecto →',
    'proyectos.reportes': 'Automatización completa con Google Forms, Sheets y Apps Script para gestión de líderes.',
    'proyectos.barberking': 'Página web profesional y responsive construida con HTML y CSS puro.',
    'proyectos.napolitan': 'Landing page para panadería artesanal con diseño cálido, sección de productos, historia y contacto.',
    'proyectos.segurar': 'Página web completa para aseguradora con panel de cliente, login y gestión de pólizas.',
    'proyectos.laquintaalba': 'Landing para salón de eventos con selector interactivo según tipo de celebración, galería y ubicación con mapa.',
    'proyectos.voltek': 'E-commerce de componentes de PC con carrito, inicio de sesión y armador de PC con chequeo de compatibilidad.',
    'proyectos.lacava': 'Página para restaurante pensada para enamorar a primera vista: menú con fotos, historia del lugar, reservas online y un diseño elegante que invita a quedarse.',
    'proyectos.ironpulse': 'Página web para gimnasio con múltiples sedes: planes de membresía, clases disponibles y formulario para reservar una clase de prueba gratis.',

    'contacto.titulo': 'Contactame',
    'contacto.placeholderNombre': 'Tu nombre...',
    'contacto.placeholderEmail': 'Tu email...',
    'contacto.placeholderMensaje': 'Tu mensaje...',
    'contacto.boton': 'Enviar mensaje',

    'modal.titulo': '¡Mensaje enviado!',
    'modal.texto': 'Te respondo a la brevedad. ¡Gracias por contactarme!',
    'modal.boton': 'Cerrar'
  },

  en: {
    'nav.inicio': 'Home',
    'nav.servicios': 'Services',
    'nav.proyectos': 'My Projects',
    'nav.proyectos2': 'Projects',
    'nav.contactar': 'Contact me',

    'hero.eyebrow': 'Web Development · Automation · Tech Support',
    'hero.titulo': 'Hi, I\'m Alexander <span class="hero-wave">👋</span>',
    'hero.subtitulo': 'I build custom digital solutions: automation, websites, applications and technical support.',
    'hero.boton': 'View my services',

    'servicios.titulo': 'My Services',
    'servicios.card1.titulo': 'Automation',
    'servicios.card1.texto': 'Automate repetitive processes with Google Forms, Sheets and Apps Script. Save hours of manual work.',
    'servicios.card2.titulo': 'Websites',
    'servicios.card2.texto': 'Professional, modern and responsive landing pages and websites for your business.',
    'servicios.card3.titulo': 'Apps & Databases',
    'servicios.card3.texto': 'Custom application development with relational databases tailored to your needs.',
    'servicios.card4.titulo': 'Tech Support',
    'servicios.card4.texto': 'Hardware repair, maintenance and optimization. Windows and Linux installation and setup.',

    'sobreMi.titulo': 'About me',
    'sobreMi.parrafo1': 'I\'m a freelance developer from Buenos Aires with experience in process automation, application development, websites and technical support. I specialize in spotting repetitive manual processes and turning them into efficient digital solutions.',
    'sobreMi.parrafo2': 'I work with Google Workspace, HTML, CSS, JavaScript, Java, C++ and relational databases. Always focused on practical solutions that save my clients real time.',
    'sobreMi.dato1': '📍 Buenos Aires, Argentina',
    'sobreMi.dato2': '💻 Web development and automation',
    'sobreMi.dato3': '🎓 University Technician in Programming',

    'proyectos.titulo': 'My Projects',
    'proyectos.subtitulo': 'A selection of work built with different technologies and approaches',
    'proyectos.verProyecto': 'View project →',
    'proyectos.reportes': 'Full automation with Google Forms, Sheets and Apps Script for team leader reporting.',
    'proyectos.barberking': 'Professional, responsive website built with pure HTML and CSS.',
    'proyectos.napolitan': 'Landing page for an artisan bakery with a warm design, product section, story and contact.',
    'proyectos.segurar': 'Complete website for an insurance company with client portal, login and policy management.',
    'proyectos.laquintaalba': 'Landing page for an event venue with an interactive selector by celebration type, gallery and map location.',
    'proyectos.voltek': 'PC components e-commerce with cart, login and a PC builder with compatibility checking.',
    'proyectos.lacava': 'Restaurant page designed to impress at first glance: photo menu, the place\'s story, online reservations and an elegant design that invites you to stay.',
    'proyectos.ironpulse': 'Website for a multi-location gym: membership plans, available classes and a form to book a free trial class.',

    'contacto.titulo': 'Contact me',
    'contacto.placeholderNombre': 'Your name...',
    'contacto.placeholderEmail': 'Your email...',
    'contacto.placeholderMensaje': 'Your message...',
    'contacto.boton': 'Send message',

    'modal.titulo': 'Message sent!',
    'modal.texto': 'I\'ll get back to you shortly. Thanks for reaching out!',
    'modal.boton': 'Close'
  }
};

// ---------- APLICAR UN IDIOMA A TODA LA PÁGINA ----------
function aplicarIdioma(idioma) {
  // Textos normales (innerHTML porque el título del hero tiene un <span> adentro)
  document.querySelectorAll('[data-i18n]').forEach(function (elemento) {
    const clave = elemento.getAttribute('data-i18n');
    if (traducciones[idioma][clave]) {
      elemento.innerHTML = traducciones[idioma][clave];
    }
  });

  // Placeholders de inputs y textarea (no se pueden traducir con innerHTML)
  document.querySelectorAll('[data-i18n-placeholder]').forEach(function (elemento) {
    const clave = elemento.getAttribute('data-i18n-placeholder');
    if (traducciones[idioma][clave]) {
      elemento.setAttribute('placeholder', traducciones[idioma][clave]);
    }
  });

  // El botón de idioma muestra la opción CONTRARIA a la actual (si estoy en ES, ofrece pasar a EN)
  const btnIdioma = document.getElementById('btnIdioma');
  btnIdioma.textContent = idioma === 'es' ? 'EN' : 'ES';

  // Guardamos la preferencia para que no se resetee si recarga la página
  localStorage.setItem('idioma_preferido', idioma);
  document.documentElement.lang = idioma;
}

// ---------- BOTÓN DE CAMBIO DE IDIOMA ----------
let idiomaActual = localStorage.getItem('idioma_preferido') || 'es';
aplicarIdioma(idiomaActual);

document.getElementById('btnIdioma').addEventListener('click', function () {
  idiomaActual = idiomaActual === 'es' ? 'en' : 'es';
  aplicarIdioma(idiomaActual);
});
