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
            const newCart = {
                products: [],
            }
            return cartsModel.create(newCart)
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
    
    async addProductToCartById(cartId, productId){
        try {
            const cart = await this.getCartById(cartId)
            if (!cart){
                return null
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

            const updateSuccess = await this.updateCart(cartId, {products:cart.products})
            return updateSuccess
        } catch (error) {
            console.error(error)
            return error
        }
    }
}

export const CartsManager = new CartManager()
