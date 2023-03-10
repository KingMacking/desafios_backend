import fs from 'fs'

export default class ProductManager {
    constructor(path){
        this.path = path
    }

    //Get all products
    async getProducts(){
        try {
            if (fs.existsSync(this.path)){
                try {
                    const productsData = await fs.promises.readFile(this.path,'utf-8')
                    const products = JSON.parse(productsData)
                    return products
                } catch (error) {
                    return error
                }
            } else {
                return []
            }
        } catch (error) {
            console.log(error)
        }
    }

    //Get product by ID
    async getProductById(productId){
        const product = await this.#findProductById(productId)
        if(product) {
            return ("Producto encontrado:" + product)
        } else {
            return null
        }
    }

    //Update product by ID
    async updateProduct(productId, updatedFields){
        try {
            const products = await this.getProducts()
            if(await this.getProductById(productId)){
                const productIndex = await products.findIndex(product=> product.id === productId)
                products[productIndex] = {...products[productIndex], ...updatedFields}
                await fs.promises.writeFile(this.path, JSON.stringify(products))
                return ("Producto actualizado con exito" + products[productIndex])
            }
        } catch (error) {
            console.log(error)
        }
    }

    //Add product
    async addProduct(product){
        try {
            const productsData = await this.getProducts()
            if(await this.#evaluateCode(product.code)){
                return `Codigo ${product.code} ya existente, no se pudo agregar el producto`
            } else {
                let id = productsData.length === 0 ? 1 : productsData[productsData.length-1].id + 1
                productsData.push({...product, id})
                await fs.promises.writeFile(this.path, JSON.stringify(productsData))
                return `Producto agregado con exito con el ID ${id}`
            }
        } catch (error) {
            return error
        }
    }

    //Delete prduct by ID
    async deleteProduct(productId){
        try {
            const products = await this.getProducts()
            const productIndex = products.findIndex(product=> product.id === productId)
            console.log(productIndex);
            if (productIndex && productIndex !== -1) {
                products.splice(productIndex, 1)
                await fs.promises.writeFile(this.path, JSON.stringify(products))
                return `Producto con el ID ${products[productIndex].id} eliminado correctamente`
            } else {
                return "ID no encontrado"
            }
        } catch (error) {
            console.log(error);
        }
    }


    //Find product by given ID
    async #findProductById(productId){
        try {
            const products = await this.getProducts()
            return products.find(product=>product.id===productId)
        } catch (error) {
            console.log(error)
        }
    }

    //Evaluate if any product has the code
    async #evaluateCode(productCode){
        try {
            const products = await this.getProducts()
            return products.find(product=> product.code === productCode)
        } catch (error) {
            console.log(error)
        }
    }
}