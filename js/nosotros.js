fetch('https://jsonplaceholder.typicode.com/users')
    .then((response) => response.json())
    .then((json) =>

      json.forEach((comentario) => {
})
);
document.addEventListener('DOMContentLoaded', () => {
    const botonCargar = document.getElementById('cargarClientes');
    const clientesLista = document.getElementById('clientesLista');

    botonCargar.addEventListener('click', () => {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then((response) => response.json())
            .then((json) => {
                const primerosTresComentarios = json.slice(0, 3); // Tomar solo los primeros tres comentarios

                clientesLista.innerHTML = ''; // Limpiar contenido anterior

                primerosTresComentarios.forEach((comentario) => {
                    const clienteItem = document.createElement('li');
                    clienteItem.innerHTML = `<strong>${comentario.name}</strong> - ${comentario.email}`;
                    clientesLista.appendChild(clienteItem);
                });
            });
    });
});
