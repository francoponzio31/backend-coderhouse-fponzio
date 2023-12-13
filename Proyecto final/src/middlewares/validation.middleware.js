import customError from "../utils/customError.js"


export function validateBodyParams(params) {
  return function(req, res, next) {
    for (const param of params) {
      const { name, type } = param
      if (!req.body.hasOwnProperty(name) || typeof req.body[name] !== type) {
        customError.throw(`The parameter ${name} is required and must be of type ${type}`, 400)
      }
    }
    next()
  }
}
  