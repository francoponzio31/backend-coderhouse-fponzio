import { Router } from "express"
import passport from "passport"
import { loginRequired } from "../middlewares/auth.middleware.js"
import controller from "../controllers/sessions.controller.js"


const router = Router()

router.get("/current", loginRequired, controller.getCurrentUser)

router.post("/login", passport.authenticate("login", { failureRedirect: "/login", successRedirect: "/products" }))

router.post("/signup", passport.authenticate("signup", { failureRedirect: "/login", successRedirect: "/products" }))

router.get("/logout", loginRequired, controller.logout)

router.get("/github", passport.authenticate("github"))

router.get("/github/callback", passport.authenticate("github", { failureRedirect: "/login", successRedirect: "/products" }))

export default router