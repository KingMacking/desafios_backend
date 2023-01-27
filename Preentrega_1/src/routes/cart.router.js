import { Router } from "express";
import CartManager from "../managers/CartManager.js";

const router = Router()
const cartManager = new CartManager('src/data/cart.json')

//Get cart by ID
router.get('/:cartId', async (req,res) => {
    const {cartId} = req.params
    const cart = await cartManager.getCartById(parseInt(cartId))
    if(cart){
        res.send(cart)
    } else {
        res.send("Carrito no encontrado")
    }
})

router.post('/', async (req,res) => {
    const cart = await cartManager.createCart()
    res.send("Carrito agregado con exito")
    res.send(cart)
})

router.post('/:cartId/product/:prodId', async (req,res) => {
    const {cartId, prodId} = req.params
    const product = await cartManager.addProductInCart(parseInt(cartId), parseInt(prodId))
    res.send(product)
})

export default router