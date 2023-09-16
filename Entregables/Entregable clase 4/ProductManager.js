import fs from "fs"

class ProductManager{

    constructor(path){
        this.path = path
    }

    async getProducts(){
        try {         
            if(fs.existsSync(this.path)){
                const info = await fs.promises.readFile(this.path, "utf-8")
                return JSON.parse(info)
            }
            else{
                return []
            }
        } catch (error) {
            console.error(error)
            return error
        }
    }

    async createProduct(productObj){
        try {
            const products = await this.getProducts()
            productObj.id = !products.length ? 0 : products[products.length-1].id + 1
            products.push(productObj)
            await fs.promises.writeFile(this.path, JSON.stringify(products))
            return productObj
        } catch (error) {
            console.error(error)
            return error
        }
    }

    async getProductById(productId){
        try {
            const products = await this.getProducts()
            const product = products.find(product => product.id === productId)
            return product
        } catch (error) {
            console.error(error)
            return error
        }
    }
    
    async deleteProduct(productId){
        try {
            const products = await this.getProducts()
            const product = products.find(product=>product.id === productId)
            if (!product){
                return -1
            }
            const newArrayProducts = products.filter(product => product.id !== productId)
            await fs.promises.writeFile(this.path, JSON.stringify(newArrayProducts))
            return 1
        } catch (error) {
            console.error(error)
            return error
        }
    }

    async updateProduct(productId, newData){
        try {
            const products = await this.getProducts()
            const productIndex = products.findIndex(u=>u.id === productId)
            if (productIndex===-1){
                return -1
            }
            const product = products[productIndex]
            products[productIndex] = {...product, ...newData}
            await fs.promises.writeFile(this.path, JSON.stringify(products))
            return 1
        } catch (error) {
            console.error(error)
            return error
        }
    }
}

export const ProductsManager = new ProductManager("products.json")
