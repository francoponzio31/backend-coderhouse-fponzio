import {Router} from "express"
import { ProductsManager } from "../dao/manager/products.manager.js"
import { CartsManager } from "../dao/manager/carts.manager.js"
import { UsersManager } from "../dao/manager/users.manager.js"
import {loginRequired} from "../middlewares/auth.middleware.js"


const router = Router()

router.get("/login", async (req, res) => {
    try {
        res.render("login")
    } catch (error) {
        res.status(500).json({message: error})
    }
})

router.get("/signup", async (req, res) => {
    try {
        res.render("signup")
    } catch (error) {
        res.status(500).json({message: error})
    }
})

router.get("/profile", loginRequired, async (req, res) => {
    try {
        const user = await UsersManager.getUserByEmail(req.session.email)
        res.render("userProfile", {user})
    } catch (error) {
        res.status(500).json({message: error})
    }
})

router.get("/products", loginRequired, async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1
        const response = await ProductsManager.getProducts(page)
        const products = response.results
        const pagesArray = Array.from({ length: response.pages }, (_, index) => index + 1)
        const userData = req.session
        res.render("products", {products: products, pages:pagesArray, userData})
    } catch (error) {
        res.status(500).json({message: error})
    }
})

router.get("/carts/:cid", loginRequired, async (req, res) => {
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