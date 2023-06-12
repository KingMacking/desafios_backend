import ProductsServices from "./products.services.js";
import CartsServices from "./carts.services.js";
import TicketsService from "./tickets.services.js"
import ProductsDao from "../dao/MongoDao/controllers/products.dao.js";
import CartsDao from "../dao/MongoDao/controllers/carts.dao.js";
import TicketsDao from "../dao/MongoDao/controllers/tickets.dao.js";
import MocksService from "./mocks.services.js";
import MocksDao from "../dao/MocksDao/controllers/mocks.dao.js";

const productsService = new ProductsServices(ProductsDao)
const cartsService = new CartsServices(CartsDao)
const ticketsService = new TicketsService(TicketsDao)
const mocksService = new MocksService(MocksDao)

const services = {
    productsService,
    cartsService,
    ticketsService,
    mocksService
}

export default services

