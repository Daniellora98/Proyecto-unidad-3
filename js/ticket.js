document.addEventListener("DOMContentLoaded", function () {
    // Recupera el carrito del almacenamiento local
    const carrito = JSON.parse(localStorage.getItem("carrito"));

    // Si hay productos en el carrito, genera el ticket de compra
    if (carrito && carrito.length > 0) {
        const ticketContainer = document.createElement("div");
        ticketContainer.classList.add("ticket-container"); // Agregar clase para estilos de contenedor

        const ticketTitle = document.createElement("h1");
        ticketTitle.classList.add("ticket-title"); // Agregar clase para estilos de título
        ticketTitle.textContent = "Ticket de Compra";

        const ticketTable = document.createElement("table");
        ticketTable.classList.add("table", "ticket-table"); // Agregar clases para estilos de tabla
        const tableHead = `
            <thead>
                <tr>
                    <th>Producto</th>
                    <th>Cantidad</th>
                    <th>Subtotal</th>
                </tr>
            </thead>
        `;
        let tableBody = "<tbody>";

        let total = 0;
        carrito.forEach(item => {
            const subtotal = item.producto.precio * item.cantidad;
            total += subtotal;
            tableBody += `
                <tr>
                    <td>${item.producto.id}</td>
                    <td>${item.cantidad}</td>
                    <td>$${subtotal}</td>
                </tr>
            `;
        });

        tableBody += `</tbody>`;
        const tableFoot = `
            <tfoot>
                <tr>
                    <td colspan="2">Total:</td>
                    <td style="color: #ff0077; font-weight: bold;">$${total}</td> <!-- Estilo en línea para el total -->
                </tr>
            </tfoot>
        `;

        ticketTable.innerHTML = tableHead + tableBody + tableFoot;

        ticketContainer.appendChild(ticketTitle);
        ticketContainer.appendChild(ticketTable);

        // Aplicar estilos al contenedor del ticket
        ticketContainer.style.backgroundColor = "#fff";
        ticketContainer.style.border = "2px solid #ff0077";
        ticketContainer.style.borderRadius = "10px";
        ticketContainer.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.2)";
        ticketContainer.style.width = "80%";
        ticketContainer.style.maxWidth = "600px"; // Ancho máximo del ticket
        ticketContainer.style.margin = "0 auto"; // Centrar el ticket horizontalmente
        ticketContainer.style.padding = "20px";
        ticketContainer.style.marginTop = "50px";
        ticketContainer.style.boxSizing = "border-box"; // Incluir el padding y borde en el ancho
        ticketContainer.style.textAlign = "center"; // Centrar el contenido del ticket

        // Agregar líneas divisorias entre las filas de la tabla
        const tableRows = ticketTable.querySelectorAll("tr");
        tableRows.forEach(row => {
            row.style.borderBottom = "1px solid #ddd";
        });

        document.body.appendChild(ticketContainer);

        // Limpia el carrito del almacenamiento local después de generar el ticket
        localStorage.removeItem("carrito");
    } else {
        // Si no hay productos en el carrito, muestra un mensaje o redirige a una página de error
        console.log("No hay productos en el carrito.");
    }
});
