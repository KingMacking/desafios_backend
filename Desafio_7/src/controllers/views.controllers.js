import services from '../services/index.js'

const {productsService, cartsService} = services

const getProducts = async (req,res) => {
    try {
        if(req.session.user){
            const {limit=10, page=1, sort, ...query} = req.query
            const options = {
                limit: limit,
                page: page,
                sort: sort ? {price: sort} : {},
                lean: true
            }
            const products = await productsService.getAllProducts(query, options)
            const {first_name, last_name, role, cart} = req.session.user
            res.render('products', {
                hasProducts: products.payload.length > 0,
                products: products.payload,
                name: first_name,
                lastName: last_name,
                role: role,
                cart: cart
            })
        } else {
            res.redirect('/')
        }
    } catch (error) {
        res.send(error)
    }
}

const getProductById = async (req,res) => {
    try{
        if(req.session.user){
            const {prodId} = req.params
            const {cart} = req.session.user
            const product = await productsService.getProductById(prodId)
            res.render('product', {
                product: product,
                cart: cart
            })
        } else {
            res.redirect('/')
        }
    } catch (error) {
        res.send(error)
    }
}

const getCartById = async (req,res) => {
    try {
        if(req.session.user){
            const {cart} = req.session.user
            const cartInfo = await cartsService.getCartById(cart)
            res.render('cart', {
                hasProducts: cartInfo.products.length > 0,
                products: cartInfo.products,
                cart: cart
            })
        } else {
            res.redirect('/')
        }
    } catch (error) {
        res.send(error)
    }
}

export default {
    getProducts,
    getProductById,
    getCartById,
}

