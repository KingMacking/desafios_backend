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
                    const updatedCart = await cartModel.updateOne({_id: id}, {
                        $push: {
                            products: {
                                _id: prodId,
                                quantity: 1,
                            }
                        }
                    }, {new: true})
                    return updatedCart
                } else {
                    const updatedCart = await cartModel.updateOne({_id: id, 'products._id':prodId},{
                        $inc: {
                            'products.$.quantity': 1
                        }
                    },{new: true})
                    return updatedCart
                }
            } else {
                return cart
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
                const emptyCart = await cartModel.updateOne({_id: id},{
                    $set: {
                        products: []
                    }
                })
                .catch((error) => {
                    return error
                })
                return emptyCart
            } else {
                return cart
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
                .catch((error) => {
                    return error
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
                    return updatedCart
                }
                )
                .catch((error) => {
                    return error
                })
                return updatedCart
            } else {
                return cart
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