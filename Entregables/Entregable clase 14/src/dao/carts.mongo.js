import { BasicMongo } from "./basic.mongo.js"
import { cartsModel } from "../models/carts.model.js"


class CartsMongo extends BasicMongo {
    constructor() {
        super(cartsModel)
    }

    async getById(cartId, lean=true){
        return lean ? this.model.findById(cartId).populate({ path: "products.product" }).lean() : this.model.findById(cartId).populate({ path: "products.product" })
    }

    async emptyProducts(cartId){
        return this.updateOne(cartId, {products:[]})
    }

    async addProduct(cartId, productId){
        let updateSuccess = false

        const cart = await this.getById(cartId, false)
        if (!cart){
            return updateSuccess
        }
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

        await cart.save()
        updateSuccess = true
        return updateSuccess
    }

    async updateProductQuantity(cartId, productId, quantity){
        let updateSuccess = false

        const cart = this.getById(cartId, false)
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

        await cart.save()
        updateSuccess = true
        return updateSuccess
    }

    async deleteProduct(cartId, productId){
        let updateSuccess = false

        const cart = this.getById(cartId, false)
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

        await cart.save()
        updateSuccess = true
        return updateSuccess
    }
}

const cartsMongo = new CartsMongo()
export default cartsMongo