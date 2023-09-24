import fs from "fs"


class CartManager{

    constructor(path){
        this.path = path
    }

    async getCarts(){
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

    async createCart(){
        try {
            const carts = await this.getCarts()
            const newCart = {
                id: !carts.length ? 0 : carts[carts.length-1].id + 1,
                products: [],
            }
            carts.push(newCart)
            await fs.promises.writeFile(this.path, JSON.stringify(carts))
            return newCart
        } catch (error) {
            console.error(error)
            return error
        }
    }

    async getCartById(cartId){
        try {
            const carts = await this.getCarts()
            const cart = carts.find(cart => cart.id === cartId)
            return cart
        } catch (error) {
            console.error(error)
            return error
        }
    }
    
    async addProductToCartById(cartId, productId){
        try {
            const carts = await this.getCarts()
            const cart = carts.find(cart => cart.id === cartId)
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

            await fs.promises.writeFile(this.path, JSON.stringify(carts))
            return cart
        } catch (error) {
            console.error(error)
            return error
        }
    }
}

export const CartsManager = new CartManager("carts.json")
