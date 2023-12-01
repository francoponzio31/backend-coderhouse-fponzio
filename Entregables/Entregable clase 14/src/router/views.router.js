import { Router } from "express"
import { loginRequired } from "../middlewares/auth.middleware.js"
import controller from "../controllers/views.controller.js"


const router = Router()

router.get("/", loginRequired, controller.getProducts)

router.get("/login", controller.login)

router.get("/signup", controller.signup)

router.get("/profile", loginRequired, controller.getProfile)

router.get("/products", loginRequired, controller.getProducts)

router.get("/carts/:cid", loginRequired, controller.getCartById)

export default router