import { Router } from "express";
import ProductManager from "../dao/services/mongoManagers/ProductManager.js";
import CartManager from "../dao/services/mongoManagers/CartManager.js";

const productService = new ProductManager()
const cartsService = new CartManager()
const router = Router()

router.get('/home', async (req,res) => {
    try {
        res.render('home', {
            cart: req.session.user.cart
        })
    } catch (error) {
        res.send(error)
    }
})

router.get('/products', async (req,res)=> {
    try {
        if(req.session.user){
            const {limit=10, page=1, sort, ...query} = req.query
            const products = await productService.getProducts(limit, query, sort, page)
            const {first_name, last_name, role, cart} = req.session.user
            res.render('products', {
                hasProducts: products.payload.length > 0,
                products: products.payload,
                name: first_name,
                lastName: last_name,
                role: role,
                cart: cart
            })
        } else {
            res.redirect('/')
        }
    } catch (error) {
        res.send(error)
    }
})

router.get('/products/:idProd', async (req,res) => {
    try {
        if(req.session.user){
            const {idProd} = req.params
            const {cart} = req.session.user
            const product = await productService.getProductById(idProd)
            res.render('product', {
                product: product,
                cart: cart
            })
        } else {
            res.redirect('/')
        }
    } catch (error) {
        res.send(error)
    }
})

router.get('/carts/:idCart', async (req,res) => {
    try {
        if(req.session.user){
            const {cart} = req.session.user
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
})

router.get('/', (req,res) => {
    try {
        res.render('login')
    } catch (error) {
        res.send(error)
    }
})

router.get('/register', (req,res) => {
    try {
        res.render('register')
    } catch (error) {
        res.send(error)
    }
})

router.get('/registerError', (req,res) => {
    try {
        res.render('registerError')
    } catch (error) {
        res.send(error)
    }
})

router.get('/loginError', (req,res) => {
    try {
        res.render('loginError')
    } catch (error) {
        res.send(error)
    }
})

router.get('/profile', (req,res) => {
    try {
        if(req.session.user){
            const {first_name, last_name, email, role, age, cart} = req.session.user
            res.render('profile', {
                first_name: first_name,
                last_name: last_name,
                email: email,
                age: age,
                cart: cart,
                role: role
            })
        } else {
            res.redirect('/')
        }
    } catch (error) {
        res.send(error)
    }
})


export default router