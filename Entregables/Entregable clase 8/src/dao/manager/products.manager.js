import {productsModel} from "../db/models/products.model.js"


class ProductManager{

    async getProducts(){
        try {         
            return productsModel.find().lean()
        } catch (error) {
            console.error(error)
            return error
        }
    }

    async createProduct(productObj){
        try {
            return productsModel.create(productObj)
        } catch (error) {
            console.error(error)
            return error
        }
    }

    async getProductById(productId){
        try {
            return productsModel.findById(productId)
        } catch (error) {
            console.error(error)
            return error
        }
    }
    
    async deleteProduct(productId){
        try {
            const result = await productsModel.deleteOne({ _id: productId })
            const success = result.deletedCount > 0
            return success
        } catch (error) {
            console.error(error)
            return error
        }
    }

    async updateProduct(productId, newData){
        try {
            const result = await productsModel.updateOne({ _id: productId }, newData)
            const success = result.matchedCount > 0
            return success
        } catch (error) {
            console.error(error)
            return error
        }
    }
}

export const ProductsManager = new ProductManager()
