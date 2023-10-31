export function loginRequired(req, res, next){
    if(req.session && req.user && req.user.email){
        next()
    }
    else{
        res.redirect("/login")
    }
}