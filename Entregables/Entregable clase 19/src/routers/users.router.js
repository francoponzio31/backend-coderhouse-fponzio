import { Router } from "express"
import { loginRequired } from "../middlewares/auth.middleware.js"
import controller from "../controllers/users.controller.js"


const router = Router()

router.post("/password/restore/:uid", loginRequired, controller.restorePassword)

router.get("/password/restore/mail/:uid", loginRequired, controller.getRestorePasswordMail)

router.get("/premium/:uid", loginRequired, controller.togglePremiumRole)

export default router