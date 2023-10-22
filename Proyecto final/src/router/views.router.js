import {Router} from "express"
import { ProductsManager } from "../dao/manager/products.manager.js"
import { CartsManager } from "../dao/manager/carts.manager.js"


const router = Router()

router.get("/products", async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1
        const response = await ProductsManager.getProducts(page)
        const products = response.results
        const pagesArray = Array.from({ length: response.pages }, (_, index) => index + 1)
        res.render("products", {products: products, pages:pagesArray})
    } catch (error) {
        res.status(500).json({message: error})
    }
})

router.get("/carts/:cid", async (req, res) => {
    try {
        const cartId = req.params.cid
        const cart = await CartsManager.getCartById(cartId)
        console.log(cart.products);
        res.render("cartProducts", {products: cart.products})
    } catch (error) {
        console.log(error)
        res.status(500).json({message: error})
    }
})

export default router