import { usersModel } from "../db/models/users.model.js";


class UserManager{
    async createUser(userObj){
        try {
            return usersModel.create(userObj)
        } catch (error) {
            console.error(error)
            return error
        }
    }
    
    async getUserByEmail(userEmail){
        try {
            return usersModel.findOne({email:userEmail}).lean()
        } catch (error) {
            console.error(error)
            return error
        }
    }
}

export const UsersManager = new UserManager()