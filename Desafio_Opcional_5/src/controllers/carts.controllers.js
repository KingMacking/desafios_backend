import NewCartDTO from '../dto/CartsDTO/newCart.dto.js';
import SessionDTO from '../dto/UsersDTO/session.dto.js';
import services from '../services/index.js';
import logger from '../utils/winston/winston.js';

const { cartsService, productsService, ticketsService } = services
const date = new Date
class CartsController {
    getCartById = async (req,res) => {
        const {cartId} = req.params
        try {
            let cart = await cartsService.getCartById(cartId)
            res.send(cart) 
        } catch (error) {
            next(error)
        }
    }

    addProductToCart = async (req,res) => {
        const {prodId, cartId} = req.params
        try {
            const product = await cartsService.updateCartById(cartId, prodId)
            res.send(product)
        } catch (error) {
            next(error)
        }
    }

    emptyCart = async (req,res) => {
        const {cartId} = req.params
        try {
            const updatedCart = await cartsService.emptyCartById(cartId)
            res.send(updatedCart)
        } catch (error) {
            next(error)
        }
    }

    deleteProductFromCart = async (req,res) => {
        const {cartId, prodId} = req.params
        try {
            const updatedCart = await cartsService.deleteProductById(cartId, prodId)
            res.send(updatedCart)
        } catch (error) {
            next(error)
        }
    }

    updateProductQuantity = async (req,res) => {
        const {quantity} = req.body
        const {prodId, cartId} = req.params
        try {
            const updatedCart = await cartsService.updateProductQuantityById(cartId, prodId, quantity)
            res.send(updatedCart)
        } catch (error) {
            next(error)
        }
    }

    createCart = async (req,res) => {
        try {
            const newCart = new NewCartDTO()
            const cart = await cartsService.createCart(newCart)
            res.send(cart)
            logger.debug('Cart created successfully')
        } catch (error) {
            next(error)
        }
    }

    purchase = async (req, res) => {
        try {
            const session = new SessionDTO(req.session)
            const { cart, email } = session
            const cartData = await cartsService.getCartById(cart)
            const order = []
            for(let i = 0; i < cartData.products.length; i++){
                const product = await productsService.getProductById(cartData.products[i]._id)
                //Si el stock es mayor o igual a la cantidad a comprar, se resta la cantidad y se saca el producto del carrito
                if(product.stock >= cartData.products[i].quantity){
                    order.push({name: product.title, code: product.code, quantity: cartData.products[i].quantity, price: product.price})
                    const newProductStock = product.stock - cartData.products[i].quantity
                    await productsService.updateProductById(product._id, {stock: newProductStock})
                    await cartsService.deleteProductById(cart, product._id)
                }
            }
            const tickets = await ticketsService.getAllTickets()
            const total = order.reduce((acc, prod) =>{
                const productTotal = prod.quantity * prod.price
                return acc + productTotal
            }, 0)
            const purchaseDate = date.toLocaleString('es-ES')
            const ticket = {
                code: `${parseInt(tickets[tickets.length - 1].code) + 1}`,
                purchase_datetime: purchaseDate,
                amount: total,
                purchaser: email,
                order: order,
            }
            const purchaseTicket = await ticketsService.createPurchaseTicket(ticket)
            logger.info('Purchase ended successfully')
            res.send(purchaseTicket)
        } catch (error) {
            logger.error(error)
            next(error)
        }
    }
}

export default new CartsController()

