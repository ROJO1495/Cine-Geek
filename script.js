document.addEventListener('DOMContentLoaded', function () {
    const navbarCollapse = document.querySelector('.navbar-collapse');
    const navbarToggler = document.querySelector('.navbar-toggler');

    // Cerrar navbar cuando se hace clic fuera de él
    document.addEventListener('click', function (event) {
      const isClickInside = navbarCollapse.contains(event.target) || navbarToggler.contains(event.target);

      if (!isClickInside && navbarCollapse.classList.contains('show')) {
        bootstrap.Collapse.getInstance(navbarCollapse).hide();
      }
    });

    // Cerrar navbar al hacer clic en un enlace
    document.querySelectorAll('.navbar-collapse .nav-link').forEach(function (link) {
      link.addEventListener('click', function () {
        if (window.innerWidth < 992) { // solo en dispositivos pequeños
          bootstrap.Collapse.getInstance(navbarCollapse).hide();
        }
      });
    });
  });

// Carga dinamicamente contenido HTML dentro de una pagina sin necesidad de recargarla
function loadSection(section) {
    fetch(`${section}.html`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error al cargar ${section}.html - Status: ${response.status}`);
            }
            return response.text();
        })
        .then(html => {
            document.getElementById('content').innerHTML = html;
            console.log(`Cargado: ${section}.html`);

            // --- NUEVO ---
            // Esperar a que todas las imagenes dentro del contenido carguen
            const images = document.querySelectorAll('#content img');
            if (images.length > 0) {
                let loadedCount = 0;
                images.forEach(img => {
                    img.addEventListener('load', () => {
                        loadedCount++;
                        if (loadedCount === images.length) {
                            initializeCarousel();
                        }
                    });
                });
            } else {
                initializeCarousel();
            }
        })
        .catch(error => console.error('Error cargando la sección:', error));
}

// Inicializa el carrusel y los eventos despues de que las imagenes carguen
function initializeCarousel() {
    const carouselElement = document.querySelector('#carouselEstrenos');
    if (carouselElement) {
        const carousel = new bootstrap.Carousel(carouselElement, {
            interval: false,
            touch: false
        });
    }

    // --- NUEVO ---
    // Recentrar los botones del carousel manualmente
    centerCarouselControls();

    // Volver a agregar stopPropagation a botones de modales
    document.querySelectorAll('.btn[data-bs-toggle="modal"]').forEach(btn => {
        btn.addEventListener('click', function (e) {
            e.stopPropagation();
        });
    });

// --- NUEVO: Actualizar fecha en "Estrenos de Hoy" 
const fechaElemento = document.getElementById('fecha-estrenos');
if (fechaElemento) {
    const hoy = new Date();

    const opcionesDia = { weekday: 'long' };
    const opcionesFecha = { year: 'numeric', month: 'long', day: 'numeric' };

    let diaSemana = hoy.toLocaleDateString('es-ES', opcionesDia);
    const fechaCompleta = hoy.toLocaleDateString('es-ES', opcionesFecha);

    // Convertir primera letra del día en mayúscula
    diaSemana = diaSemana.charAt(0).toUpperCase() + diaSemana.slice(1);

    fechaElemento.textContent = `${diaSemana}, ${fechaCompleta}`;

    fechaElemento.classList.add('fade-in');
}
    // --- NUEVO: Detener video al cerrar modal
    const modales = document.querySelectorAll('.modal');
    modales.forEach(modal => {
        modal.addEventListener('hidden.bs.modal', () => {
            const iframe = modal.querySelector('iframe');
            if (iframe) {
                const src = iframe.src;
                iframe.src = src; // Detener el video
            }
        });
    });
}

// --- NUEVO ---
// Recalcular posicion de los botones de navegacion segun el alto real del contenido
function centerCarouselControls() {
    const carouselInner = document.querySelector('#carouselEstrenos .carousel-inner');
    const prevButton = document.querySelector('#carouselEstrenos .carousel-control-prev');
    const nextButton = document.querySelector('#carouselEstrenos .carousel-control-next');

    if (carouselInner && prevButton && nextButton) {
        const height = carouselInner.offsetHeight;
        const center = height / 2;

        prevButton.style.top = `${center}px`;
        nextButton.style.top = `${center}px`;
    }
}

document.addEventListener("DOMContentLoaded", () => {
    loadSection('inicio');
});


//Busquedas:
const movies = {
    "movie1": ["capitan america", "capitan", "america", "un nuevo mundo", "mundo", "nuevo"],
    "movie2": ["¿que paso ayer?", "que paso ayer", "que paso", "ayer", "que paso ayer?"],
    "movie3": ["shrek"],
    "movie4": ["titanic"],
    "movie5": ["buenos muchachos", "buenos", "muchachos"],
    "movie6": ["robocop 2", "robocop"],
    "movie7": ["jurassick park", "jurassic", "park", "parque jurasico", "parque", "jurasico"],
    "movie8": ["forrest", "gump", "forrest gump"],
    "movie9": ["armageddon", "armagedon"],
    "movie10": ["hombres de negro", "hombres", "negro"],
    "movie11": ["gladiador"],
    "movie12": ["el pratiota", "patriota"],
    "movie13": ["la isla siniestra", "isla", "siniestra"],
    "movie14": ["el conjuro", "conjuro"],
    "movie15": ["volver al futuro 2", "volver", "futuro", "volver al futuro"],
    "movie16": ["toy story", "toy", "story"]
};

const estrenos = ["lilo & stitch", "lilo y stitch", "lilo", "stitch", "dragon", "how to train your dragon", "dragon", "ballerina", "john wick", "destino final: lazos de sangre", "destino final", "lazos de sangre", "destino", "cuando el demonio llama", "demonio", "loco por ella", "loco", "mensaje en una botella", "mensaje", "botella", "thunderbolts", "el camino hacia el dorado", "camino", "el dorado", "dorado", "puente en llamas", "puente", "llamas", "atlantis: el imperio perdido", "atlantis", "el imperio perdido", "imperio", "perdido", "planeta del tesoro", "planeta", "tesoro"];

//mostrar busquedas:
function search() {
    const searcher = document.getElementById("buscador").value.toLowerCase();
    
    if (estrenos.includes(searcher)) {
        Swal.fire({
            title: 'Peliculas que aun no se estrenan',
            text: 'En el menu hay una parte de estrenos para que visualice cuando estara disponible la pelicula que solicito.',
            icon: 'warning'
        });
        return false;
    }

    else if(!searcher) {
        Swal.fire({
            title: 'Atencion!',
            text: 'Por favor ingresa un termino de busqueda.',
            icon: 'warning',
            showConfirmButton: true,
            showCancelButton: false
        });
        return false;
    }
    
    for (const [movie, keywords] of Object.entries(movies)) {
        if (keywords.includes(searcher)) {
            window.location.href = `${movie}.html`;
            return false;
        }
    }
    Swal.fire({
        title: 'No encontrado',
        text: 'La película no fue encontrada.',
        icon: 'error'
    });
    return false;
}

//onclick="search();"