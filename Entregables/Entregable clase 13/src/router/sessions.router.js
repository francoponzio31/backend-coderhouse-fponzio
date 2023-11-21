import { Router } from "express"
import passport from "passport"
import {loginRequired} from "../middlewares/auth.middleware.js"


const router = Router()

router.get("/current", loginRequired, async (req, res)=>{
    try {
        res.status(200).json({user: req.user})
    } catch (error) {
        console.log(error);
        res.status(500).json({message: error})
    }
})

router.post("/login", passport.authenticate("login", {failWithError: true}),
    function(req, res, next) {
        // Handle success
        res.redirect("/products")
    },
    function(error, req, res, next) {
        // Handle error
        res.status(500).json({message: error})
    }
)

router.post("/signup", passport.authenticate("signup", {failWithError: true}),
    function(req, res, next) {
        // Handle success
        res.redirect("/products")
    },
    function(error, req, res, next) {
        // Handle error
        res.status(500).json({message: error})
    }
)

router.get("/logout", loginRequired, async (req, res) =>{
    try {
        req.logout((error) => {
            if (error) {
                console.error(error)
            }
            req.session.destroy((error) => {
                if (error) {
                    console.error(error)
                } else {
                    res.redirect("/login")
                }
            })
        })
    } catch (error) {
        console.error(error)
    }
})

router.get("/github", passport.authenticate("github"))

router.get("/github/callback", passport.authenticate("github", { failureRedirect: "/login", successRedirect: "/products" }))

export default router