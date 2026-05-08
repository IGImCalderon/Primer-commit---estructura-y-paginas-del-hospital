document
.getElementById("formLogin")

.addEventListener(
"submit",

async (e) => {

    e.preventDefault();

    const datos = {

        email:
        document
        .getElementById("email")
        .value,

        password:
        document
        .getElementById("password")
        .value

    };

    const res = await fetch(

        "http://localhost:3000/login",

        {

            method: "POST",

            headers: {

                "Content-Type":
                "application/json"

            },

            body:
            JSON.stringify(datos)

        }

    );

    const data =
    await res.json();

    document
    .getElementById("mensaje")
    .innerText =
    data.mensaje;

    if (data.usuario) {

        localStorage.setItem(

            "usuario",

            JSON.stringify(
                data.usuario
            )

        );

        window.location.href =
        "index.html";

    }

});