import express from "express"
import "./dao/db/config.js";
import viewsRouter from "./router/views.router.js"
import productsRouter from "./router/products.router.js"
import cartsRouter from "./router/carts.router.js"
import chatRouter from "./router/chat.router.js"
import { ProductsManager } from "./dao/manager/products.manager.js"
import { ChatManager } from "./dao/manager/chat.manager.js"
import { engine } from 'express-handlebars';
import { Server } from "socket.io"
import {__dirname} from "./utils.js"

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(__dirname + "/public"))


// handlebars
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', __dirname+'/views');

// routes
app.use("/views", viewsRouter)
app.use("/api/products", productsRouter)
app.use("/api/carts", cartsRouter)
app.use("/api/chat", chatRouter)


const port = 8080
const httpServer = app.listen(8080, ()=>{
    console.log(`Listen on port ${port}`);
})

// websocket server
const socketServer = new Server(httpServer);

socketServer.on("connection", (socket) => {
    
    // Realtime products events
    socket.on("deleteProductEvent", async () => {
        const products = await ProductsManager.getProducts()
        socketServer.emit("productsListChangeResponse", products)
    })    
    
    socket.on("createProductEvent", async () => {
        const products = await ProductsManager.getProducts()
        socketServer.emit("productsListChangeResponse", products)
    })
    
    // Chat events
    socket.on("newMessageEvent", async () => {
        const messages = await ChatManager.getMessages()
        socketServer.emit("newMessageEventResponse", messages)
    })
})