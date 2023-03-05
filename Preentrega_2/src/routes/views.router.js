import { Router } from "express";
import ProductManager from "../dao/services/mongoManagers/ProductManager.js";
import CartManager from "../dao/services/mongoManagers/CartManager.js";

const productService = new ProductManager()
const cartsService = new CartManager()
const router = Router()

router.get('/', async (req,res) => {
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
        const {limit=10, page=1, sort, ...query} = req.query
        const products = await productService.getProducts(limit, query, sort, page)
        res.render('products', {
            hasProducts: products.payload.length > 0,
            products: products.payload
        })
    } catch (error) {
        res.send(error)
    }
})

router.get('/products/:idProd', async (req,res) => {
    try {
        const {idProd} = req.params
        const product = await productService.getProductById(idProd)
        res.render('product', {
            product
        })
    } catch (error) {
        res.send(error)
    }
})

router.get('/carts/:idCart', async (req,res) => {
    try {
        const {idCart} = req.params
        const cart = await cartsService.getCartById(idCart)
        res.render('cart', {
            hasProducts: cart.products.length > 0,
            products: cart.products
        })
    } catch (error) {
        res.send(error)
    }
})

export default router