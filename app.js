// App principal
const express = require("express");
const app     = express();

/* bloque de routes */
const mainRoutes = require("./routes/mainRoutes");

/* ruta de estilos */ 
app.use(express.static("./public"));


app.set('view engine', 'ejs');

app.use("/",mainRoutes);
app.listen(3030,()=>{
    console.log("Servidor activo en 3030");
})