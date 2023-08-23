// Obtener el formulario y los botones
const form = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');
const resetBtn = document.getElementById('resetBtn');

// Función para cargar los datos estáticos desde users.json
async function cargarDatos() {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users/1'); // Ruta al archivo JSON
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error al cargar los datos:', error);
    return [];
  }
}

// Evento de escucha para enviar el formulario
submitBtn.addEventListener('click', async function (event) {
  event.preventDefault();

  const nombreInput = form.querySelector('input[name="nombre"]').value;
  const apellidoInput = form.querySelector('input[name="apellido"]').value;
  const emailInput = form.querySelector('input[name="email"]').value;
  const mensajeInput = form.querySelector('textarea[name="mensaje"]').value;

  if (nombreInput.trim() === '') {
    alert('Por favor, ingresa tu nombre.');
    return;
  }

  console.log('Nombre:', nombreInput);
  console.log('Apellido:', apellidoInput);
  console.log('Email:', emailInput);
  console.log('Mensaje:', mensajeInput);

  const datos = await cargarDatos(); // Cargar los datos estáticos desde users.json
  console.log('Datos cargados:', datos);

  alert('Formulario enviado correctamente.');
  form.reset();
});

// Evento de escucha para borrar el formulario
resetBtn.addEventListener('click', function (event) {
  event.preventDefault();
  form.reset();
});

