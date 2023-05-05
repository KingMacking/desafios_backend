import CustomError from "../../../utils/errors/customError.js";
import { ErrorsCause, ErrorsMessage, ErrorsName } from "../../../utils/errors/errors.enums.js";
import { cartModel } from "../models/carts.model.js";
import BasicDao from "./basic.dao.js";

class CartsDao extends BasicDao {
    constructor(model){
        super(model)
    }

    updateById = async (id, prodId) => {
        try {
            const cart = await this.getById(id)
            if(cart) {
                let result = await cartModel.findOne({_id: id, 'products._id': prodId})
                if(result === null){
                    await cartModel.updateOne({_id: id}, {
                        $push: {
                            products: {
                                _id: prodId,
                                quantity: 1,
                            }
                        }
                    }, {new: true})
                    return`Agregado el producto con ID ${prodId} al carrito con ID ${id}`
                } else {
                    await cartModel.updateOne({_id: id, 'products._id':prodId},{
                        $inc: {
                            'products.$.quantity': 1
                        }
                    },{new: true})
                    return `Aumentada en 1 la cantidad de producto con ID ${prodId} en el carrito con ID ${id}`
                }
            } else {
                return `Carrito con el ID ${id} no existente`
            }
        } catch (error) {
            CustomError.createCustomError({
                name: ErrorsName.INVALID_ID,
                cause: ErrorsCause.INVALID_ID,
                message: ErrorsMessage.INVALID_ID,
            })
        }
    }

    emptyById = async (id) => {
        try {
            const cart = await this.getById(id)
            if(cart){
                let emptyCart = await cartModel.updateOne({_id: id},{
                    $set: {
                        products: []
                    }
                })
                .then(() => {
                    return `El carrito con el ID ${id} ha sido vaciado`
                })
                .catch((error) => {
                    return `Se ha producido un error: ${error}`
                })
                return emptyCart
            } else {
                return `Carrito con el ID ${id} no existente`
            }
        } catch (error) {
            CustomError.createCustomError({
                name: ErrorsName.INVALID_CART_ID,
                cause: ErrorsCause.INVALID_CART_ID,
                message: ErrorsMessage.INVALID_CART_ID,
            })
        }
    }

    deleteItemById = async (id, prodId) => {
        try {
            const cart = await this.getById(id)
            if(cart){
                const updatedCart = await cartModel.updateOne({_id: id}, {
                    $pull: {
                        products: {
                            _id: prodId
                        }
                    }
                })
                .then(() => {
                    return `El producto con el ID ${prodId} ha sido eliminado del carrito con el ID ${id}`
                })
                .catch((error) => {
                    return `Se ha producido un error: ${error}`
                })
                return updatedCart
            }
        } catch (error) {
            CustomError.createCustomError({
                name: ErrorsName.INVALID_ID,
                cause: ErrorsCause.INVALID_ID,
                message: ErrorsMessage.INVALID_ID,
            })
        }
    }

    updateQuantityById = async (id, prodId, quantity) => {
        try {
            const cart = await this.getById(id)
            if(cart) {
                const updatedCart = await cartModel.updateOne({_id:id}, {
                    $set: {
                        'products.$.quantity': quantity
                    }
                },{new: true})
                .then(() => {
                    return `Cantidad del producto con ID ${prodId} actualizada a ${quantity} en el carrito con ID ${id}`
                }
                )
                .catch((error) => {
                    return `Se ha producido un error: ${error}`
                })
                return updatedCart
            } else {
                return `No existe un carrito con el ID ${id}`
            }
        } catch (error) {
            CustomError.createCustomError({
                name: ErrorsName.INVALID_ID,
                cause: ErrorsCause.INVALID_ID,
                message: ErrorsMessage.INVALID_ID,
            })
        }
    }
}

export default new CartsDao(cartModel)