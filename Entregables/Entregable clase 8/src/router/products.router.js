import { Router } from "express"
import { ProductsManager } from "../dao/manager/products.manager.js"
import { Types } from "mongoose"


const router = Router()

router.get("/", async (req, res)=>{
    try {
        const limit = req.query.limit  // query params

        const products = await ProductsManager.getProducts()
        let filteredProducts = [...products]
        if (!products.length){
            res.status(200).json({products: products, message: "no products found"})
        }
        else {
            if (!isNaN(limit)){
                filteredProducts = filteredProducts.slice(0, limit)
            }
            res.status(200).json({products: filteredProducts, message: "products found"})
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({message: error})
    }
})

router.get("/:pid", async (req, res)=>{
    try {
        const productId = req.params.pid  //? url params
        const product = await ProductsManager.getProductById(productId)
        if (!product){
            res.status(404).json({message: "no product found"})
        }
        else {
            res.status(200).json({product: product, message: "product found"})
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({message: error})
    }

})

router.post("/", async (req, res)=>{
    try {
        // Validación para campos requeridos:
        const requiredFields = ["title", "description", "code", "price", "stock", "category"]
        for (const field of requiredFields) {
            if (!req.body[field]) {
                return res.status(400).json({ message: `field ${field} is required` })
            }
        }

        const productData = {
            title: req.body.title,                    // String
            description: req.body.description,        // String
            code: req.body.code,                      // String
            price: req.body.price,                    // Number
            status: true,                             // Boolean, true por defecto
            stock: req.body.stock,                    // Number
            category: req.body.category,              // String
            thumbnails: req.body.thumbnails || [],    // Array de Strings
        }

        const newProduct = await ProductsManager.createProduct(productData)  //? request body
        res.status(200).json({product: newProduct, message: "product created"})
    } catch (error) {
        console.log(error);
        res.status(500).json({message: error})
    }
})
   
router.put("/:pid", async (req, res)=>{    
    try {
        const productId = req.params.pid  //? url params
        const success = await ProductsManager.updateProduct(new Types.ObjectId(productId), req.body)
        if (!success){
            res.status(404).json({message: "update error"})
        }
        else {
            res.status(200).json({message: "product updated", product:response})
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({message: error})
    }
})

router.delete("/:pid", async (req, res)=>{
    try {
        const productId = req.params.pid  //? url params
        const success = await ProductsManager.deleteProduct(new Types.ObjectId(productId))
        if (!success){
            res.status(404).json({message: "delete error"})
        }
        else {
            res.status(200).json({message: "product deleted"})
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({message: error})
    }
})

export default router