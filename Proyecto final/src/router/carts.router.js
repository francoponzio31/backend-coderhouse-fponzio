import { Router } from "express"
import { roleRequired, loginRequired } from "../middlewares/auth.middleware.js"
import controller from "../controllers/carts.controller.js"


const router = Router()

router.post("/", loginRequired, controller.createCart)

router.get("/:cid", loginRequired, controller.getCartById)

router.put("/:cid", loginRequired, controller.updateCart)

router.delete("/:cid", loginRequired, controller.emptyCartProducts)

router.post("/:cid/product/:pid", loginRequired, roleRequired("user"), controller.addProductToCartById)

router.delete("/:cid/product/:pid", loginRequired, controller.deleteProductFromCartById)

router.put("/:cid/product/:pid", loginRequired, controller.updateProductQuantityInCartById)

router.post("/:cid/purchase", loginRequired, controller.purchaseCartProducts)

export default router