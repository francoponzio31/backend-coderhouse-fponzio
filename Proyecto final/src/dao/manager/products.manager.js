import {productsModel} from "../db/models/products.model.js"


class ProductManager{

    async getProducts(page=1, limit=10, sort={}, query={}, ){
        try {       
            const options = { page, limit, sort }
            const result = await productsModel.paginate(query, options)
            return {
                results: result.docs,
                count: result.totalDocs,
                pages: result.totalPages,
                hasPrevPage: result.hasPrevPage,
                hasNextPage: result.hasNextPage,
            };
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
