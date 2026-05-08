const usuario = JSON.parse(
    localStorage.getItem("usuario")
);


// SI NO HAY SESIÓN
if (!usuario) {

    window.location.href = "login.html";

}


// BIENVENIDA
document.getElementById("bienvenida")
.innerText =
"Bienvenido " +
usuario.nombre +
" (" +
usuario.rol +
")";


// OCULTAR TODOS LOS PANELES
document.getElementById("clientePanel")
.style.display = "none";

document.getElementById("recepcionistaPanel")
.style.display = "none";

document.getElementById("adminPanel")
.style.display = "none";


// CLIENTE
if (usuario.rol === "cliente") {

    document.getElementById("clientePanel")
    .style.display = "block";

}


// RECEPCIONISTA
if (usuario.rol === "recepcionista") {

    document.getElementById("recepcionistaPanel")
    .style.display = "block";

}


// ADMIN
if (usuario.rol === "admin") {

    document.getElementById("adminPanel")
    .style.display = "block";

}


// CERRAR SESIÓN
function cerrarSesion() {

    localStorage.removeItem("usuario");

    window.location.href = "login.html";

}


// CARGAR USUARIOS (ADMIN)
function cargarUsuarios() {

    fetch("http://localhost:3000/usuarios")

    .then(res => res.json())

    .then(data => {

        let html = "";

        data.forEach(user => {

            html += `
            
            <div class="card">

                <h3>${user.nombre}</h3>

                <p>${user.email}</p>

                <p>Rol: ${user.rol}</p>

            </div>

            `;

        });

        document.getElementById("listaUsuarios")
        .innerHTML = html;

    });

}