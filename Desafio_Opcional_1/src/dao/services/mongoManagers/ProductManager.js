import { productModel } from "../../models/products.model.js"

export default class ProductManager {

    //Get all products
    async getProducts(){
        try {
            const products = await productModel.find()
            return products
        } catch (error) {
            return error
        }
    }

    //Get product by ID
    async getProductById(productId){
        try {
            const product = await productModel.findById(productId)
            return product
        } catch (error) {
            
        }
    }

    //Add product
    async addProduct(product){
        try {
            const newProduct = await productModel.create(product)
            return newProduct
        } catch (error) {
            return error
        }
    }
    
    //Update product by ID
    async updateProduct(productId, updatedFields){
        try {
            const updatedProduct = await productModel.updateOne({_id: productId},
                {
                    $set: {
                        ...updatedFields
                    }
                }
            )
            return updatedProduct
        } catch (error) {
            return error
        }
    }

    //Delete prduct by ID
    async deleteProduct(productId){
        try {
            const deletedProduct = await productModel.deleteOne({_id: productId})
            return deletedProduct
        } catch (error) {
            return error
        }
    }
}