import {Router} from "express"
import { ProductsManager } from "../dao/manager/products.manager.js"


const router = Router()

router.get("/products", async (req, res) => {
    const response = await ProductsManager.getProducts()
    const products = response.results
    console.log(typeof(products));
    res.render("products", {products: products})
})

export default router