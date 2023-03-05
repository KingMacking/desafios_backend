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

//Create cart
router.post('/', async (req,res) => {
    console.log("post llamado");
    try {
        const cart = await cartManager.createCart()
        res.send(cart)
    } catch (error) {
        res.send(error)
    }
})

//Push product inside a cart
router.post('/:cartId/product/:prodId', async (req,res) => {
    const {cartId, prodId} = req.params
    try {
        const product = await cartManager.addProductInCart(cartId, prodId)
        res.send(product)
    } catch (error) {
        res.send(error)
    }
})

//Push multiple products inside a cart
router.put('/:cartId', async (req,res) => {
    const {cartId} = req.params
    const newProducts = req.body
    try {
        const cart = await cartManager.addProductsToCart(cartId, newProducts)
        res.send(cart)
    } catch (error) {
        res.send(error)
    }
})

//Update product quantity inside a cart
router.put('/:cartId/products/:prodId', async (req,res) => {
    const {cartId, prodId} = req.params
    const {quantity} = req.body
    try {
        const cart = await cartManager.updateProductInCartQuantity(cartId, prodId, quantity)
        res.send(cart)
    } catch (error) {
        console.log(error);
        res.send(error)
    }
})

router.delete('/:cartId/products/:prodId', async (req,res) => {
    const {cartId, prodId} = req.params
    try {
        const cart = await cartManager.deleteProdInCart(cartId, prodId)
        res.send(cart)
    } catch (error) {
        res.send(error)
    }
})

router.delete('/:cartId', async (req,res) => {
    const {cartId} = req.params
    try {
        const cart = await cartManager.deleteAllProductsInCart(cartId)
        res.send(cart)
    } catch (error) {
        res.send(error)
    }
})

export default router