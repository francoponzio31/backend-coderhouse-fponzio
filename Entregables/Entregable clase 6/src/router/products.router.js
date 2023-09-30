import {Router} from "express"
import { ProductsManager } from "../manager/products.manager.js"


const router = Router()

router.get("/", async (req, res)=>{
    try {
        const limit = parseInt(req.query.limit)  // query params

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
        res.status(500).json({message: error})
    }
})

router.get("/:pid", async (req, res)=>{
    try {
        const productId = parseInt(req.params.pid)  //? url params
        const product = await ProductsManager.getProductById(productId)
        if (!product){
            res.status(404).json({message: "no product found"})
        }
        else {
            res.status(200).json({product: product, message: "product found"})
        }
    } catch (error) {
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
        res.status(500).json({message: error})
    }
})
   
router.put("/:pid", async (req, res)=>{    
    try {
        const productId = parseInt(req.params.pid)  //? url params
        const response = await ProductsManager.updateProduct(productId, req.body)
        if (response===-1){
            res.status(404).json({message: "product not found"})
        }
        else {
            res.status(200).json({message: "product updated", product:response})
        }
    } catch (error) {
        res.status(500).json({message: error})
    }
})

router.delete("/:pid", async (req, res)=>{
    try {
        const productId = parseInt(req.params.pid)  //? url params
        const response = await ProductsManager.deleteProduct(productId)
        if (response===-1){
            res.status(404).json({message: "product not found"})
        }
        else {
            console.log(response);
            res.status(200).json({message: "product deleted"})
        }
    } catch (error) {
        res.status(500).json({message: error})
    }
})

export default router