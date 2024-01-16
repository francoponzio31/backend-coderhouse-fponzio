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

        if (Array.isArray(role) && role.includes(req.user.role)){
            next()
        }
        else if(typeof(role) === "string" && req.user.role === role){
            next()
        }
        else{
            customError.throw("Unauthorized resource", 403)
        }
    }
}