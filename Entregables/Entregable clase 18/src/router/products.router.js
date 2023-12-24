import { Router } from "express"
import { roleRequired, loginRequired } from "../middlewares/auth.middleware.js"
import { validateBodyParams } from "../middlewares/validation.middleware.js"
import controller from "../controllers/products.controller.js"


const router = Router()

router.get("/", loginRequired, controller.getProducts)

router.get("/mocking-products", loginRequired, controller.getMockingProducts)

router.get("/:pid", loginRequired, controller.getProductById)

router.post(
    "/",
    loginRequired,
    roleRequired("admin"),
    validateBodyParams([{"title":"string"}, {"description":"string"}, {"code":"string"}, {"price":"number"}, {"stock":"number"}, {"category":"string"}]),
    controller.createProduct
)

router.put("/:pid", loginRequired, roleRequired("admin"), controller.updateProduct)

router.delete("/:pid", loginRequired, roleRequired("admin"), controller.deleteProduct)

export default router