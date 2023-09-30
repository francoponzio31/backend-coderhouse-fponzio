import {Router} from "express"
import { ProductsManager } from "../manager/products.manager.js"


const router = Router()

router.get("/", async (req, res) => {
    const products = await ProductsManager.getProducts()
    res.render("home", {products: products})
})

router.get("/realtimeproducts", async (req, res) => {
    const products = await ProductsManager.getProducts()
    res.render("realtimeproducts", {products: products})
})

export default router