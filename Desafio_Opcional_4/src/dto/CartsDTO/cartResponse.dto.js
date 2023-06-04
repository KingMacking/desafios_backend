export default class CartResponse{
    constructor(cart){
        this.products = cart.products.length > 0 ? cart.products : "El carrito esta vacio"
    }
}