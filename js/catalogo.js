//Catalogo

const catalogoGuardados = localStorage.getItem("catalogo");
let catalogo = catalogoGuardados
  ? JSON.parse(catalogoGuardados)
  : [
      { id: 1, imagen: "img/1.jpg", precio: 10 },
      { id: 2, imagen: "img/2.jpg", precio: 15 },
      { id: 3, imagen: "img/3.jpg", precio: 20 },
    ];

function mostrarCatalogo() {
  const productosTable = document
    .getElementById("productos-table")
    .getElementsByTagName("tbody")[0];
  productosTable.innerHTML = "";

  catalogo.forEach((producto) => {
    const row = productosTable.insertRow();

    row.innerHTML = `
          <td>${producto.id}</td>
          <td><img src="${producto.imagen}" alt="Producto ${producto.id}" style="max-width: 100px;"></td>
          <td>$${producto.precio}</td>
          <td>
              <button class="editar-p" data-id="${producto.id}">Editar</button>
              <button class="eliminar-p" data-id="${producto.id}">Eliminar</button>
          </td>
      `;
  });
}

mostrarCatalogo();
//Agregar
document
  .getElementById("agregar-producto")
  .addEventListener("click", function () {
    agregarProducto();
  });

//Eliminar
document.addEventListener("click", function (event) {
  if (event.target.classList.contains("eliminar-p")) {
    const productId = parseInt(event.target.getAttribute("data-id"));
    eliminarProducto(productId);
  }
});

//Editar
document.addEventListener("click", function (event) {
  if (event.target.classList.contains("editar-p")) {
    const productId = parseInt(event.target.getAttribute("data-id"));
    editarProducto(productId);
  }
});

//Funciones

function agregarProducto() {
  // Crear un campo de entrada de tipo "file"
  const input = document.createElement("input");
  input.type = "file";
  input.accept = "image/*"; // Permitir solo archivos de imagen

  // Escuchar el evento 'change' del campo de entrada de tipo "file"
  input.addEventListener("change", function (event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        const imagenUrl = e.target.result;
        const precio = parseFloat(
          prompt("Ingrese el precio del nuevo producto:")
        );

        if (!isNaN(precio)) {
          const nuevoProducto = {
            id: catalogo.length + 1,
            imagen: imagenUrl,
            precio: precio,
          };

          catalogo.push(nuevoProducto);
          localStorage.setItem("catalogo", JSON.stringify(catalogo));
          mostrarCatalogo();
        } else {
          alert("Ingrese un precio válido.");
        }
      };
      // Leer el contenido del archivo como una URL de datos
      reader.readAsDataURL(file);
    }
  });
  // Hacer clic en el campo de entrada de tipo "file" para abrir el selector de archivos
  input.click();
}

function eliminarProducto(productId) {
  // Filtrar el catálogo para obtener todos los productos excepto el que se va a eliminar
  catalogo = catalogo.filter((producto) => producto.id !== productId);

  localStorage.setItem("catalogo", JSON.stringify(catalogo));

  mostrarCatalogo();
}

function editarProducto(id) {
  const index = catalogo.findIndex((producto) => producto.id === id);

  if (index !== -1) {
      const confirmarPrecio = confirm("¿Desea cambiar el precio del producto?");
      let nuevoPrecio = catalogo[index].precio; // Por defecto, mantener el precio actual

      // Si el usuario confirma cambiar el precio, solicitar el nuevo precio
      if (confirmarPrecio) {
          nuevoPrecio = parseFloat(prompt("Ingrese el nuevo precio para el producto:"));
      }

      if (!isNaN(nuevoPrecio)) {
          // Crear el campo de entrada de tipo "file" para seleccionar la nueva imagen
          const input = document.createElement("input");
          input.type = "file";
          input.accept = "image/*";

          // Escuchar el evento 'change' del campo de entrada de tipo "file"
          input.addEventListener("change", function (event) {
              const file = event.target.files[0];

              if (file) {
                  const reader = new FileReader();

                  reader.onload = function (e) {
                      // Actualizar la imagen del producto
                      catalogo[index].imagen = e.target.result;
                      // Actualizar el catálogo en localStorage
                      localStorage.setItem("catalogo", JSON.stringify(catalogo));
                      // Mostrar el catálogo actualizado
                      mostrarCatalogo();
                  };

                  reader.readAsDataURL(file);
              }
          });

          // Abrir el selector de archivos
          input.click();

          // Si el usuario canceló la entrada del nuevo precio, no actualizar el producto
          if (!confirmarPrecio) {
              return;
          }

          // Actualizar el precio del producto
          catalogo[index].precio = nuevoPrecio;
          // Actualizar el catálogo en localStorage
          localStorage.setItem("catalogo", JSON.stringify(catalogo));
          // Mostrar el catálogo actualizado
          mostrarCatalogo();
      } else {
          // Si el usuario ingresó un precio inválido, mostrar un mensaje de alerta
          alert("Ingrese un precio válido.");
          return; // Salir de la función si el precio no es válido
      }
  } else {
      alert("Producto no encontrado.");
  }
}