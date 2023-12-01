import cartsService from "../services/carts.service.js"


class CartsController{
    async createCart(req, res){
        try {
            const cart = await cartsService.createCart()
            res.status(200).json({cart: cart, message: "cart created"})
        } catch (error) {
            res.status(500).json({message: error})
        }        
    }

    async getCartById(req, res){
        try {
            const cartId = req.params.cid
            const cart = await cartsService.getCartById(cartId)
            if (!cart){
                res.status(404).json({message: "cart not found"})
            }
            res.status(200).json({products: cart.products, message: "cart found"})
        } catch (error) {
            res.status(500).json({message: error})
        }      
    }

    async updateCart(req, res){
        try {
            const cartId = req.params.cid
            const newProducts = {products: req.body.products}
            const success = await cartsService.updateCart(cartId, newProducts)
            if (!success){
                res.status(400).json({message: "update error"})
            }
            res.status(200).json({message: "cart updated"})
        } catch (error) {
            console.log(error)
            res.status(500).json({message: error})
        } 
    }
    
    async emptyCartProducts(req, res){
        try {
            const cartId = req.params.cid
            const success = await cartsService.emptyCartProducts(cartId)
            if (!success){
                res.status(400).json({message: "update error"})
            }
            res.status(200).json({message: "cart updated"})
        } catch (error) {
            res.status(500).json({message: error})
        }
    }

    async addProductToCartById(req, res){
        try {
            const cartId = req.params.cid
            const productId = req.params.pid

            const success = await cartsService.addProductToCartById(cartId, productId)
            if (!success){
                res.status(400).json({message: "update error"})
            }
    
            res.status(200).json({message: "cart updated"})
        } catch (error) {
            console.log(error)
            res.status(500).json({message: error})
        }
    }

    async deleteProductFromCartById(req, res){
        try {
            const cartId = req.params.cid
            const productId = req.params.pid
            const success = await cartsService.deleteProductFromCartById(cartId, productId)
            if (!success){
                res.status(400).json({message: "update error"})
            }
            else {
                res.status(200).json({message: "cart updated"})
            }
        } catch (error) {
            res.status(500).json({message: error})
        }
    }

    async updateProductQuantityInCartById(req, res){
        try {
            const cartId = req.params.cid
            const productId = req.params.pid
            const quantity = req.body.quantity
            if (!(typeof quantity === 'number' && quantity > 0)){
                res.status(400).json({message: "quantity must be greater than 0"})
            }
    
            const success = await cartsService.updateProductQuantityInCartById(cartId, productId, quantity)
            if (!success){
                res.status(400).json({message: "update error"})
            }
            else {
                res.status(200).json({message: "cart updated"})
            }
        } catch (error) {
            res.status(500).json({message: error})
        }
    }

}

const cartsController = new CartsController()
export default cartsController
