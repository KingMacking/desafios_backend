import { Router } from "express";

// Product manager with FS
// import ProductManager from "../dao/services/fileManagers/ProductManager.js";

// Product manager with MongoDB
import ProductManager from "../dao/services/mongoManagers/ProductManager.js";


const router = Router()
const productManager = new ProductManager()

// Get all products or limited products
router.get('/', async (req,res) => {
    try {
        const products = await productManager.getProducts()
        const {limit} = req.query
        if(products.length > 0) {
            if(limit){
                const limitedProducts = products.slice(0, limit)
                res.send(limitedProducts)
            } else {
                res.send(products)
            }
        } else {
            res.send("No se encontraron productos")
        }
    } catch (error) {
        res.send(error)
    }
})

//Get product by ID
router.get('/:idProduct', async (req,res)=>{
    const {idProduct} = req.params
    try {
        const product = await productManager.getProductById(idProduct)
        if(product){
            res.json({mesagge:'Producto encontrado', product})
        } else {
            res.json({mesagge:'Producto no encontrado'})
        }
    } catch (error) {
        res.send(error)
    }
})

//Add product
router.post('/', async (req,res) => {
    const newProd = req.body
    try {
        const product = await productManager.addProduct(newProd)
        res.send(product)
    } catch (error) {
        res.send(error)
    }
})

//Delete product by ID
router.delete('/:idProduct', async (req,res) => {
    try {
        const {idProduct} = req.params
        const deletedProd = await productManager.deleteProduct(idProduct)
        res.send(deletedProd)
    } catch (error) {
        res.send(error)
    }
})

//Update product by ID
router.put('/:idProduct', async (req,res) => {
    const {idProduct} = req.params
    const updatedFields = req.body
    try {
        const updatedProd = await productManager.updateProduct(idProduct, updatedFields)
        res.send(updatedProd)
    } catch (error) {
        res.send(error)
    }
})

export default router