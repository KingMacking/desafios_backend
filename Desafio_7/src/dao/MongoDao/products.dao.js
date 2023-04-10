import { productModel } from "./models/products.model.js";

export default class ProductsDao{
    constructor(){}

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
            return productsResponse
        } catch (error) {
            return `Se ha producido un error: ${error}`
        }
    }

    save = async (product) => {
        try {
            await productModel.create(product)
            return "Producto creado con exito"
        } catch (error) {
            return `Se ha producido un error: ${error}`
        }
    }

    getById = async (id) => {
        try {
            let result = await productModel.findById(id).lean(true)
            return result
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

    deleteById = async (id) => {
        try {
            await productModel.deleteOne({_id: id})
            return `Producto con el ID ${id} eliminado con exito`
        } catch (error) {
            return `Se ha producido un error: ${error}`
        }
    }
}