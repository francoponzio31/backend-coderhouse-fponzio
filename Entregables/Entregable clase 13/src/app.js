import express from "express"
import productsRouter from "./router/products.router.js"
import cartsRouter from "./router/carts.router.js"
import sessionRouter from "./router/sessions.router.js"
import viewsRouter from "./router/views.router.js"
import { engine } from 'express-handlebars';
import {URI, connectToDb} from "./dao/db/config.js";
import {__dirname} from "./utils.js"
import mongoStore from "connect-mongo";
import session from "express-session";
import passport from "passport"
import "./passport.js"


const app = express()
connectToDb()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(__dirname + "/public"))

// session mongo
app.use(
  session({
    saveUninitialized: false,
    resave: false,
    secret: "SESSIONSECRETKEY",
    cookie: {
      maxAge: 60 * 60 * 1000,
    },
    store: new mongoStore({
      mongoUrl: URI,
    }),
  })
);

// passports
app.use(passport.initialize())
app.use(passport.session())

// handlebars
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', __dirname+'/views');

// routes:
app.use("/", viewsRouter)
app.use("/api/products", productsRouter)
app.use("/api/carts", cartsRouter)
app.use("/api/sessions", sessionRouter)

app.listen(8080, ()=>{
    console.log("Listen on port 8080");
})
