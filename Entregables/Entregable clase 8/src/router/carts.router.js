import {Router} from "express"
import { CartsManager } from "../dao/manager/carts.manager.js"


const router = Router()

router.post("/", async (req, res)=>{
    try {
        const cart = await CartsManager.createCart()
        res.status(200).json({cart: cart, message: "cart created"})
    } catch (error) {
        res.status(500).json({message: error})
    }
})

router.get("/:cid", async (req, res)=>{
    try {
        const cartId = req.params.cid  //? url params
        const cart = await CartsManager.getCartById(cartId)
        if (!cart){
            res.status(404).json({message: "cart not found"})
        }
        else {
            res.status(200).json({products: cart.products, message: "cart found"})
        }
    } catch (error) {
        res.status(500).json({message: error})
    }
})

router.post("/:cid/product/:pid", async (req, res)=>{
    try {
        const cartId = req.params.cid
        const productId = req.params.pid
        const success = await CartsManager.addProductToCartById(cartId, productId)
        if (!success){
            res.status(404).json({message: "update error"})
        }
        else {
            res.status(200).json({message: "cart updated"})
        }
    } catch (error) {
        res.status(500).json({message: error})
    }
})

export default router