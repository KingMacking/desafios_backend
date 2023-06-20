import { Router } from "express";
import cartsController from "../controllers/carts.controllers.js";
import isLogged from "../middlewares/isLogged.middleware.js";


const router = Router()

//Get cart by ID
router.get('/:cartId', cartsController.getCartById)

//Create cart
router.post('/', cartsController.createCart)

//Push product inside a cart
router.post('/:cartId/product/:prodId', isLogged, cartsController.addProductToCart)

router.post('/:cartId/purchase', isLogged, cartsController.purchase)

//Update product quantity inside a cart
router.put('/:cartId/products/:prodId', isLogged, cartsController.updateProductQuantity)

router.delete('/:cartId/products/:prodId', isLogged, cartsController.deleteProductFromCart)

router.delete('/:cartId', isLogged, cartsController.emptyCart)


export default router