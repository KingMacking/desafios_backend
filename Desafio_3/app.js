import express from 'express'
import ProductManager from './src/ProductManager.js'

const PORT = 8080
const app = express()
const productManager = new ProductManager("./src/products.json")

app.listen(PORT, () => {
    console.log(`Server runnin on port ${PORT}`);
})

// Get all products or limited products
app.get('/products', async (req,res)=>{
    let products = await productManager.getProducts();
    let {limit} = req.query
    if(limit){
        console.log(limit);
        const limitedProducts = products.slice(0, limit)
        console.log(limitedProducts);
        res.send(limitedProducts);
    } else {
        console.log(products);
        res.send(products);
    }
})

//Get product by ID
app.get('/products/:idProduct', async (req,res)=>{
    const {idProduct} = req.params
    let products = await productManager.getProducts();
    const product = products.find(prod=>prod.id === parseInt(idProduct))
    if(product){
        console.log(product);
        res.json({mesagge:'Producto encontrado', product})
    } else {
        res.json({mesagge:'Producto no encontrado'})
    }
})