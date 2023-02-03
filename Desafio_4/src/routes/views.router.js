import { Router } from "express";
import { productValidator } from "../middlewares/productValidator.js";
import ProductManager from "../services/ProductManager.js";

const router = Router()
const productManager = new ProductManager('src/data/products.json')

router.get('/', async (req, res) => {
    const products = await productManager.getProducts()
    res.render('home', {
        title: "productos",
        hasProducts: products.length > 0,
        products
    })
})

router.post('/realtimeproducts', productValidator, async (req, res)=>{
    const newProduct = req.body
    const product = await productManager.addProduct(newProduct)
    const io = req.app.get('socketio')
    io.emit('getProducts')
    res.send({message: `Producto agregado con exito`, product: product})
})

router.get('/realtimeproducts', async (req,res)=>{
    res.render('realTimeProducts', {
        title: "Productos en tiempo real"
    })
})

export default router