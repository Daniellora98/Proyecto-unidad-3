document.addEventListener("DOMContentLoaded", function() {
    // Verificar si ya hay usuarios almacenados en localStorage
    const usuariosGuardados = localStorage.getItem("usuarios");
    const usuarios = usuariosGuardados? JSON.parse(usuariosGuardados) : [
        {id: 1, nombre: "admin", clave: "admin"},
        {id: 2, nombre: "cliente", clave: "cliente"},
    ];

    // Función para guardar los usuarios en localStorage
    function guardarUsuariosEnLocalStorage() {
        localStorage.setItem("usuarios", JSON.stringify(usuarios));
    }

    document.getElementById("iniciar").addEventListener("click", function () {
        let usuario = document.getElementById("usuario").value;
        let clave = document.getElementById("clave").value;

        // Iterar sobre los usuarios para buscar coincidescias
        let usuarioValido = usuarios.find(u => u.nombre === usuario && u.clave === clave);

        if (usuarioValido) {
            // Guardar el estado de sesión en localStorage
            localStorage.setItem('isLoggedIn', true);

            window.location.href = 'index.html';
            //para guardar el usuario en el localStorage
            localStorage.setItem("usuario", usuarioValido.nombre);

        } else {
            alert("Usuario o clave incorrectos");
        }
    });

    // Guardar los usuarios en localStorage al cargar la página
    guardarUsuariosEnLocalStorage();
   
});