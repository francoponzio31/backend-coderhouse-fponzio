import { Router } from "express"
import { loginRequired } from "../middlewares/auth.middleware.js"
import controller from "../controllers/products.controller.js"


const router = Router()

router.get("/", loginRequired, controller.getProducts)

router.get("/:pid", loginRequired, controller.getProductById)

router.post("/", loginRequired, controller.createProduct)
   
router.put("/:pid", loginRequired, controller.updateProduct)

router.delete("/:pid", loginRequired, controller.deleteProduct)

export default router