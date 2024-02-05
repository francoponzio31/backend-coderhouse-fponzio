import usersDao from "../dao/users.mongo.js"
import cartsService from "../services/carts.service.js"
import { sendMail } from "../utils/nodemailer.js"
import jwt from "jsonwebtoken"
import config from "../config/config.js"
import { hashData, compareHashedData } from "../utils/utils.js"


class UsersService{
    async getUserByEmail(email){
        return usersDao.getByEmail(email)
    }

    async getUserById(userId){
        return usersDao.getById(userId)
    }

    async getUserById(userId){
        return usersDao.getById(userId)
    }

    async createUser(userData){
        const userCart = await cartsService.createCart()
        userData.cart = userCart._id
        return usersDao.createOne(userData)
    }

    async updateUser(userId, newData){
        return usersDao.updateOne(userId, newData)
    }

    async restorePassword(userId, newPassword){
        const user = await usersDao.getById(userId)
        if (await compareHashedData(newPassword, user.password)){
            return false
        }
        const hashedPassword = await hashData(newPassword)
        return usersDao.updateOne(userId, { password: hashedPassword })
    }

    async sendRestorePasswordMail(userId){
        const user = await usersDao.getById(userId)
        const restorePasswordToken = jwt.sign(
            {"userId": userId}, 
            config.appSecretKey, 
            {expiresIn: "1h"}
        )

        const mailContent = `
            <h2>User: ${user.email}</h2>
            <a href="http://localhost:8080/restorePassword/${restorePasswordToken}"><button>Restore password</button></a>
            <p>The link expires in 1 hour from when it was sent.</p>
        `
        sendMail(user.email, "eCommerce restore password", mailContent)
    }

    async togglePremiumRole(userId){
        const user = await usersDao.getById(userId, false)
        if (user.role === "user"){
            const requiredDocs = ["proof_account", "proof_adress", "identification"]
            const requiredDocsUploaded = requiredDocs.every(type => user.documents.some(doc => doc.type === type))
            if (requiredDocsUploaded){
                user.role = "premium"
                user.save()
                return true
            }
            return false
        }
        else if (user.role === "premium"){
            user.role = "user"
            user.save()
            return true
        }

    }

    async appendDocument(userId, document){
        const user = await usersDao.getById(userId, false)
        user.documents.push(document)
        user.save()
    }
}

const usersService = new UsersService()
export default usersService
