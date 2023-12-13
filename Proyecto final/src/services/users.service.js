import usersDao from "../dao/users.mongo.js"
import cartsService from "../services/carts.service.js"


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
}

const usersService = new UsersService()
export default usersService
