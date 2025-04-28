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

// Cargar la seccion "inicio" automaticamente al abrir index.html
document.addEventListener("DOMContentLoaded", () => {
    loadSection('inicio');
});
