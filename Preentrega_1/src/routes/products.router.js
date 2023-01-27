import { Router } from "express";
import ProductManager from "../managers/ProductManager.js";
import { productValidator } from "../middlewares/productValidator.js";

const router = Router()
const productManager = new ProductManager('src/data/products.json')

// Get all products or limited products
router.get('/', async (req,res) => {
    const products = await productManager.getProducts()
    const {limit} = req.query
    if(limit){
        const limitedProducts = products.slice(0, limit)
        res.send(limitedProducts)
    } else {
        res.send(products)
    }
})

//Get product by ID
router.get('/:idProduct', async (req,res)=>{
    const {idProduct} = req.params
    const product = await productManager.getProductById(parseInt(idProduct))
    if(product){
        res.json({mesagge:'Producto encontrado', product})
    } else {
        res.json({mesagge:'Producto no encontrado'})
    }
})

//Add product
router.post('/', productValidator ,async (req,res) => {
    const newProd = req.body
    const product = await productManager.addProduct(newProd)
    res.json({product})
})

//Delete product by ID
router.delete('/:idProduct', async (req,res) => {
    const {idProduct} = req.params
    const deletedProd = await productManager.deleteProduct(parseInt(idProduct))
})

//Update product by ID
router.put('/:idProduct', async (req,res) => {
    const {idProduct} = req.params
    const updatedFields = req.body
    console.log(idProduct);
    const updatedProd = await productManager.updateProduct(parseInt(idProduct), updatedFields)
    res.json({mesagge:"Producto actualizado con exito", updatedProd})
})

export default router