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
  class Calendar {
    constructor(id) {
        this.cells = [];
        this.selectedDate = null;
        this.currentMonth = moment();
        this.elCalendar = document.getElementById(id);
        this.showTemplate();
        this.elGridBody = this.elCalendar.querySelector('.grid__body');
        this.elMonthName = this.elCalendar.querySelector('.month-name');
        this.showCells();
    }

    showTemplate() {
        this.elCalendar.innerHTML = this.getTemplate();
        this.addEventListenerToControls();
    }

    getTemplate() {
        let template = `
            <div class="calendar__header">
                <button type="button" class="control control--prev">&lt;</button>
                <span class="month-name">dic 2019</span>
                <button type="button" class="control control--next">&gt;</button>
            </div>
            <div class="calendar__body">
                <div class="grid">
                    <div class="grid__header">
                        <span class="grid__cell grid__cell--gh">Lun</span>
                        <span class="grid__cell grid__cell--gh">Mar</span>
                        <span class="grid__cell grid__cell--gh">Mié</span>
                        <span class="grid__cell grid__cell--gh">Jue</span>
                        <span class="grid__cell grid__cell--gh">Vie</span>
                        <span class="grid__cell grid__cell--gh">Sáb</span>
                        <span class="grid__cell grid__cell--gh">Dom</span>
                    </div>
                    <div class="grid__body">

                    </div>
                </div>
            </div>
        `;
        return template;
    }

    addEventListenerToControls() {
        let elControls = this.elCalendar.querySelectorAll('.control');
        elControls.forEach(elControl => {
            elControl.addEventListener('click', e => {
                let elTarget = e.target;
                if (elTarget.classList.contains('control--next')) {
                    this.changeMonth(true);
                } else {
                    this.changeMonth(false);
                }
                this.showCells();
            });
        });
    }

    changeMonth(next = true) {
        if (next) {
            this.currentMonth.add(1, 'months');
        } else {
            this.currentMonth.subtract(1, 'months');
        }
    }

    showCells() {
        this.cells = this.generateDates(this.currentMonth);
        if (this.cells === null) {
            console.error('No fue posible generar las fechas del calendario.');
            return;
        }

        this.elGridBody.innerHTML = '';
        let templateCells = '';
        let disabledClass = '';
        for (let i = 0; i < this.cells.length; i++) {
            disabledClass = '';
            if (!this.cells[i].isInCurrentMonth) {
                disabledClass = 'grid__cell--disabled';
            }
            // <span class="grid__cell grid__cell--gd grid__cell--selected">1</span>
            templateCells += `
                <span class="grid__cell grid__cell--gd ${disabledClass}" data-cell-id="${i}">
                    ${this.cells[i].date.date()}
                </span>
            `;
        }
        this.elMonthName.innerHTML = this.currentMonth.format('MMM YYYY');
        this.elGridBody.innerHTML = templateCells;
        this.addEventListenerToCells();
    }

    generateDates(monthToShow = moment()) {
        if (!moment.isMoment(monthToShow)) {
            return null;
        }
        let dateStart = moment(monthToShow).startOf('month');
        let dateEnd = moment(monthToShow).endOf('month');
        let cells = [];

        // Encontrar la primer fecha que se va a mostrar en el calendario
        while (dateStart.day() !== 1) {
            dateStart.subtract(1, 'days');
        }

        // Encontrar la última fecha que se va a mostrar en el calendario
        while (dateEnd.day() !== 0) {
            dateEnd.add(1, 'days');
        }

        // Genera las fechas del grid
        do {
            cells.push({
                date: moment(dateStart),
                isInCurrentMonth: dateStart.month() === monthToShow.month()
            });
            dateStart.add(1, 'days');
        } while (dateStart.isSameOrBefore(dateEnd));

        return cells;
    }

    addEventListenerToCells() {
        let elCells = this.elCalendar.querySelectorAll('.grid__cell--gd');
        elCells.forEach(elCell => {
            elCell.addEventListener('click', e => {
                let elTarget = e.target;
                if (elTarget.classList.contains('grid__cell--disabled') || elTarget.classList.contains('grid__cell--selected')) {
                    return;
                }
                // Deselecionar la celda anterior
                let selectedCell = this.elGridBody.querySelector('.grid__cell--selected');
                if (selectedCell) {
                    selectedCell.classList.remove('grid__cell--selected');
                }
                // Selecionar la nueva celda
                elTarget.classList.add('grid__cell--selected');
                this.selectedDate = this.cells[parseInt(elTarget.dataset.cellId)].date;
                // Lanzar evento change
                this.elCalendar.dispatchEvent(new Event('change'));
            });
        });
    }

    getElement() {
        return this.elCalendar;
    }

    value() {
        return this.selectedDate;
    }
}
let calendar = new Calendar('calendar');
        calendar.getElement().addEventListener('change', e => {
            console.log(calendar.value().format('LLL'));
        });

        let calendar2 = new Calendar('calendar2');
        calendar2.getElement().addEventListener('change', e => {
            console.log(calendar2.value().format('LLL'));
        });