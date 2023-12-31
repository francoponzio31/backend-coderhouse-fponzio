import productsService from "../services/products.service.js"
import { generateProducts } from "../utils/faker.js"
import { errorMessages, successMessages, statusMessages } from "../utils/responses.js"
import customError from "../utils/customError.js"
import { logger } from "../utils/winston.js"


class ProductsController{
    async getProducts(req, res) {
        try {
            const params = req.query
            const page  = parseInt(params.page) || 1
            const limit = parseInt(params.limit) || 10
            const sort  = params.sort === "asc" ? {"price":1} : params.sort === "desc" ? {"price":-1} : {}
            const query  = {}
            if (params.category) query.category = params.category
            if (params.stock) query.stock = params.stock
    
            const baseUrl = `${req.protocol}://${req.get('host')}${req.baseUrl}`
            const response = await productsService.getProducts(baseUrl, page, limit, sort, query)
            return res.status(200).json({message:successMessages.FOUNDED, status:statusMessages.SUCCESS, ...response })
        } catch (error) {
            logger.error(error)
            customError.throw(errorMessages.SERVER_ERROR, 500)
        }
    }

    async getProductById(req, res){
        try {
            const productId = req.params.pid  //? url params
            const product = await productsService.getProductById(productId)
            if (!product){
                customError.throw(errorMessages.NOT_FOUNDED, 404)
            }
            else {
                return res.status(200).json({product: product, message:successMessages.FOUNDED, status:statusMessages.SUCCESS})
            }
        } catch (error) {
            logger.error(error)
            customError.throw(errorMessages.SERVER_ERROR, 500)
        }
    }

    async createProduct(req, res){
        try {           
            const newProduct = await productsService.createProduct({...req.body, status: true})  //? request body
            return res.status(200).json({product: newProduct, message:successMessages.CREATED, status:statusMessages.SUCCESS})
        } catch (error) {
            logger.error(error)
            customError.throw(errorMessages.SERVER_ERROR, 500)
        }
    }

    async updateProduct(req, res){
        try {
            const productId = req.params.pid  //? url params
            const success = await productsService.updateProduct(productId, req.body)
            if (!success){
                customError.throw(errorMessages.NOT_UPDATED, 400)
            }
            else {
                return res.status(200).json({product: response, message:successMessages.UPDATED, status:statusMessages.SUCCESS})
            }
        } catch (error) {
            logger.error(error)
            customError.throw(errorMessages.SERVER_ERROR, 500)
        }
    }

    async deleteProduct(req, res){
        try {
            const productId = req.params.pid  //? url params
            const success = await productsService.deleteProduct(productId)
            if (!success){
                customError.throw(errorMessages.NOT_DELETED, 400)
            }
            else {
                return res.status(200).json({message:successMessages.DELETED, status:statusMessages.SUCCESS})
            }
        } catch (error) {
            logger.error(error)
            customError.throw(errorMessages.SERVER_ERROR, 500)
        }
    }

    async getMockingProducts(req, res){
        try {
            const quantity = parseInt(req.query.qty) || 10
            const products = generateProducts(quantity)
            return res.status(200).json({products:products, status:statusMessages.SUCCESS})
        } catch (error) {
            logger.error(error)
            customError.throw(errorMessages.SERVER_ERROR, 500)
        }
    }
}

const productsController = new ProductsController()
export default productsController
