const express = require("express");
const routerUser = require("./router/user");
const routertask = require("./router/task");

const app = express();

app.use(express.json());

app.use('/api', routerUser);
app.use('/api', routertask);

app.listen(3000, () => {
    console.log("Servidor corriendo en el puerto 3000");
});
