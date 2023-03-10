import fs from 'fs'

export default class CartManager {
    constructor(path){
        this.path = path
    }

    //Get carts
    async getCarts(){
        try {
            if(fs.existsSync(this.path)){
                const cartsData = await fs.promises.readFile(this.path, 'utf-8')
                const carts = JSON.parse(cartsData)
                return carts
            } else {
                return []
            }
        } catch (error) {
            console.log(error)
        }
    }

    //Get product by ID
    async getCartById(cartId){
        const cart = await this.#findCartById(cartId)
        if(cart && cart !== []){
            return cart
        } else {
            return null
        }
    }

    //Create cart
    async createCart(){
        try {
            const cartsData = await this.getCarts()
            let id = cartsData.length === 0 ? 1 :cartsData[cartsData.length - 1].id + 1
            cartsData.push({id: id,products: []})
            await fs.promises.writeFile(this.path, JSON.stringify(cartsData))
            return  `Carrito con el ID ${id} creado con exito`
        } catch (error) {
            console.log(error);
        }
    }

    //Add product to a cart
    async addProductInCart(cartId, prodId){
        try {
            const cartsData = await this.getCarts()
            const cart = await this.getCartById(cartId)
            const cartIndex = await cartsData.findIndex(cart=> cart.id === cartId)
            if(cart) {
                if(await this.#isInCart(prodId, cart)) {
                    let existingProd = cart.products.find(prod=> prod.product === prodId)
                    existingProd && (existingProd.quantity += 1)
                    cartsData[cartIndex] = {...cart}
                    await fs.promises.writeFile(this.path, JSON.stringify(cartsData))
                    return `Producto con el ID ${prodId} ya existente en el carrito, agregado 1 a su cantidad`
                } else {
                    const product = {product: prodId, quantity: 1}
                    await cart.products.push(product)
                    cartsData[cartIndex] = {...cart}
                    await fs.promises.writeFile(this.path, JSON.stringify(cartsData))
                    return `Producto con el ID ${prodId} agregado con exito al carrito`
                }
            } else {
                return `Carrito con el ID ${cartId} no existente`
            }
        } catch (error) {
            console.log(error);
        }
    }

    //Find cart by ID
    async #findCartById(cartId){
        try {
            const carts = await this.getCarts()
            return carts.find(cart=> cart.id === cartId)
        } catch (error) {
            console.log(error);
        }
    }

    async #isInCart(prodId, cart){
        console.log(cart);
        return cart.products.some(prod => prod.product === prodId)
    }
}