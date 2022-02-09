const cookieParser = require("cookie-parser");

function adminMiddle(req, res, next){
    if(!req.session.userLogged || !cookies.userEmail){
        return res.redirect('/user/login');
    }
    
    next();
} 

module.exports = adminMiddle;