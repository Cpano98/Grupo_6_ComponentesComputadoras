// ************ Require's ************
const createError = require('http-errors');
const cookieParser = require('cookie-parser');
const express = require('express');
const logger = require('morgan');
const path = require('path');
const methodOverride = require('method-override'); // Pasar poder usar los métodos PUT y DELETE

// ************ express() - (don't touch) ************
const app = express();

app.use(express.urlencoded({ extended: true }));
//app.use(logger('dev'));
//app.use(express.json());
//app.use(cookieParser());
app.use(methodOverride('_method')); // Pasar poder pisar el method="POST" en el formulario por PUT y DELETE
//app.use(express.bodyParser());

/* bloque de routes */
const mainRoutes = require("./src/routes/mainRoutes");
const userRoutes = require("./src/routes/userRoutes");
const productRoutes = require("./src/routes/productRoutes");


/* ruta de estilos */
app.use(express.static("./src/public"));



app.set('view engine', 'ejs');

//Anclado de rutas [se llama así?]
app.use("/", mainRoutes);
app.use("/", userRoutes);
app.use("/products", productRoutes);
//app.use("/admin", adminPanel);


//Heroku Config
app.listen(process.env.PORT || 3000, function(){
    console.log("Servidor activo en 3000");
})
    
