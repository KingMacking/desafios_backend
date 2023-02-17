import { Router } from "express";
import { socketServer } from "../app.js";
import ProductManager from "../services/ProductManager.js";
import { uploader } from "../utils.js";

const router = Router()
const productService = new ProductManager('src/data/products.json')

router.get('/api', async (req,res) => {
    const products = await productService.getProducts()
    res.send(products)
})
router.post('/api', uploader.none(), async (req,res)=>{
    const newProduct = req.body
    try {
        const product = await productService.addProduct(newProduct)
        res.send(product)
    } catch (error) {
        res.send(error);
    }
})
router.delete('/api', uploader.none(), async (req,res) => {
    try {
        const idProduct = req.body.id
        const deletedProd = await productService.deleteProduct(parseInt(idProduct))
        res.send(deletedProd)
    } catch (error) {
        res.send(error)
    }
})


router.get('/', async (req,res)=> {
    try {
        const products = await productService.getProducts()
        res.render('home', {
            hasProducts: products.length > 0,
            products
        })
    } catch (error) {
        res.send(error)
    }
})
router.get ('/realtimeproducts', (req,res) => {
    res.render('realTimeProducts')
})

export default router