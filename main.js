// Activar estado de carga al inicio
document.body.classList.add('loading');

// Manejo del Preloader del Avión
window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");
  setTimeout(() => {
    preloader.style.opacity = "0";
    setTimeout(() => {
      preloader.style.display = "none";
      document.body.classList.remove("loading");
      initScrollReveal();
    }, 500); 
  }, 1500); 
});

// Menú Móvil
const menuBtn = document.getElementById("menu-btn");
const navLinks = document.getElementById("nav-links");
const menuBtnIcon = menuBtn.querySelector("i");

menuBtn.addEventListener("click", () => {
  navLinks.classList.toggle("open");
  const isOpen = navLinks.classList.contains("open");
  menuBtnIcon.setAttribute("class", isOpen ? "ri-close-line" : "ri-menu-3-line");
});

navLinks.addEventListener("click", () => {
  navLinks.classList.remove("open");
  menuBtnIcon.setAttribute("class", "ri-menu-3-line");
});

// ==========================================
// CALENDARIO PREMIUM (FLATPICKR)
// ==========================================
flatpickr("#travel-date", {
  locale: "es",           // Calendario en español
  dateFormat: "d \\de F, Y", // Formato bonito (ej. 15 de Octubre, 2026)
  minDate: "today",       // No pueden seleccionar fechas pasadas
});

// ==========================================
// MAPA INTERACTIVO DE COLOMBIA (LEAFLET)
// ==========================================
const locationInput = document.getElementById('location-input');
const mapModal = document.getElementById('map-modal');
const closeMapBtn = document.getElementById('close-map');
let map;

// Destinos en Colombia
const colombiaDestinations = [
  { name: "Cartagena", coords: [10.3910, -75.4794] },
  { name: "Medellín", coords: [6.2442, -75.5812] },
  { name: "San Andrés", coords: [12.5847, -81.7006] },
  { name: "Bogotá", coords: [4.7110, -74.0721] },
  { name: "Santa Marta", coords: [11.2408, -74.1990] },
  { name: "Eje Cafetero (Salento)", coords: [4.6375, -75.5701] },
  { name: "Amazonas (Leticia)", coords: [-4.2153, -69.9406] }
];

// Abrir Modal y cargar mapa
locationInput.addEventListener('click', () => {
  mapModal.style.display = "flex";
  
  // Inicializamos el mapa solo si no existe
  if (!map) {
    // Centrado en Colombia
    map = L.map('map').setView([4.5709, -74.2973], 5);
    
    // Capa visual del mapa (Estilo de OpenStreetMap gratuito)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // Agregamos los pines
    colombiaDestinations.forEach(dest => {
      const marker = L.marker(dest.coords).addTo(map);
      marker.bindPopup(`<b>${dest.name}</b><br><button class="map-select-btn" data-name="${dest.name}" style="margin-top:5px; padding: 5px; background: #01bbbf; color: white; border: none; border-radius: 4px; cursor: pointer;">Seleccionar</button>`);
    });

    // Lógica para el botón "Seleccionar" dentro del popup del mapa
    map.on('popupopen', function() {
      const btn = document.querySelector('.map-select-btn');
      if(btn) {
        btn.addEventListener('click', function() {
          locationInput.value = this.getAttribute('data-name');
          mapModal.style.display = "none"; // Cerrar modal
        });
      }
    });
  }
  
  // Importante: al mostrar un mapa oculto, Leaflet necesita recalcular su tamaño
  setTimeout(() => {
    map.invalidateSize();
  }, 100);
});

// Cerrar el modal manualmente
closeMapBtn.addEventListener('click', () => {
  mapModal.style.display = "none";
});

// Cerrar si hacen clic fuera del contenedor
mapModal.addEventListener('click', (e) => {
  if (e.target === mapModal) {
    mapModal.style.display = "none";
  }
});

// ==========================================
// ENVIAR FORMULARIO A WHATSAPP
// ==========================================
document.getElementById('travel-form').addEventListener('submit', (e) => {
  e.preventDefault(); 

  let destino = locationInput.value;
  let fecha = document.getElementById('travel-date').value;

  if (!destino) destino = "un destino increíble en Colombia";
  if (!fecha) fecha = "una fecha próxima";

  const mensaje = `¡Hola equipo de Advanto! ✈️ \n\nMe encantaría viajar a *${destino}* el día *${fecha}*. \n\n¿Me podrían compartir más información sobre los planes disponibles, por favor? 🌴😊`;
  
  // Reemplaza los ceros con tu número de WhatsApp real
  const numeroTelefono = "573000000000"; 
  const whatsappUrl = `https://wa.me/${numeroTelefono}?text=${encodeURIComponent(mensaje)}`;
  
  window.open(whatsappUrl, '_blank');
});

// ==========================================
// ANIMACIONES Y COMPONENTES VISUALES
// ==========================================
function initScrollReveal() {
  const scrollRevealOption = { distance: "50px", origin: "bottom", duration: 1000 };

  ScrollReveal().reveal(".header__content h1", { ...scrollRevealOption });
  ScrollReveal().reveal(".header__content .section__description", { ...scrollRevealOption, delay: 500 });
  ScrollReveal().reveal(".header__content form", { ...scrollRevealOption, delay: 1000 });
  ScrollReveal().reveal(".header__content img", { ...scrollRevealOption, origin: "left", delay: 1500 });
  
  ScrollReveal().reveal(".about__content .section__header", { ...scrollRevealOption });
  ScrollReveal().reveal(".about__content .section__description", { ...scrollRevealOption, delay: 500 });
  ScrollReveal().reveal(".about__signature", { ...scrollRevealOption, delay: 1000 });
  
  ScrollReveal().reveal(".tour__card", { ...scrollRevealOption, interval: 500 });
  ScrollReveal().reveal(".destination__card", { ...scrollRevealOption, interval: 500 });
  ScrollReveal().reveal(".blog__card", { ...scrollRevealOption, interval: 500 });
}

// Swiper Reseñas
const swiper = new Swiper(".swiper", {
  loop: true,
  spaceBetween: 20,
  autoplay: { delay: 3500, disableOnInteraction: false },
  breakpoints: {
    768: { slidesPerView: 1 },
    1024: { slidesPerView: 1 }
  }
});

// Banner Infinito
const banner = document.querySelector(".banner__wrapper");
const bannerImages = Array.from(banner.children);
bannerImages.forEach((item) => {
  const duplicateNode = item.cloneNode(true);
  duplicateNode.setAttribute("aria-hidden", true);
  banner.appendChild(duplicateNode);
});