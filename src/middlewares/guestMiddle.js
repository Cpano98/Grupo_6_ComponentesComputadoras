//Middleware que revisa si el usuario ya está logeado para darle
// o no accesos

function guestMiddle(req, res, next){
    if(req.session.userLogged){
        return res.render('profile.ejs',{user:req.session.userLogged});
    }
    next();
} 

module.exports = guestMiddle;