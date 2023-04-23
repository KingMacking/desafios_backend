import { productModel } from "../models/products.model.js";
import BasicDao from "./basic.dao.js";

class ProductsDao extends BasicDao{
    constructor(model){
        super(model)
    }

    getAll = async (userQuery, options) => {
        try {
            const products = await productModel.paginate(userQuery, options)
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
            if(!userQuery && !options){ 
                return await productModel.find()
            } else {
                return productsResponse
            }
        } catch (error) {
            return `Se ha producido un error: ${error}`
        }
    }


    updateById = async (id, updatedFields) => {
        try {
            await productModel.updateOne({_id: id},{
                $set: {
                    ...updatedFields
                }
            })
            return `Producto con el ID ${id} actualizado con exito`
        } catch (error) {
            return `Se ha producido un error: ${error}`
        }
    }
}

export default new ProductsDao(productModel)