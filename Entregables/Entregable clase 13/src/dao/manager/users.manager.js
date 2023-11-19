import { usersModel } from "../db/models/users.model.js";


class UserManager{
    async createUser(userObj){
        try {
            const result = await usersModel.create(userObj)
            return result
        } catch (error) {
            console.error(error)
            return error
        }
    }
    
    async getUserById(userId){
        try {
            const user = await usersModel.findById(userId).lean()
            return user
        } catch (error) {
            console.error(error)
            return error
        }
    }

    async getUserByEmail(userEmail){
        try {
            const user = usersModel.findOne({email:userEmail}).lean()
            return user
        } catch (error) {
            console.error(error)
            return error
        }
    }
}

export const UsersManager = new UserManager()