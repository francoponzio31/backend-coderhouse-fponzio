import {messagesModel} from "../db/models/messages.model.js"


class MessageManager{

    async getMessages(){
        try {         
            return messagesModel.find().lean()
        } catch (error) {
            console.error(error)
            return error
        }
    }

    async createMessage(messageObj){
        try {
            return messagesModel.create(messageObj)
        } catch (error) {
            console.error(error)
            return error
        }
    }

    async getMessageById(messageId){
        try {
            return messagesModel.findById(messageId)
        } catch (error) {
            console.error(error)
            return error
        }
    }
    
    async deleteMessage(messageId){
        try {
            const result = await messagesModel.deleteOne({ _id: messageId })
            const success = result.deletedCount > 0
            return success
        } catch (error) {
            console.error(error)
            return error
        }
    }

    async updateMessage(messageId, newData){
        try {
            const result = await messagesModel.updateOne({ _id: messageId }, newData)
            const success = result.matchedCount > 0
            return success
        } catch (error) {
            console.error(error)
            return error
        }
    }
}

export const ChatManager = new MessageManager()
