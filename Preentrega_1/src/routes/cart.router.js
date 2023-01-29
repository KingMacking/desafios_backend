import { Router } from "express";
import CartManager from "../managers/CartManager.js";

const router = Router()
const cartManager = new CartManager('src/data/carts.json')

//Get cart by ID
router.get('/:cartId', async (req,res) => {
    const {cartId} = req.params
    try {
        const cart = await cartManager.getCartById(parseInt(cartId))
        if(cart){
            res.send(cart.products)
        } else {
            res.send("Carrito no encontrado")
        }
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
        const product = await cartManager.addProductInCart(parseInt(cartId), parseInt(prodId))
        res.send(product)
    } catch (error) {
        res.send(error)
    }
})

export default router