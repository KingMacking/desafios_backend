import SessionDTO from '../dto/UsersDTO/session.dto.js'
import services from '../services/index.js'

const { productsService } = services

class ProductsController {
    getProducts = async (req,res) => {
    
        const {limit=10, page=1, sort, ...query} = req.query
        const options = {
            limit: limit,
            page: page,
            sort: sort ? {price: sort} : {},
            lean: true
        }
        try {
            const products = await productsService.getAllProducts(query, options)
            res.send(products)
        } catch (error) {
            res.send(error)
        }
    }

    getProductById = async (req,res) => {
        const {prodId} = req.params
        try {
            const product = await productsService.getProductById(prodId)
            if(product){
                res.json({mesagge:'Producto encontrado', product})
            } else {
                res.json({mesagge:'Producto no encontrado'})
            }
        } catch (error) {
            res.send(error)
        }
    }

    addProduct = async (req,res) => {
        const newProduct = req.body.product
        try {
            const product = await productsService.saveProduct(newProduct)
            res.send(product)
        } catch (error) {
            res.send(error)
        }
    }

    deleteProduct = async (req,res) => {
        const {prodId} = req.params
        try {
            const deletedProd = await productsService.deleteProductById(prodId)
            res.send(deletedProd)
        } catch (error) {
            res.send(error)
        }
    }

    updateProduct = async (req,res) => {
        const {prodId} = req.params
        const updatedFields = req.body
        try {
            const updatedProd = await productsService.updateProductById(prodId, updatedFields)
            res.send(updatedProd)
        } catch (error) {
            res.send(error)
        }
    }
}

export default new ProductsController()