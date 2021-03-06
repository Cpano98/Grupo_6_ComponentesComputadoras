const express = require("express");
const path    = require("path");
const app     = express();
const puerto  = 3030; //default

const publicPath = path.join(__dirname,"./public");

app.use(express.static(publicPath));

app.get("/",function(req,res){
    //res.send("Bienvenido");
    res.sendFile(path.join(__dirname,'/views/index.html'));
});


app.get("/register", (req,res)=>{
    res.sendFile(path.join(__dirname,'/views/register.html'));
});

app.get("/login", (req,res)=>{
    res.sendFile(path.join(__dirname,'/views/login.html'));
});

app.get("/productCart", (req,res)=>{
    res.sendFile(path.join(__dirname,'/views/productCart.html'));
});

app.get("/productDetail", (req,res)=>{
    res.sendFile(path.join(__dirname,'/views/productDetail.html'));
});


//Preferencialmente al final
app.listen(puerto, ()=> {
    console.log(`Servidor activo en el puerto ${puerto}`);
});
