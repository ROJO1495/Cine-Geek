// Carga dinámicamente contenido HTML dentro de una página sin necesidad de recargarla
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
        })
        .catch(error => console.error('Error cargando la sección:', error));
}

// Cargar la sección "inicio" automáticamente al abrir index.html
document.addEventListener("DOMContentLoaded", () => {
    loadSection('inicio');
});

