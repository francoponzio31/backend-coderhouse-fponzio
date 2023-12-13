import { statusMessages } from "../utils/responses.js"


export function errorMidleware(error, req, res, next){
    return res.status(error.statusCode).json({success:false, status:statusMessages.ERROR, message:error.message})
}