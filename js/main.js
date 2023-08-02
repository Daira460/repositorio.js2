 // Se declara un arreglo 'carrito' para almacenar los platillos seleccionados
 let carrito = [];
 // Se seleccionan elementos del DOM mediante clases y etiquetas
 const menu = document.querySelector('.hamburguesa');
 const navegacion = document.querySelector('.navegacion');
 const imagenes = document.querySelectorAll('img');
 const btnTodos = document.querySelector('.todos');
 const btnEnsaladas = document.querySelector('.ensaladas');
 const btnPasta = document.querySelector('.pasta');
 const btnPizza = document.querySelector('.pizza');
 const btnPostres = document.querySelector('.postres');
 const contenedorPlatillos = document.querySelector('.platillos');
 // Se llaman a las funciones 'eventos()' y 'platillos()'.
 document.addEventListener('DOMContentLoaded',()=>{
     eventos();
     platillos();
 });
 // Se agrega un evento click al botón de menú para abrir la navegación
 const eventos = () =>{
     menu.addEventListener('click',abrirMenu);
 }
 // Función que muestra la navegación al hacer clic en el menú
 const abrirMenu = () =>{
      navegacion.classList.remove('ocultar');
      botonCerrar();
 }
 // Función que agrega un botón de cerrar en la navegación y lo asocia a la acción de cerrar el menú
 const botonCerrar = () =>{
  // Creación de elementos del DOM
     const btnCerrar = document.createElement('p');
     const overlay  = document.createElement('div');
     overlay.classList.add('pantalla-completa');
     const body = document.querySelector('body');
     if(document.querySelectorAll('.pantalla-completa').length > 0) return;
     body.appendChild(overlay);
     btnCerrar.textContent = 'x';
     btnCerrar.classList.add('btn-cerrar');
     navegacion.appendChild(btnCerrar);   
     cerrarMenu(btnCerrar,overlay);
     
 }
 // Creación de un observador de intersecciones para cargar imágenes cuando son visibles en la pantalla
 const observer = new IntersectionObserver((entries, observer)=>{
         entries.forEach(entry=>{
             if(entry.isIntersecting){
                 const imagen = entry.target;
                 imagen.src = imagen.dataset.src;
                 observer.unobserve(imagen);
             }
         }); 
 });
 
 // Se observan las imágenes para cargarlas cuando sean visibles
 imagenes.forEach(imagen=>{
     observer.observe(imagen);
 });
 // Función que cierra el menú al hacer clic en el botón de cerrar o en el overlay
 const cerrarMenu = (boton, overlay) =>{
     boton.addEventListener('click',()=>{
         navegacion.classList.add('ocultar');
         overlay.remove();
         boton.remove();
     });
 
     overlay.onclick = function(){
         overlay.remove();
         navegacion.classList.add('ocultar');  
         boton.remove();
     }
 }
 // Función que filtra los platillos por tipo y luego llama a 'mostrarPlatillos()'
 const platillos = () =>{
     let platillosArreglo = [];
     const platillos = document.querySelectorAll('.platillo');
 
     platillos.forEach(platillo=> platillosArreglo = [...platillosArreglo,platillo]);
 
     const ensaladas = platillosArreglo.filter(ensalada=> ensalada.getAttribute('data-platillo') === 'ensalada');
     const pastas = platillosArreglo.filter(pasta => pasta.getAttribute('data-platillo') === 'pasta');
     const pizzas = platillosArreglo.filter(pizza => pizza.getAttribute('data-platillo') === 'pizza');
     const postres = platillosArreglo.filter(postre=> postre.getAttribute('data-platillo') === 'postre');
 
     mostrarPlatillos(ensaladas, pastas, pizzas, postres, platillosArreglo);
 
 }
 // Función que muestra los platillos según el tipo seleccionado en el menú
 const mostrarPlatillos = (ensaladas, pastas, pizzas, postres, todos) =>{
     btnEnsaladas.addEventListener('click', ()=>{
         limpiarHtml(contenedorPlatillos);
         ensaladas.forEach(ensalada=> contenedorPlatillos.appendChild(ensalada));
     });
 
     btnPasta.addEventListener('click', ()=>{
         limpiarHtml(contenedorPlatillos);
          pastas.forEach(pasta=> contenedorPlatillos.appendChild(pasta));
     });
 
     btnPizza.addEventListener('click', ()=>{
         limpiarHtml(contenedorPlatillos);
         pizzas.forEach(pizza=> contenedorPlatillos.appendChild(pizza));
     });
     btnPostres.addEventListener('click', ()=>{
         limpiarHtml(contenedorPlatillos);
         postres.forEach(postre=> contenedorPlatillos.appendChild(postre));
     });
     btnTodos.addEventListener('click',()=>{
         limpiarHtml(contenedorPlatillos);
         todos.forEach(todo=> contenedorPlatillos.appendChild(todo));
     });
 }
 // Función que limpia el contenido del contenedor
 const limpiarHtml = (contenedor) =>{
     while(contenedor.firstChild){
         contenedor.removeChild(contenedor.firstChild);
     }
 }
 // Función que agrega un platillo al carrito y actualiza la lista del carrito
 function agregarAlCarrito(nombre, precio) {
    carrito.push({ nombre, precio });
    actualizarCarrito();
    console.log('Platillo agregado al carrito:', { nombre, precio });
  }

