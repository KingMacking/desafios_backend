import { Router } from "express";
import cartsController from '../controllers/carts.controllers.js'


const router = Router()

//Get cart by ID
router.get('/:cartId', cartsController.getCartById)

//Create cart
router.post('/', cartsController.createCart)

//Push product inside a cart
router.post('/:cartId/product/:prodId', cartsController.addProductToCart)

//Update product quantity inside a cart
router.put('/:cartId/products/:prodId', cartsController.updateProductQuantity)

router.delete('/:cartId/products/:prodId', cartsController.deleteProductFromCart)

router.delete('/:cartId', cartsController.emptyCart)

export default router