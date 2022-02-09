//Global middleware para autorizar acceso a otras páginas

function loggedMiddle(req, res, next){
    
    res.locals.isLogged = false; //Bandera global
    if(req.session && req.session.userLogged){ 
        res.locals.isLogged = true; //Bandera global
    }   res.locals.userLogged = req.session.userLogged; //Usuario global
    next();
} 

module.exports = loggedMiddle;