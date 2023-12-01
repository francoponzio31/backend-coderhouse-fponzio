import productsService from "../services/products.service.js"


class ProductsController{
    async getProducts(req, res) {
        try {
            const params = req.query
            const page  = parseInt(params.page) || 1
            const limit = parseInt(params.limit) || 10
            const sort  = params.sort === "asc" ? {"price":1} : params.sort === "desc" ? {"price":-1} : {}
            const query  = {}
            if (params.category) query.category = params.category;
            if (params.stock) query.stock = params.stock;
    
            const baseUrl = `${req.protocol}://${req.get('host')}${req.baseUrl}`
            const response = await productsService.getProducts(baseUrl, page, limit, sort, query)
            res.status(200).json({ status:"success", ...response })
        } catch (error) {
            console.log(error);
            res.status(500).json({status: "error"})
        }
    }

    async getProductById(req, res){
        try {
            const productId = req.params.pid  //? url params
            const product = await productsService.getProductById(productId)
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
    }

    async createProduct(req, res){
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
    
            const newProduct = await productsService.createProduct(productData)  //? request body
            res.status(200).json({product: newProduct, message: "product created"})
        } catch (error) {
            console.log(error);
            res.status(500).json({message: error})
        }
    }

    async updateProduct(req, res){
        try {
            const productId = req.params.pid  //? url params
            const success = await productsService.updateProduct(productId, req.body)
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
    }

    async deleteProduct(req, res){
        try {
            const productId = req.params.pid  //? url params
            const success = await productsService.deleteProduct(productId)
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
    }
}

const productsController = new ProductsController()
export default productsController
