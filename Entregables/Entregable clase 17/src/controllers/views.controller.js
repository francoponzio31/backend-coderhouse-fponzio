import usersService from "../services/users.service.js"
import productsService from "../services/products.service.js"
import cartsService from "../services/carts.service.js"
import { errorMessages } from "../utils/responses.js"
import customError from "../utils/customError.js"


class ViewsController{
    async login(req, res){
        try {
            return res.render("login")
        } catch (error) {
            customError.throw(errorMessages.SERVER_ERROR, 500)
        }
    }

    async signup(req, res){
        try {
            return res.render("signup")
        } catch (error) {
            customError.throw(errorMessages.SERVER_ERROR, 500)
        }
    }

    async getProfile(req, res){
        try {
            const user = await usersService.getUserByEmail(req.user.email)
            return res.render("userProfile", {user})
        } catch (error) {
            customError.throw(errorMessages.SERVER_ERROR, 500)
        }
    }

    async getProducts(req, res){
        try {
            const page = parseInt(req.query.page) || 1
            const baseUrl = `${req.protocol}://${req.get('host')}${req.baseUrl}`
            const response = await productsService.getProducts(baseUrl, page)
            const products = response.payload
            const pagesArray = Array.from({ length:response.totalPages }, (_, index) => index + 1)
            return res.render("products", {products:products, pages:pagesArray, userData: req.user})
        } catch (error) {
            customError.throw(errorMessages.SERVER_ERROR, 500)
        }
    }
   
    async getCartById(req, res){
        try {
            const cartId = req.params.cid
            const cart = await cartsService.getCartById(cartId)
            return res.render("cartProducts", {cartId: cartId, products: cart.products})
        } catch (error) {
            console.log(error)
            customError.throw(errorMessages.SERVER_ERROR, 500)
        }
    }
}

const viewsController = new ViewsController()
export default viewsController
