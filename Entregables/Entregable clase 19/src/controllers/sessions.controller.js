import { errorMessages, successMessages, statusMessages } from "../utils/responses.js"
import customError from "../utils/customError.js"
import { logger } from "../utils/winston.js"


class SessionsController{
    async getCurrentUser(req, res){
        try {
            const user = req.user
            delete user.password
            return res.status(200).json({user: user, message:successMessages.FOUNDED, status:statusMessages.SUCCESS})
        } catch (error) {
            logger.error(error)
            customError.throw(errorMessages.SERVER_ERROR, 500)
        }
    }

    async logout(req, res){
        try {
            req.logout((error) => {
                if (error) {
                    logger.error(error)
                }
                req.session.destroy((error) => {
                    if (error) {
                        logger.error(error)
                    } else {
                        return res.redirect("/login")
                    }
                })
            })
        } catch (error) {
            logger.error(error)
            customError.throw(errorMessages.SERVER_ERROR, 500)
        }
    }

}

const sessionsController = new SessionsController()
export default sessionsController
