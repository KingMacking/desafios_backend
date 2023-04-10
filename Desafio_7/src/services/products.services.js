export default class ProductsService {
    constructor(dao) {
        this.dao = dao
    }

    getAllProducts = (userQuery, options) => {
        return this.dao.getAll(userQuery, options)
    }
    getProductById = (id) => {
        return this.dao.getById(id)
    }
    saveProduct = (product) => {
        return this.dao.save(product)
    }
    deleteProductById = (id) => {
        return this.dao.deleteById(id)
    }
    updateProductById = (id, updatedFields) => {
        return this.dao.updateById(id, updatedFields)
    }
}