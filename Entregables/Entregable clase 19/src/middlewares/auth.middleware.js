import customError from "../utils/customError.js"


export function loginRequired(req, res, next){
    if(req.session && req.user && req.user.email){
        next()
    }
    else{
        return res.redirect("/login")
    }
}

export function roleRequired(role){
    return (req, res, next) => {
        if(req.user.role === role){
            next()
        }
        else{
            customError.throw(`The role ${role} is required`, 403)
        }
    }
}