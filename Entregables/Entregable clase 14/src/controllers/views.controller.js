import usersService from "../services/users.service.js"
import productsService from "../services/products.service.js"
import cartsService from "../services/carts.service.js"


class ViewsController{
    async login(req, res){
        try {
            res.render("login")
        } catch (error) {
            res.status(500).json({message: error})
        }
    }

    async signup(req, res){
        try {
            res.render("signup")
        } catch (error) {
            res.status(500).json({message: error})
        }
    }

    async getProfile(req, res){
        try {
            const user = await usersService.getUserByEmail(req.user.email)
            res.render("userProfile", {user})
        } catch (error) {
            res.status(500).json({message: error})
        }
    }

    async getProducts(req, res){
        try {
            const page = parseInt(req.query.page) || 1
            const baseUrl = `${req.protocol}://${req.get('host')}${req.baseUrl}`
            const response = await productsService.getProducts(baseUrl, page)
            const products = response.payload
            const pagesArray = Array.from({ length:response.totalPages }, (_, index) => index + 1)
            res.render("products", {products:products, pages:pagesArray, userData: req.user})
        } catch (error) {
            res.status(500).json({message: error})
        }
    }
   
    async getCartById(req, res){
        try {
            const cartId = req.params.cid
            const cart = await cartsService.getCartById(cartId)
            res.render("cartProducts", {products: cart.products})
        } catch (error) {
            console.log(error)
            res.status(500).json({message: error})
        }
    }
}

const viewsController = new ViewsController()
export default viewsController