// Función que vacía el carrito y actualiza la lista del carrito
  function vaciarCarrito() {
    carrito = [];
    actualizarCarrito();
    console.log('Carrito vaciado');
  }

// Función que actualiza la lista del carrito y el total
  function actualizarCarrito() {
    const listaProductos = document.getElementById('lista-productos');
    const totalSpan = document.getElementById('total');
    let listaHTML = '';
    let total = 0;

    carrito.forEach((platillo) => {
      listaHTML += `<li>${platillo.nombre} - $${platillo.precio.toFixed(2)}</li>`;
      total += platillo.precio;
    });

    listaProductos.innerHTML = listaHTML;
    totalSpan.textContent = `$${total.toFixed(2)}`;

    console.log('Contenido del carrito:', carrito);
  }

 // Asignación de eventos click a los botones de "Agregar al carrito"
  const botonesAgregar = document.querySelectorAll('.btn-agregar-carrito');

  botonesAgregar.forEach((boton) => {
    boton.addEventListener('click', () => {
      const nombre = boton.dataset.nombre;
      const precio = parseFloat(boton.dataset.precio);
      agregarAlCarrito(nombre, precio);
    });
  });
  // Asignación del evento click al botón de vaciar carrito
  const botonVaciar = document.getElementById('vaciar-carrito');

  botonVaciar.addEventListener('click', () => {
    vaciarCarrito();
  });
  // Función que muestra un mensaje de error en el carrito
  function mostrarError(mensaje) {
    const mensajeError = document.createElement('p');
    mensajeError.textContent = mensaje;
    mensajeError.style.color = 'red';

    const contenedorCarrito = document.getElementById('carrito');
    contenedorCarrito.insertBefore(mensajeError, botonFinalizarCompra);
  }
//Funcion que muestra un mensaje de finalizar compra
  const botonFinalizarCompra = document.getElementById('finalizar-compra');


  botonFinalizarCompra.addEventListener('click', () => {
    if (carrito.length === 0) {
      alert('El carrito está vacío. Agrega platillos antes de finalizar la compra.');
    } else {
      alert('¡Gracias por tu compra! Tu pedido ha sido procesado exitosamente.');
      vaciarCarrito();
    }
  })
// Función para guardar el carrito en el Storage como un JSON
function guardarCarritoEnStorage() {
  const carritoJSON = JSON.stringify(carrito);
  localStorage.setItem('carrito', carritoJSON);
}

// Función para cargar el carrito desde el Storage y actualizar el carrito
function cargarCarritoDesdeStorage() {
  const carritoJSON = localStorage.getItem('carrito');
  if (carritoJSON) {
    carrito = JSON.parse(carritoJSON);
    actualizarCarrito();
  }
}

// Cargar el carrito desde el Storage al cargar la página
document.addEventListener('DOMContentLoaded', () => {
  cargarCarritoDesdeStorage();
});