import express from "express"
import productsRouter from "./router/products.router.js"
import cartsRouter from "./router/carts.router.js"
import viewsRouter from "./router/views.router.js"
import { engine } from 'express-handlebars';
import "./dao/db/config.js";
import {__dirname} from "./utils.js"


const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(__dirname + "/public"))

// handlebars
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', __dirname+'/views');

// routes:
app.use("/views", viewsRouter)
app.use("/api/products", productsRouter)
app.use("/api/carts", cartsRouter)

app.listen(8080, ()=>{
    console.log("Listen on port 8080");
})
