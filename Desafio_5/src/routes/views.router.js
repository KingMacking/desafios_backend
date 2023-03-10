import { Router } from "express";
import ProductManager from "../dao/services/mongoManagers/ProductManager.js";
import CartManager from "../dao/services/mongoManagers/CartManager.js";

const productService = new ProductManager()
const cartsService = new CartManager()
const router = Router()

router.get('/home', async (req,res) => {
    try {
        res.render('home', {
            cart: "6403c61b5c08e4d7fc0e342d"
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
            const {name, lastName} = req.session.user
            const {role} = req.session
            res.render('products', {
                hasProducts: products.payload.length > 0,
                products: products.payload,
                name: name,
                lastName: lastName,
                role: role
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
            const product = await productService.getProductById(idProd)
            res.render('product', {
                product
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
            const {idCart} = req.params
            const cart = await cartsService.getCartById(idCart)
            res.render('cart', {
                hasProducts: cart.products.length > 0,
                products: cart.products
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
            const {name, lastName, email} = req.session.user
            const {role} = req.session
            console.log(name, lastName, email);
            res.render('profile', {
                name: name,
                lastName: lastName,
                email: email,
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