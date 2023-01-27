import express from 'express'
import productsRouter from './src/routes/products.router.js'
import cartRouter from './src/routes/cart.router.js'
import { __dirname } from './src/utils/utils.js'

const PORT = 8080
const app = express()

//Express uses
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(__dirname+'/public'))

//Routes
app.use('/api/products', productsRouter)
app.use('/api/carts', cartRouter)


//Set port
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})
