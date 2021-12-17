// App principal
const express = require("express");
const app     = express();

/* bloque de routes */
const mainRoutes = require("./routes/mainRoutes");
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const adminPanel = require("./routes/adminRoutes");

/* ruta de estilos */ 
app.use(express.static("./public"));


app.set('view engine', 'ejs');

//Anclado de rutas [se llama así?]
app.use("/",mainRoutes);
app.use("/",userRoutes);
app.use("/",productRoutes);
app.use("/",adminPanel);


app.listen(3030,()=>{
    console.log("Servidor activo en 3030");
})