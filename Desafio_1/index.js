class ProductManager {
    constructor(){
        this.products = []
    }

    getProducts(){
        return this.products
    }

    getProductById(productId){
        const product = this.#findProductById(productId)
        if(product) {
            return product
        } else {
            return "Not Found"
        }
    }

    addProduct(title, description, price, thumbnail, code, stock){
        const product = {
            id: this.#generateId(),
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        }
        if(!title || !description || !price || !thumbnail || !code || !stock){
            console.log("Debes ingresar todos los campos")
        } else {
            if(this.#evaluateCode(product.code)){
                console.log("Codigo ya existente, no se pudo agregar el producto")
            } else {
                this.products.push(product)
            }
        }
    }

    #generateId(){
        let id = 1
        if(this.products.length!==0){
            id = this.products[this.products.length-1].id + 1
        }
        return id
    }

    #findProductById(productId){
        return this.products.find(product=>product.id===productId)
    }

    #evaluateCode(productCode){
        return this.products.find(product=> product.code === productCode)
    }
}