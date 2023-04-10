import ProductsServices from "./products.services.js";
import CartsServices from "./carts.services.js";
import ProductsDao from "../dao/MongoDao/products.dao.js";
import CartsDao from "../dao/MongoDao/carts.dao.js";

let productsService = new ProductsServices(new ProductsDao())
let cartsService = new CartsServices(new CartsDao())

const services = {
    productsService,
    cartsService,
}

export default services

