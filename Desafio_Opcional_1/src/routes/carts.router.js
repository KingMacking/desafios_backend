import { Router } from "express";

// Cart manager with FS
// import CartManager from "../dao/services/fileManagers/CartManager.js";

//Cart manager with MongoDB
import CartManager from "../dao/services/mongoManagers/CartManager.js";

// Cart manager with FS
// const cartManager = new CartManager('src/data/carts.json')

//Cart manager with MongoDB
const cartManager = new CartManager()

const router = Router()

//Get all carts
router.get('/', async (req,res) => {
    try {
        const carts = await cartManager.getCarts()
        res.send(carts)
    } catch (error) {
        res.send(error)
    }
})

//Get cart by ID
router.get('/:cartId', async (req,res) => {
    const {cartId} = req.params
    try {
        const cart = await cartManager.getCartById(cartId)
        res.send(cart)
    } catch (error) {
        res.send(error)
    }
})

router.post('/', async (req,res) => {
    try {
        const cart = await cartManager.createCart()
        res.send(cart)
    } catch (error) {
        res.send(error)
    }
})

router.post('/:cartId/product/:prodId', async (req,res) => {
    const {cartId, prodId} = req.params
    try {
        const product = await cartManager.addProductInCart(cartId, prodId)
        res.send(product)
    } catch (error) {
        res.send(error)
    }
})

export default router