import {Router} from "express"
import { CartsManager } from "../dao/manager/carts.manager.js"
import { ProductsManager } from "../dao/manager/products.manager.js"


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
        const cartId = req.params.cid
        const cart = await CartsManager.getCartById(cartId)
        if (!cart){
            res.status(404).json({message: "cart not found"})
        }
        res.status(200).json({products: cart.products, message: "cart found"})
    } catch (error) {
        res.status(500).json({message: error})
    }
})

router.put("/:cid", async (req, res)=>{
    try {

        const cartId = req.params.cid
        const newProducts = req.body.products
        const success = await CartsManager.updateCart(cartId, newProducts)
        if (!success){
            res.status(404).json({message: "update error"})
        }
        res.status(200).json({message: "cart updated"})
    } catch (error) {
        res.status(500).json({message: error})
    }
})

router.delete("/:cid", async (req, res)=>{
    try {
        const cartId = req.params.cid
        const success = await CartsManager.emptyCartProducts(cartId)
        if (!success){
            res.status(404).json({message: "update error"})
        }
        res.status(200).json({message: "cart updated"})
    } catch (error) {
        res.status(500).json({message: error})
    }
})

router.post("/:cid/product/:pid", async (req, res)=>{
    try {
        const cartId = req.params.cid
        const productId = req.params.pid

        const product = await ProductsManager.getProductById(productId)
        if (!product){  // Se valida que el producto exista
            res.status(404).json({message: "update error"})
        }

        const success = await CartsManager.addProductToCartById(cartId, productId)
        if (!success){
            res.status(404).json({message: "update error"})
        }

        res.status(200).json({message: "cart updated"})
    } catch (error) {
        res.status(500).json({message: error})
    }
})

router.delete("/:cid/product/:pid", async (req, res)=>{
    try {

        const cartId = req.params.cid
        const productId = req.params.pid
        const success = await CartsManager.deleteProductFromCartById(cartId, productId)
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

router.put("/:cid/product/:pid", async (req, res)=>{
    try {

        const cartId = req.params.cid
        const productId = req.params.pid
        const quantity = req.body.quantity
        if (!(typeof quantity === 'number' && quantity > 0)){
            res.status(404).json({message: "quantity must be greater than 0"})
        }

        const success = await CartsManager.updateProductQuantityInCartById(cartId, productId, quantity)
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