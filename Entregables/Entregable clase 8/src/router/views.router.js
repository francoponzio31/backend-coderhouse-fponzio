import {Router} from "express"
import { ProductsManager } from "../dao/manager/products.manager.js"
import { ChatManager } from "../dao/manager/chat.manager.js"


const router = Router()

router.get("/", async (req, res) => {
    const products = await ProductsManager.getProducts()
    res.render("home", {products: products})
})

router.get("/realtimeproducts", async (req, res) => {
    const products = await ProductsManager.getProducts()
    res.render("realtimeproducts", {products: products})
})

router.get("/chat", async (req, res) => {
    const messages = await ChatManager.getMessages()
    res.render("chat", {messages: messages})
})

export default router