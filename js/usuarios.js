document.addEventListener("DOMContentLoaded", function () {
    // Verificar si ya hay usuarios almacenados en localStorage
    const usuariosGuardados = localStorage.getItem("usuarios");
    let usuarios = usuariosGuardados
      ? JSON.parse(usuariosGuardados)
      : [
          { id: 1, nombre: "admin", clave: "admin" },
          { id: 2, nombre: "cliente", clave: "cliente" },
        ];
  
    // Función para guardar los usuarios en localStorage
    function guardarUsuariosEnLocalStorage() {
      localStorage.setItem("usuarios", JSON.stringify(usuarios));
    }
  
    // Función para mostrar los usuarios en la tabla
    function mostrarUsuarios() {
      const tableBody = document
        .getElementById("usuarios-table")
        .getElementsByTagName("tbody")[0];
      tableBody.innerHTML = "";
  
      usuarios.forEach((usuario) => {
        const row = tableBody.insertRow();
  
        row.innerHTML = `
                  <td>${usuario.id}</td>
                  <td>${usuario.nombre}</td>
                  <td>${usuario.clave}</td>
                  <td>
                      <button class="editar" data-id="${usuario.id}">Editar</button>
                      <button class="eliminar" data-id="${usuario.id}">Eliminar</button>
                  </td>
              `;
      });
    }
  
    // Función para agregar un usuario
    function agregarUsuario() {
      const nuevoNombre = prompt("Ingrese el nombre del nuevo usuario:");
      const nuevaClave = prompt("Ingrese la clave del nuevo usuario:");
  
      if (nuevoNombre && nuevaClave) {
        const nuevoUsuario = {
          id: usuarios.length + 1,
          nombre: nuevoNombre,
          clave: nuevaClave,
        };
        usuarios.push(nuevoUsuario);
        guardarUsuariosEnLocalStorage();
        mostrarUsuarios();
      }
    }
  
    function editarUsuario(userId) {
      const usuarioIndex = usuarios.findIndex((usuario) => usuario.id === userId);
      if (usuarioIndex !== -1) {
          const nuevoNombre = prompt("Ingrese el nuevo nombre:");
          const nuevaClave = prompt("Ingrese la nueva clave:");
  
          // Verificar si se ingresó un nuevo nombre o clave
          if (nuevoNombre !== null || nuevaClave !== null) {
              // Actualizar el nombre si se ingresó un nuevo valor
              if (nuevoNombre !== null) {
                  usuarios[usuarioIndex].nombre = nuevoNombre;
              }
              // Actualizar la clave si se ingresó un nuevo valor
              if (nuevaClave !== null) {
                  usuarios[usuarioIndex].clave = nuevaClave;
              }
              // Guardar los cambios y mostrar los usuarios actualizados
              guardarUsuariosEnLocalStorage();
              mostrarUsuarios();
          }
      }
  }
  
  
    // Función para eliminar un usuario
    function eliminarUsuario(userId) {
      usuarios = usuarios.filter((usuario) => usuario.id !== userId);
      guardarUsuariosEnLocalStorage();
      mostrarUsuarios();
    }
  
    mostrarUsuarios();
    document
      .getElementById("agregar-usuario")
      .addEventListener("click", agregarUsuario);
  
    // Escuchar eventos de clic en los botones de editar y eliminar
    document.addEventListener("click", function (event) {
      if (event.target.classList.contains("editar")) {
        const userId = parseInt(event.target.getAttribute("data-id"));
        editarUsuario(userId);
      }
      if (event.target.classList.contains("eliminar")) {
        const userId = parseInt(event.target.getAttribute("data-id"));
        eliminarUsuario(userId);
      }
    });
});