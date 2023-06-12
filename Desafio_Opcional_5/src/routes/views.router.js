import { Router } from "express";
import viewsController from "../controllers/views.controllers.js";
import isLogged from "../middlewares/isLogged.middleware.js";
import isPremium from "../middlewares/isPremium.middleware.js";

const router = Router()

router.get('/products', isLogged, viewsController.getProducts)

router.get('/products/:prodId', isLogged, viewsController.getProductById)

router.get('/newProduct', isPremium, viewsController.createProduct)

router.get('/carts/:idCart', isLogged, viewsController.getCartById)

router.get('/', viewsController.login)

router.get('/register', viewsController.register)

router.get('/registerError', viewsController.registerError)

router.get('/loginError', viewsController.loginError)

router.get('/resetPassword', viewsController.resetPassword)

router.get('/createNewPassword/:userId/:token', viewsController.createNewPassword)

router.get('/profile', isLogged, viewsController.getProfile)

router.get('/uploadDocs', isLogged, viewsController.uploadDocs)

router.get('/purchaseEnded/:ticketId', viewsController.getTicketById)

export default router