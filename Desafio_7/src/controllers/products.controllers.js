import services from '../services/index.js'

const { productsService } = services

const getProducts = async (req,res) => {
    
    const {limit=10, page=1, sort, ...query} = req.query
    const options = {
        limit: limit,
        page: page,
        sort: sort ? {price: sort} : {},
        lean: true
    }
    try {
        const products = await productsService.getAllProducts(query, options)
        const productsResponse = {
            status: "success",
            payload: products.docs,
            totalPages: products.totalPages,
            prevPage: products.prevPage,
            nextPage: products.nextPage,
            hasPrevPage: products.hasPrevPage,
            hasNextPage: products.hasNextPage,
            prevLink: products.prevPage ? `http://localhost:3000/api/products?page=${products.prevPage}` : null,
            nextLink: products.nextPage ? `http://localhost:3000/api/products?page=${products.nextPage}` : null,
        }
        res.send(productsResponse)
    } catch (error) {
        console.log("error");
        res.send(error)
    }
}

const getProductById = async (req,res) => {
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

const addProduct = async (req,res) => {
    const newProduct = req.body
    try {
        const product = await productsService.saveProduct(newProduct)
        res.send(product)
    } catch (error) {
        res.send(error)
    }
}

const deleteProduct = async (req,res) => {
    const {prodId} = req.params
    try {
        const deletedProd = await productsService.deleteProductById(prodId)
        res.send(deletedProd)
    } catch (error) {
        res.send(error)
    }
}

const updateProduct = async (req,res) => {
    const {prodId} = req.params
    const updatedFields = req.body
    try {
        const updatedProd = await productsService.updateProductById(prodId, updatedFields)
        res.send(updatedProd)
    } catch (error) {
        res.send(error)
    }
}

export default {
    getProductById,
    getProducts,
    deleteProduct,
    updateProduct,
    addProduct,
}