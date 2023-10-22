import {cartsModel} from "../db/models/carts.model.js"


class CartManager{

    async getCarts(){
        try {         
            return cartsModel.find().lean();
        } catch (error) {
            console.error(error)
            return error
        }
    }

    async createCart(){
        try {
            return cartsModel.create()
        } catch (error) {
            console.error(error)
            return error
        }
    }
    
    async getCartById(cartId){
        try {
            return cartsModel.findById(cartId)
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
            const success = await this.updateCart(cartId, {products:[]})
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

            const productIndex = cart.products.findIndex(product => product.id === productId)
            if (productIndex===-1){
                cart.products.push({
                    id: productId,
                    quantity: 1
                })
            }
            else {
                cart.products[productIndex].quantity++
            }

            updateSuccess = await this.updateCart(cartId, {products:cart.products})
            return updateSuccess
        } catch (error) {
            console.error(error)
            return error
        }
    }

    async updateProductQuantityInCartById(cartId, productId, quantity){
        try {
            let updateSuccess = false

            const cart = await this.getCartById(cartId)
            if (!cart){
                return updateSuccess
            }

            const productIndex = cart.products.findIndex(product => product.id === productId)
            if (productIndex===-1){
                return updateSuccess
            }
            else {
                cart.products[productIndex].quantity = quantity
            }

            updateSuccess = await this.updateCart(cartId, {products:cart.products})
            return updateSuccess
        } catch (error) {
            console.error(error)
            return error
        }
    }

    async deleteProductFromCartById(cartId, productId){
        try {
            let updateSuccess = false

            const cart = await this.getCartById(cartId)
            if (!cart){
                return updateSuccess
            }

            const productIndex = cart.products.findIndex(product => product.id === productId)
            if (productIndex!==-1){
                cart.products.splice(productIndex, 1)
            }
            else {
                return updateSuccess
            }

            updateSuccess = await this.updateCart(cartId, {products:cart.products})
            return updateSuccess
        } catch (error) {
            console.error(error)
            return error
        }
    }
}

export const CartsManager = new CartManager()
