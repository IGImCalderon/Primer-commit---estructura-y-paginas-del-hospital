document.getElementById("formRegistro")
.addEventListener("submit", async (e) => {

    e.preventDefault();

    const datos = {

        nombre: document.getElementById("nombre").value,

        email: document.getElementById("email").value,

        password: document.getElementById("password").value,

        rol: document.getElementById("rol").value
    };

    try {

        const respuesta = await fetch(
            "http://localhost:3000/usuarios",
            {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(datos)

            }
        );

        const data = await respuesta.json();

        document.getElementById("mensaje")
        .innerText = data.mensaje;

    } catch (error) {

        document.getElementById("mensaje")
        .innerText =
        "Error al conectar con el servidor";

    }

});