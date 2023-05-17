export default class CartsServices {
    constructor(dao) {
        this.dao = dao
    }
    createCart = (cart) => {
        return this.dao.save(cart)
    }
    getCartById = (id) => {
        return this.dao.getById(id)
    }
    updateCartById = (id, prodId) => {
        return this.dao.updateById(id, prodId)
    }

    emptyCartById = (id) => {
        return this.dao.emptyById(id)
    }

    deleteProductById = (id, prodId) => {
        return this.dao.deleteItemById(id, prodId)
    }

    updateProductQuantityById = (id, prodId, quantity) => {
        return this.dao.updateQuantityById(id, prodId, quantity)
    }
}