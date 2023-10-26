import { Router } from "express"
import { UsersManager } from "../dao/manager/users.manager.js"
import {hashData, compareHashedData} from "../utils.js"
import {loginRequired} from "../middlewares/auth.middleware.js"


const router = Router()

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await UsersManager.getUserByEmail(email)
        if (!user) {
          return res.status(401).json({ error: "Email or password do not match" })
        }
        if (!(await compareHashedData(password, user.password))){
            return res.status(401).json({ error: "Email or password do not match" })
        }

        req.session["email"] = user.email
        req.session["first_name"] = user.first_name
        if (email === "adminCoder@coder.com" && (await compareHashedData("Cod3r123", user.password))) {
          req.session["rol"] = "admin"
        }
        else{
            req.session["rol"] = "user"
        }

        res.redirect("/products")
    } catch (error) {
        console.log(error)
        res.status(500).json({message: error})
    }
})

router.post("/signup", async (req, res) => {
    try {
        const newUser = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            age: req.body.age,
            password: await hashData(req.body.password)
        }
        await UsersManager.createUser(newUser)
        res.status(200).json({ message: "User created" })
    } catch (error) {
        console.log(error)
        res.status(500).json({message: error})
    }
})

router.get("/logout", loginRequired, async (req, res) => {
    try {
        req.session.destroy((error) => {
            if (error) {
              console.error(error)
            } else {
              res.redirect("/login")
            }
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({message: error})
    }
})


export default router

