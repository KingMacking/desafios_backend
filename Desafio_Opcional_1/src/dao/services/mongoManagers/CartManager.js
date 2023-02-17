import { cartModel } from "../../models/carts.model.js"

export default class CartManager {

    //Get carts
    async getCarts(){
        try {
            const carts = await cartModel.find()
            return carts
        } catch (error) {
            return error
        }
    }

    //Get product by ID
    async getCartById(cartId){
        try {
            const cart = await cartModel.findById(cartId)
            return cart
        } catch (error) {
            return error
        }
    }

    //Create cart
    async createCart(){
        try {
            const cart = {products: []}
            await cartModel.create(cart)
            return "Carrito creado con exito"
        } catch (error) {
            return error
        }
    }

    //Add product to a cart
    async addProductInCart(cartId, prodId){
        try {
            const cart = await this.getCartById(cartId)
            if(cart) {
                if(await this.#isInCart(prodId, cart)) {
                    await cartModel.findOneAndUpdate({_id: cartId, "products.product": prodId},
                        {
                            $inc: {
                                "products.$.quantity": 1
                            }
                        }
                    )
                    return `Producto con el ID ${prodId} ya existente en el carrito con ID ${cartId}, agregado 1 a la cantidad con exito`
                } else {
                    const product = {product: prodId, quantity: 1}
                    await cartModel.updateOne({_id: cartId},
                        {
                            $push: {
                                products: {
                                    ...product
                                }
                            }
                        }
                    )
                    return  `Producto con el ID ${prodId} agregado al carrito con ID ${cartId} con exito`
                }
            } else {
                return `Carrito con el ID ${cartId} no existente`
            }
        } catch (error) {
            return error
        }
    }

    async #isInCart(prodId, cart){
        return cart.products.some(prod => prod.product === prodId)
    }
}