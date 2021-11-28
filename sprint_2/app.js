const express = require("express");
const path    = require("path");
const app     = express();
const puerto  = 3030; //default
const publicPath = path.join(__dirname,"./public");

app.use(express.static(publicPath));

app.get("/",function(req,res){
    //res.send("Bienvenido");
    res.sendFile(path.join(__dirname,'/views/home.html'));
});


app.get("/register", (req,res)=>{
    res.sendFile(path.join(__dirname,'/views/register.html'));
});

app.get("/login", (req,res)=>{
    res.sendFile(path.join(__dirname,'/views/login.html'));
});

//Preferencialmente al final
app.listen(3030, ()=> {
    console.log(
    `Servidor activo en el puerto ${puerto}`
    );
});
