import { Router } from "express";
import productsController from "../controllers/products.controllers.js";
import isAdmin from "../middlewares/isAdmin.middleware.js";

const router = Router()

// Get all products or limited products
router.get('/', productsController.getProducts)

//Get product by ID
router.get('/:prodId', productsController.getProductById)

//Add product
router.post('/', isAdmin, productsController.addProduct)

//Delete product by ID
router.delete('/:prodId', isAdmin, productsController.deleteProduct)

//Update product by ID
router.put('/:prodId', isAdmin, productsController.updateProduct)

export default router