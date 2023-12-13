import { Router } from "express"
import { loginRequired, roleRequired } from "../middlewares/auth.middleware.js"
import controller from "../controllers/views.controller.js"


const router = Router()

router.get("/", loginRequired, controller.getProducts)

router.get("/login", controller.login)

router.get("/signup", controller.signup)

router.get("/profile", loginRequired, controller.getProfile)

router.get("/products", loginRequired, roleRequired("user"), controller.getProducts)

router.get("/carts/:cid", loginRequired, roleRequired("user"), controller.getCartById)

export default router