const https = require("https");
const express = require("express");
const selfsigned = require("selfsigned");

const app = express();

app.get("/", (req, res) => {
    res.send("HTTPS funcionando correctamente");
});

const attrs = [{ name: "commonName", value: "localhost" }];

const pems = selfsigned.generate(attrs, {
    algorithm: "sha256",
    days: 365,
    keySize: 2048
});

https.createServer(
    {
        key: pems.private,
        cert: pems.cert,
        secureProtocol: "TLS_method"
    },
    app
).listen(3443, () => {

    console.log("Servidor HTTPS funcionando:");
    console.log("https://127.0.0.1:3443");

});