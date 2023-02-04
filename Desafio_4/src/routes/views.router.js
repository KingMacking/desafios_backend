import { Router } from "express";
import ProductManager from "../../../Preentrega_1/src/managers/ProductManager.js";
import { socketServer } from "../app.js";
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
        console.log(product);
    } catch (error) {
        res.send(error);
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