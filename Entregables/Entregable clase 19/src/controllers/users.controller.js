import usersService from "../services/users.service.js"
import { errorMessages, successMessages, statusMessages } from "../utils/responses.js"
import customError from "../utils/customError.js"
import { logger } from "../utils/winston.js"


class UsersController{
    async restorePassword(req, res, next) {
        try {
            const userId = req.params.uid
            const newPassword = req.body.newPassword
            const success = await usersService.restorePassword(userId, newPassword)
            if (!success){
                customError.throw(errorMessages.SAME_PASSWORD_ERROR, 400)
            }
            return res.status(200).json({message:successMessages.UPDATED, status:statusMessages.SUCCESS})
        } catch (error) {
            next(error)
        }     
    }

    async getRestorePasswordMail(req, res, next) {
        try {
            const userId = req.params.uid
            usersService.sendRestorePasswordMail(userId)
            return res.status(200).json({message:successMessages.MAIL_SENT, status:statusMessages.SUCCESS})
        } catch (error) {
            next(error)
        }     
    }

    async togglePremiumRole(req, res, next) {
        try {
            const userId = req.params.uid
            usersService.togglePremiumRole(userId)
            return res.status(200).json({message:successMessages.UPDATED, status:statusMessages.SUCCESS})
        } catch (error) {
            next(error)
        }     
    }

}

const usersController = new UsersController()
export default usersController
