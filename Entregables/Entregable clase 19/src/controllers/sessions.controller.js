import { successMessages, statusMessages } from "../utils/responses.js"
import { logger } from "../utils/winston.js"


class SessionsController{
    async getCurrentUser(req, res, next){
        try {
            const user = req.user
            delete user.password
            return res.status(200).json({user: user, message:successMessages.FOUNDED, status:statusMessages.SUCCESS})
        } catch (error) {
            next(error)
        }
    }

    async logout(req, res, next){
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
            next(error)
        }
    }

}

const sessionsController = new SessionsController()
export default sessionsController
