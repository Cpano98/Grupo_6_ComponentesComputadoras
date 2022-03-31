// ************ Require's ************
const createError = require("http-errors");
const cookieParser = require("cookie-parser");
const express = require("express");
const session = require("express-session");
const logger = require("morgan");
const path = require("path");
const methodOverride = require("method-override"); // Pasar poder usar los métodos PUT y DELETE

// ************ express() - (don't touch) ************
const app = express();

app.use(express.urlencoded({ extended: true }));
//app.use(logger('dev'));
//app.use(express.json());
app.use(cookieParser());
app.use(methodOverride("_method")); // Pasar poder pisar el method="POST" en el formulario por PUT y DELETE
//app.use(express.bodyParser());
app.use(
  session({
    secret: "10DeCarnazaParaLlevar",
    resave: false,
    saveUninitialized: false,
    //cookie: { secure: true } //Session debe indicar cookies, no cookies default
  })
);
app.use(express.json());

/* bloque de routes */
const mainRoutes = require("./src/routes/mainRoutes");
const userRoutes = require("./src/routes/userRoutes");
const productRoutes = require("./src/routes/productRoutes");
const purchaseRoutes = require("./src/routes/purchaseRoutes");

/* bloque de middlewares globales  */
const loggedMiddle = require("./src/middlewares/loggedMiddle");

/* ruta de estilos */
app.use(express.static("./src/public"));

/* definiciones default de direcciones de directorios está en express */
//USO DE SUBFOLDERS:
app.set("views", [
  path.join(__dirname + "/src/views"),
  path.join(__dirname + "/src/views/admin"),
  path.join(__dirname + "/src/views/products"),
  path.join(__dirname + "/src/views/purchase"),
  path.join(__dirname + "/src/views/users"),
  path.join(__dirname + "/src/views/partials"),
]);

app.set("view engine", "ejs");
//aplicación de los middlewares globales
app.use(loggedMiddle);
//Anclado de rutas [se llama así?]
app.use("/", mainRoutes);
app.use("/user", userRoutes);
app.use("/products", productRoutes);
app.use("/cart", purchaseRoutes);
//Callback de 404
app.use( (req, res, next)=>{
  res.status(404).render('error4xx.ejs', {
    xx:'04', 
    msg:'Bad Request'});
});


//Heroku Config
app.listen(process.env.PORT || 3000, function () {
  console.log("Servidor activo en 3000");
});
