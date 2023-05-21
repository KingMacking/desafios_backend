import { tokenModel } from '../dao/MongoDao/models/tokens.model.js'
import SessionDTO from '../dto/UsersDTO/session.dto.js'
import services from '../services/index.js'

const {productsService, cartsService, ticketsService} = services

class ViewsController {
    getProducts = async (req,res) => {
        try {
            const {limit=10, page=1, sort, ...query} = req.query
            const session = new SessionDTO(req.session)
            const options = {
                limit: limit,
                page: page,
                sort: sort ? {price: sort} : {},
                lean: true
            }
            const products = await productsService.getAllProducts(query, options)
            const {full_name, role, cart} = session
            res.render('products', {
                hasProducts: products.payload.length > 0,
                products: products.payload,
                full_name: full_name,
                role: role,
                cart: cart
            })
        } catch (error) {
            res.send(error)
        }
    }

    getProductById = async (req,res) => {
        try{
            if(req.session.user){
                const {prodId} = req.params
                const session = new SessionDTO(req.session)
                const {cart, role, email} = session
                const product = await productsService.getProductById(prodId)
                let canDelete
                if((product.owner === email && role === "premium") || role === "admin") {
                    canDelete = true
                }
                res.render('product', {
                    product: product,
                    cart: cart,
                    canDelete: canDelete
                })
            } else {
                res.redirect('/')
            }
        } catch (error) {
            res.send(error)
        }
    }

    createProduct = async (req,res,next) => {
        try {
            res.render('createProduct')
        } catch (error) {
            res.send(error)
        }
    }

    getCartById = async (req,res) => {
        try {
            if(req.session.user){
                const session = new SessionDTO(req.session)
                const {cart} = session
                const cartInfo = await cartsService.getCartById(cart)
                res.render('cart', {
                    hasProducts: cartInfo.products.length > 0,
                    products: cartInfo.products,
                    cart: cart
                })
            } else {
                res.redirect('/')
            }
        } catch (error) {
            res.send(error)
        }
    }

    getTicketById = async (req,res) => {
        try {
            if(req.session.user){
                const session = new SessionDTO(req.session)
                const {ticketId} = req.params
                const {cart} = session
                const cartInfo = await cartsService.getCartById(cart)
                const ticketInfo = await ticketsService.getTicketById(ticketId)
                res.render('purchaseEnded',{
                    ticket: ticketInfo,
                    cart: cartInfo,
                    purchasedProducts: ticketInfo.order,
                    purchasedAny: ticketInfo.order.length > 0,
                    insufficientStock: cartInfo.products,
                    purchasedAll: cartInfo.products.length === 0
                })
            }
        } catch (error) {
            res.send(error)
        }
    }

    getProfile = async (req,res) => {
        try {
            const session = new SessionDTO(req.session)
            const {full_name, email, role, age, cart} = session
            res.render('profile', {
                full_name: full_name,
                email: email,
                age: age,
                cart: cart,
                role: role
            })
        } catch (error) {
            res.send(error)
        }
    }

    login = async (req,res) =>{
        try {
            const session = new SessionDTO(req.session)
            const { role } = session
            if(role){
                res.redirect('/products')
            } else{
                res.render('login')
            }
        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }

    loginError = async (req,res) => {
        try {
            res.render('loginError')
        } catch (error) {
            res.send(error)
        }
    }

    register = async (req,res) => {
        try {
            const session = new SessionDTO(req.session)
            const { role } = session
            if(role){
                res.redirect('/products')
            } else {
                res.render('register')
            }
        } catch (error) {
            res.send(error)
        }
    }

    registerError = async (req,res) => {
        try {
            res.render('registerError')
        } catch (error) {
            res.send(error)
        }
    }

    resetPassword = async (req, res) => {
        try {
            res.render('passwordReset')
        } catch (error) {
            res.send(error)
        }
    }

    createNewPassword = async (req,res) => {
        try {
            const {userId, token} = req.params
            const tokenDB = await tokenModel.findOne({
                userId: userId,
                token: token
            })

            if(!tokenDB){
                res.render('expiredLink')
            } else {
                res.render('createNewPassword', {
                    userId: userId,
                    token: token
                })
            }
        } catch (error) {
            res.send(error)
        }
    }
}

export default new ViewsController()