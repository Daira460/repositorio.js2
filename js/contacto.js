// Obtener el formulario y los botones
const form = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');
const resetBtn = document.getElementById('resetBtn');

// Evento de escucha para enviar el formulario
submitBtn.addEventListener('click', function (event) {
    event.preventDefault(); // Prevenir que el formulario se envíe automáticamente

    // Obtener los valores de los campos del formulario
    const nombreInput = form.querySelector('input[name="nombre"]').value;
    const apellidoInput = form.querySelector('input[name="apellido"]').value;
    const emailInput = form.querySelector('input[name="email"]').value;
    const mensajeInput = form.querySelector('textarea[name="mensaje"]').value;

    // Validación simple: verificar si el campo de nombre está vacío
    if (nombreInput.trim() === '') {
        alert('Por favor, ingresa tu nombre.');
        return;
    }

    // Mostrar información en la consola
    console.log('Nombre:', nombreInput);
    console.log('Apellido:', apellidoInput);
    console.log('Email:', emailInput);
    console.log('Mensaje:', mensajeInput);

    alert('Formulario enviado correctamente.');
    form.reset(); // Limpiar el formulario después de enviarlo.
});


