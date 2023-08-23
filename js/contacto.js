// Obtener el formulario y los botones
const form = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');
const resetBtn = document.getElementById('resetBtn');
fetch('https://jsonplaceholder.typicode.com/posts/1/comments')
    .then((response) => response.json())
    .then((json) => {
        const testimonios = document.querySelectorAll('.testimonio');

        json.forEach((comentario, index) => {
            if (testimonios[index]) {
                const comentarioP = testimonios[index].querySelector('p');
                if (comentarioP) {
                    comentarioP.innerText = comentario.body;
                }
            }
        });
    });
