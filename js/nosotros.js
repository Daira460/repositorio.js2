
fetch('https://jsonplaceholder.typicode.com/users/3')
      .then(response => response.json())
      .then(persona => {
        console.log(persona)
        // Capturamos del HTML el contenedor sobre el cual queremos mostrar el nombre

        // Mostramos el nombre
      })
