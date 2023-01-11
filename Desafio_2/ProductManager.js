const fs = require('fs')

class ProductManager {
    constructor(){
        this.path = './Products.json'
    }

    async getProducts(){
        try {
            if (fs.existsSync(this.path)){
                const productsData = await fs.promises.readFile(this.path,'utf-8')
                const products = JSON.parse(productsData)
                return products
            } else {
                return []
            }
        } catch (error) {
            console.log(error)
        }
    }

    getProductById(productId){
        const product = this.#findProductById(productId)
        if(product) {
            return product
        } else {
            return "Not Found"
        }
    }

    async updateProduct(productId, updatedField){
        try {
            const products = await this.getProducts()
            const productIndex = await products.findIndex(product=> product.id === productId)
            products[productIndex] = {...products[productIndex], ...updatedField}
            await fs.promises.writeFile(this.path, JSON.stringify(products))
        } catch (error) {
            console.log("Producto no existente o no se pudo actualizar")
            console.log(error)
        }
    }

    async deleteProduct(productId){
        try {
            const products = await this.getProducts()
            const productIndex = await products.findIndex(product=> product.id === productId)
            await products.splice(productIndex, 1)
            await fs.promises.writeFile(this.path, JSON.stringify(products))
        } catch (error) {
            console.log("Producto no existente o no se pudo eliminar")
            console.log(error)
        }
    }

    async addProduct(product){
        try {
            const productsData = await this.getProducts()
            if(!product.title || !product.description || !product.price || !product.thumbnail || !product.code || !product.stock){
                console.log("Debes ingresar todos los campos")
            } else {
                if(await this.#evaluateCode(product.code)){
                    console.log("Codigo ya existente, no se pudo agregar el producto")
                } else {
                    await productsData.push({...product, id: await this.#generateId()})
                    await fs.promises.writeFile(this.path, JSON.stringify(productsData))
                }
            }
        } catch (error) {
            console.log(error)
        }
    }

    async #generateId(){
        try {
            let id = 1
            const products = await this.getProducts()
            if(products.length!==0){
                id = products[products.length-1].id + 1
            }
            return id
        } catch (error) {
            console.log(error)
        }
    }

    async #findProductById(productId){
        try {
            const products = await this.getProducts()
            return products.find(product=>product.id===productId)
        } catch (error) {
            console.log(error)
        }
    }

    async #evaluateCode(productCode){
        try {
            const products = await this.getProducts()
            return products.find(product=> product.code === productCode)
        } catch (error) {
            console.log(error)
        }
    }
}