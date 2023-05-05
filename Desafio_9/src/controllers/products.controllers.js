import services from '../services/index.js'
import logger from '../utils/winston/winston.js'

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
            next(error)
        }
    }

    getProductById = async (req,res) => {
        const {prodId} = req.params
        try {
            const product = await productsService.getProductById(prodId)
            console.log(product);
            res.send(product)
        } catch (error) {
            logger.error(error)
            next(error)
        }
    }

    addProduct = async (req,res, next) => {
        const newProduct = req.body.product
        try {
            const product = await productsService.saveProduct(newProduct)
            logger.debug('Product created successfully')
            res.send(product)
        } catch (error) {
            logger.error(error)
            next(error)
        }
    }

    deleteProduct = async (req,res) => {
        const {prodId} = req.params
        try {
            const deletedProd = await productsService.deleteProductById(prodId)
            logger.debug('Product deleted successfully')
            res.send(deletedProd)
        } catch (error) {
            logger.error(error)
            next(error)
        }
    }

    updateProduct = async (req,res) => {
        const {prodId} = req.params
        const updatedFields = req.body
        try {
            const updatedProd = await productsService.updateProductById(prodId, updatedFields)
            logger.debug('Product updated successfully')
            res.send(updatedProd)
        } catch (error) {
            logger.error(error)
            next(error)
        }
    }
}

export default new ProductsController()