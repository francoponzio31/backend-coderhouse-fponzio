import {cartsModel} from "../db/models/carts.model.js"


class CartManager{

    async getCarts(){
        try {         
            const carts = await cartsModel.find().lean()
            return carts
        } catch (error) {
            console.error(error)
            return error
        }
    }

    async createCart(){
        try {
            const cart = await cartsModel.create({})
            return cart
        } catch (error) {
            console.error(error)
            return error
        }
    }
    
    async getCartById(cartId){
        try {
            const cart = await cartsModel.findById(cartId).populate({ path: "products.product" }).lean()
            return cart
        } catch (error) {
            console.error(error)
            return error
        }
    }

    async updateCart(cartId, newData){
        try {
            const result = await cartsModel.updateOne({ _id: cartId }, newData)
            const success = result.matchedCount > 0
            return success
        } catch (error) {
            console.error(error)
            return error
        }
    }
    
    async emptyCartProducts(cartId){
        try {
            const success = this.updateCart(cartId, {products:[]})
            return success
        } catch (error) {
            console.error(error)
            return error
        }
    }

    async addProductToCartById(cartId, productId){
        try {
            let updateSuccess = false

            const cart = await this.getCartById(cartId)
            if (!cart){
                return updateSuccess
            }
            console.log(cart);
            const productIndex = cart.products.findIndex(product => product.product._id.toString() === productId)
            if (productIndex===-1){
                cart.products.push({
                    product: productId,
                    quantity: 1
                })
            }
            else {
                cart.products[productIndex].quantity++
            }

            updateSuccess = this.updateCart(cartId, {products:cart.products})
            return updateSuccess
        } catch (error) {
            console.error(error)
            return error
        }
    }

    async updateProductQuantityInCartById(cartId, productId, quantity){
        try {
            let updateSuccess = false

            const cart = this.getCartById(cartId)
            if (!cart){
                return updateSuccess
            }

            const productIndex = cart.products.findIndex(product => product.product._id.toString() === productId)
            if (productIndex===-1){
                return updateSuccess
            }
            else {
                cart.products[productIndex].quantity = quantity
            }

            updateSuccess = this.updateCart(cartId, {products:cart.products})
            return updateSuccess
        } catch (error) {
            console.error(error)
            return error
        }
    }

    async deleteProductFromCartById(cartId, productId){
        try {
            let updateSuccess = false

            const cart = this.getCartById(cartId)
            if (!cart){
                return updateSuccess
            }

            const productIndex = cart.products.findIndex(product => product.product._id.toString() === productId)
            if (productIndex!==-1){
                cart.products.splice(productIndex, 1)
            }
            else {
                return updateSuccess
            }

            updateSuccess = this.updateCart(cartId, {products:cart.products})
            return updateSuccess
        } catch (error) {
            console.error(error)
            return error
        }
    }
}

export const CartsManager = new CartManager()
