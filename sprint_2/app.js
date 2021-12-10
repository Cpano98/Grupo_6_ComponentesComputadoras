const express = require("express");
//const path = require("path");
const app = express();
const puerto = 3030; //default

//Sistema de ruteo
//=====navegacion de sitio======
const navegacionSitio = require('./routes/navegacionSitio.js');


/* //Public Path ahora en NavegacionSitio
const publicPath = path.join(__dirname, "./public");
app.use(express.static(publicPath));
*/

//Uso de rutas:
app.use('/', navegacionSitio);

//Servidor activo
app.listen(puerto, () => {
    console.log(`Servidor activo en el puerto ${puerto}`);
});
