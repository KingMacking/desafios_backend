import services from '../services/index.js';

const { cartsService } = services

const getCartById = async (req,res) => {
    const {cartId} = req.params
    try {
        let cart = await cartsService.getCartById(cartId)
        return cart
    } catch (error) {
        res.send(error)
    }
}

const addProductToCart = async (req,res) => {
    const {prodId, cartId} = req.params
    try {
        const product = await cartsService.updateCartById(cartId, prodId)
        res.send(product)
    } catch (error) {
        res.send(error)
    }
}

const createCart = async (req,res) => {
    try {
        const newCart = {products: []}
        const cart = await cartsService.createCart(newCart)
        res.send(cart)
    } catch (error) {
        res.send(error)
    }
}

const updateProductQuantity = async (req,res) => {
    const {quantity} = req.body
    const {prodId, cartId} = req.params
    try {
        const updatedCart = await cartsService.updateProductQuantityById(cartId, prodId, quantity)
        res.send(updatedCart)
    } catch (error) {
        res.send(error)
    }
}

const deleteProductFromCart = async (req,res) => {
    const {cartId, prodId} = req.params
    try {
        const updatedCart = await cartsService.deleteProductById(cartId, prodId)
        res.send(updatedCart)
    } catch (error) {
        res.send(error)
    }
}

const emptyCart = async (req,res) => {
    const {cartId} = req.params
    try {
        const updatedCart = await cartsService.emptyCartById(cartId)
        res.send(updatedCart)
    } catch (error) {
        res.send(error)
    }
}

export default {
    getCartById,
    addProductToCart,
    emptyCart,
    deleteProductFromCart,
    updateProductQuantity,
    createCart,
}