document.addEventListener("DOMContentLoaded", function () {
    const catalogoGuardados = localStorage.getItem("catalogo");
    const catalogo = catalogoGuardados? JSON.parse(catalogoGuardados):[
        { id: 1, imagen: "img/1.jpg", precio: 10 },
        { id: 2, imagen: "img/2.jpg", precio: 15 },
        { id: 3, imagen: "img/3.jpg", precio: 20 },
        // Agrega más productos aquí
    ];

    const catalogoContainer = document.getElementById("catalogo");
    const resumenCompra = document.getElementById("resumenCompra");
    const total = document.getElementById("total");

    

    // Genera las tarjetas de productos en el catálogo
    catalogo.forEach((producto) => {
        const card = document.createElement("div");
        card.classList.add("col-md-4", "mb-4");
        card.innerHTML = `
            <div class="card">
                <img src="${producto.imagen}" class="card-img-top" alt="Producto ${producto.id}">
                <div class="card-body">
                    <h5 class="card-title fs-1 ">Producto ${producto.id}</h5>
                    <p class="card-text fs-2">Precio: $${producto.precio}</p>
                    <label for="cantidadProducto${producto.id}">Cantidad:</label>
                    <input type="number" id="cantidadProducto${producto.id}" class="form-control">
                    <button class="btn-add btn btn-dark mt-2" data-id="${producto.id}">Agregar al Carrito</button>
                </div>
            </div>
        `;
        catalogoContainer.appendChild(card);

        // Agrega un evento de clic al botón de "Agregar al Carrito"
        const botonAgregar = card.querySelector("button");
        botonAgregar.addEventListener("click", function () {
            const cantidad = parseInt(document.getElementById(`cantidadProducto${producto.id}`).value);

            if (cantidad > 0) {
                agregarProductoAlCarrito(producto, cantidad);
            }
        });
    });

    const carrito = [];

    function agregarProductoAlCarrito(producto, cantidad) {
        // Busca si el producto ya está en el carrito
        const productoEnCarrito = carrito.find((item) => item.producto.id === producto.id);

        if (productoEnCarrito) {
            // Si ya está en el carrito, actualiza la cantidad
            productoEnCarrito.cantidad += cantidad;
        } else {
            // Si no está en el carrito, agrega un nuevo elemento al carrito
            carrito.push({ producto, cantidad });
        }

        // Actualiza el resumen de la compra
        actualizarResumenCompra();
    }

    function actualizarResumenCompra() {
        // Limpia el resumen de compra
        resumenCompra.innerHTML = "";
        let subtotalTotal = 0;

        carrito.forEach((item) => {
            const fila = document.createElement("tr");
            fila.innerHTML = `
                <td>Producto ${item.producto.id}</td>
                <td>${item.cantidad}</td>
                <td>$${item.producto.precio * item.cantidad}</td>
            `;
            resumenCompra.appendChild(fila);

            subtotalTotal += item.producto.precio * item.cantidad;
        });

        // Actualiza el total
        total.textContent = `$${subtotalTotal}`;
    }

    // Agregar evento al botón "Finalizar Compra"
    document.getElementById("finalizarCompra").addEventListener("click", function () {
        if (carrito.length > 0) {
          localStorage.setItem("carrito", JSON.stringify(carrito));
          window.location.href = "ticket.html";
        }
      });

        // Agregar evento de clic al botón de logout
    document.getElementById("logout").addEventListener("click", function () {
        // Eliminar el elemento isLoggedIn de localStorage
        localStorage.removeItem('isLoggedIn');

        // Redirigir al usuario a la página de inicio de sesión
        window.location.href = 'login.html';
    });
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const usuario = localStorage.getItem("usuario");

    if (isLoggedIn) {
        console.log("El usuario está logeado.");

        // Verifica si el usuario es cliente
        if (usuario === "admin") {
            // Oculta el botón "envio"
        } else{
            
            ocultarBoton();
        }
    } else {
        console.log("El usuario no está logeado.");
    }

    function ocultarBoton() {
        const botonCatalogo = document.getElementById("ocultarCatalogo");
        botonCatalogo.style.display = "none";
        const botonUsuarios = document.getElementById("ocultarUsuarios");
        botonUsuarios.style.display = "none"; 
    }

     
});
