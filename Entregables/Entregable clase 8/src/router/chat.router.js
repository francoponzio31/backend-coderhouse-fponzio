import {Router} from "express"
import { ChatManager } from "../dao/manager/chat.manager.js"


const router = Router()

router.post("/", async (req, res)=>{
    try {
        const message = await ChatManager.createMessage(req.body)
        res.status(200).json({message: message, message: "message created"})
    } catch (error) {
        res.status(500).json({message: error})
    }
})

router.get("/", async (req, res)=>{
    try {
        const messages = await ChatManager.getMessages()
        res.status(200).json({messages: messages})
    } catch (error) {
        res.status(500).json({message: error})
    }
})

export default router