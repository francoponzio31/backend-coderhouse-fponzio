import cartsDao from "../dao/carts.mongo.js"
import productsDao from "../dao/products.mongo.js"


class CartsService{
    async createCart(){
        return cartsDao.createOne({})
    }

    async getCartById(cartId){
        return cartsDao.getById(cartId)
    }

    async updateCart(cartId, newProducts){
        return cartsDao.updateOne(cartId, newProducts)
    }

    async emptyCartProducts(cartId){
        return cartsDao.updateOne(cartId, {products:[]})
    }

    async addProductToCartById(cartId, productId){
        let success = false

        const product = await productsDao.getById(productId)
        if (!product){  // Se valida que el producto exista

            return success
        }

        success = await cartsDao.addProduct(cartId, productId)
        return success
    }

    async deleteProductFromCartById(cartId, productId){
        return cartsDao.deleteProduct(cartId, productId)
    }

    async updateProductQuantityInCartById(cartId, productId, quantity){
        return cartsDao.updateProductQuantity(cartId, productId)
    }
}

const cartsService = new CartsService()
export default cartsService
