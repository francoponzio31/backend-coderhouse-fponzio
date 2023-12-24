import cartsService from "../services/carts.service.js"
import { errorMessages, successMessages, statusMessages } from "../utils/responses.js"
import customError from "../utils/customError.js"


class CartsController{
    async createCart(req, res){
        try {
            const cart = await cartsService.createCart()
            return res.status(200).json({cart: cart, message:successMessages.CREATED, status:statusMessages.SUCCESS})
        } catch (error) {
            customError.throw(errorMessages.NOT_CREATED, 500)
        }        
    }

    async getCartById(req, res){
        try {
            const cartId = req.params.cid
            const cart = await cartsService.getCartById(cartId)
            if (!cart){
                customError.throw(errorMessages.NOT_FOUNDED, 404)
            }
            return res.status(200).json({products: cart.products, message:successMessages.FOUNDED, status:statusMessages.SUCCESS})
        } catch (error) {
            customError.throw(errorMessages.SERVER_ERROR, 500)
        }      
    }

    async updateCart(req, res){
        try {
            const cartId = req.params.cid
            const newProducts = {products: req.body.products}
            const success = await cartsService.updateCart(cartId, newProducts)
            if (!success){
                customError.throw(errorMessages.NOT_UPDATED, 400)
            }
            return res.status(200).json({message:successMessages.UPDATED, status:statusMessages.SUCCESS})
        } catch (error) {
            console.log(error)
            customError.throw(errorMessages.SERVER_ERROR, 500)
        } 
    }
    
    async emptyCartProducts(req, res){
        try {
            const cartId = req.params.cid
            const success = await cartsService.emptyCartProducts(cartId)
            if (!success){
                customError.throw(errorMessages.NOT_UPDATED, 400)
            }
            return res.status(200).json({message:successMessages.UPDATED, status:statusMessages.SUCCESS})
        } catch (error) {
            customError.throw(errorMessages.SERVER_ERROR, 500)
        }
    }

    async addProductToCartById(req, res){
        try {
            const cartId = req.params.cid
            const productId = req.params.pid

            const success = await cartsService.addProductToCartById(cartId, productId)
            if (!success){
                customError.throw(errorMessages.NOT_UPDATED, 400)
            }
    
            return res.status(200).json({message:successMessages.UPDATED, status:statusMessages.SUCCESS})
        } catch (error) {
            console.log(error)
            customError.throw(errorMessages.SERVER_ERROR, 500)
        }
    }

    async deleteProductFromCartById(req, res){
        try {
            const cartId = req.params.cid
            const productId = req.params.pid

            const success = await cartsService.deleteProductFromCartById(cartId, productId)
            if (!success){
                customError.throw(errorMessages.NOT_UPDATED, 400)
            }
            else {
                return res.status(200).json({message:successMessages.UPDATED, status:statusMessages.SUCCESS})
            }
        } catch (error) {
            customError.throw(errorMessages.SERVER_ERROR, 500)
        }
    }

    async updateProductQuantityInCartById(req, res){
        try {
            const cartId = req.params.cid
            const productId = req.params.pid
            const quantity = req.body.quantity
            if (!(typeof quantity === 'number' && quantity > 0)){
                customError.throw("Quantity must be greater than 0", 400)
            }
    
            const success = await cartsService.updateProductQuantityInCartById(cartId, productId, quantity)
            if (!success){
                customError.throw(errorMessages.NOT_UPDATED, 400)
            }
            else {
                return res.status(200).json({message:successMessages.UPDATED, status:statusMessages.SUCCESS})
            }
        } catch (error) {
            customError.throw(errorMessages.SERVER_ERROR, 500)
        }
    }

    async purchaseCartProducts(req, res){
        try {
            const cartId = req.params.cid
            const success = await cartsService.purchaseCartProducts(cartId, req.user)
            if (!success){
                customError.throw(errorMessages.NOT_PURCHASED, 400)
            }
            else {
                return res.status(200).json({message:successMessages.PURCHASED, status:statusMessages.SUCCESS})
            }
        } catch (error) {
            customError.throw(errorMessages.SERVER_ERROR, 500)
        }
    }

}

const cartsController = new CartsController()
export default cartsController
