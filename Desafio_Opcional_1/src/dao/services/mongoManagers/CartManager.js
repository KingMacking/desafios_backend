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
            const newCart = await cartModel.create(cart)
            return newCart
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
                    const updatedCart = await cartModel.findOneAndUpdate({_id: cartId, "products.product": prodId},
                        {
                            $inc: {
                                "products.$.quantity": 1
                            }
                        }
                    )
                    return updatedCart
                } else {
                    const product = {product: prodId, quantity: 1}
                    const updatedCart = await cartModel.updateOne({_id: cartId},
                        {
                            $push: {
                                products: {
                                    ...product
                                }
                            }
                        }
                    )
                    return updatedCart
                }
            } else {
                return `Carrito con el ID ${cartId} no existente`
            }
        } catch (error) {
            console.log(error);
        }
    }

    async #isInCart(prodId, cart){
        console.log(cart);
        return cart.products.some(prod => prod.product === prodId)
    }
}