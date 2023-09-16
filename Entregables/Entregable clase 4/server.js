import express from "express"
import { ProductsManager } from "./ProductManager.js"

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))



app.get("/products", async (req, res)=>{
    try {
        const limit = parseInt(req.query.limit)  // query params

        const products = await ProductsManager.getProducts()
        let filteredProducts = [...products]

        if (!products.length){
            res.status(200).json({products: filteredProducts, message: "no products found"})
        }
        else {
            if (!isNaN(limit)){
                console.log(limit)
                filteredProducts = filteredProducts.slice(0, limit)
            }
            res.status(200).json({products: filteredProducts, message: "products found"})
        }
    } catch (error) {
        res.status(500).json({message: error})
    }
})

app.get("/products/:id", async (req, res)=>{
    const productId = parseInt(req.params.id)  //? url params
    try {
        const product = await ProductsManager.getProductById(productId)
        if (!product){
            res.status(404).json({product: product, message: "no product found"})
        }
        else {
            res.status(200).json({product: product, message: "product found"})
        }
    } catch (error) {
        res.status(500).json({message: error})
    }

})

app.listen(8080, ()=>{
    console.log("Listen on port 8080");
})