import express from "express"
import session from "express-session"
import { engine } from 'express-handlebars';
import mongoStore from "connect-mongo"
import config from "./config/config.js"
import { __dirname } from "./utils/utils.js"
import { connectToDb } from "./config/dbConfig.js"
import productsRouter from "./router/products.router.js"
import cartsRouter from "./router/carts.router.js"
import sessionRouter from "./router/sessions.router.js"
import viewsRouter from "./router/views.router.js"
import passport from "passport"
import "./utils/passport.js"
import { errorMidleware } from "./middlewares/error.middleware.js"


const app = express()
connectToDb()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(__dirname + "/public"))
app.use(errorMidleware)

// session mongo
app.use(
    session({
      saveUninitialized: false,
      resave: false,
      secret: config.appSecretKey,
      cookie: {
        maxAge: 60 * 60 * 1000,
      },
      store: new mongoStore({
        mongoUrl: config.mongoURI,
      }),
    })
)

// passports
app.use(passport.initialize())
app.use(passport.session())

// handlebars
app.engine("handlebars", engine())
app.set("view engine", "handlebars")
app.set("views", __dirname+"/views")

// routes:
app.use("/", viewsRouter)
app.use("/api/products", productsRouter)
app.use("/api/carts", cartsRouter)
app.use("/api/sessions", sessionRouter)

const PORT  = config.port

app.listen(
    PORT, () => {
        console.log(`App listening on port ${PORT}`)
    }
)