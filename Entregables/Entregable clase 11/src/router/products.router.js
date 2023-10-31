import { Router } from "express"
import { ProductsManager } from "../dao/manager/products.manager.js"
import {loginRequired} from "../middlewares/auth.middleware.js"


const router = Router()

router.get("/", loginRequired, async (req, res)=>{
    try {

        const params = req.query
        const page  = parseInt(params.page) || 1
        const limit = parseInt(params.limit) || 10
        const sort  = params.sort === "asc" ? {"price":1} : params.sort === "desc" ? {"price":-1} : {}
        const query  = {}
        if (params.category) query.category = params.category;
        if (params.stock) query.stock = params.stock;

        const url = `${req.protocol}://${req.get('host')}${req.baseUrl}`

        const response = await ProductsManager.getProducts(page, limit, sort, query)

        res.status(200).json({
            status:"success",
            totalPages: response.pages,
            totalProducts: response.count,
            resultsAmount: response.results.length,
            hasPrevPage: response.hasPrevPage,
            hasNextPage: response.hasNextPage,
            prevPage: response.hasPrevPage ? page-1 : null,
            nextPage: response.hasNextPage ? page+1 : null,
            page: page,
            prevLink: response.hasPrevPage ? 
                `${url}?page=${page-1}` + `${limit ? `&limit=${limit}`:""}` + `${params.sort ? `&sort=${params.sort}`:""}` + `${params.category ? `&category=${params.category}`:""}` + `${params.stock ? `&stock=${params.stock}`:""}`
                : null,
            nextLink: response.hasNextPage ? 
                `${url}?page=${page+1}` + `${limit ? `&limit=${limit}`:""}` + `${params.sort ? `&sort=${params.sort}`:""}` + `${params.category ? `&category=${params.category}`:""}` + `${params.stock ? `&stock=${params.stock}`:""}`
                : null,
            payload: response.results,
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({status: "error"})
    }
})

router.get("/:pid", loginRequired, async (req, res)=>{
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

router.post("/", loginRequired, async (req, res)=>{
    try {
        // Validación para campos requeridos:
        const requiredFields = ["title", "description", "code", "price", "stock", "category"]
        for (const field of requiredFields) {
            if (!req.body[field]) {
                res.status(400).json({ message: `field ${field} is required` })
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
   
router.put("/:pid", loginRequired, async (req, res)=>{    
    try {
        const productId = req.params.pid  //? url params
        const success = await ProductsManager.updateProduct(productId, req.body)
        if (!success){
            res.status(400).json({message: "update error"})
        }
        else {
            res.status(200).json({message: "product updated", product:response})
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({message: error})
    }
})

router.delete("/:pid", loginRequired, async (req, res)=>{
    try {
        const productId = req.params.pid  //? url params
        const success = await ProductsManager.deleteProduct(productId)
        if (!success){
            res.status(400).json({message: "delete error"})
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