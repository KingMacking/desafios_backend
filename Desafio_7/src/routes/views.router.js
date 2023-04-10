import { Router } from "express";
import viewsController from "../controllers/views.controllers.js";

const router = Router()

router.get('/home', async (req,res) => {
    try {
        res.render('home', {
            cart: req.session.user.cart
        })
    } catch (error) {
        res.send(error)
    }
})

router.get('/products',viewsController.getProducts)

router.get('/products/:prodId', viewsController.getProductById)

router.get('/carts/:idCart', viewsController.getCartById)

router.get('/', (req,res) => {
    try {
        res.render('login')
    } catch (error) {
        res.send(error)
    }
})

router.get('/register', (req,res) => {
    try {
        res.render('register')
    } catch (error) {
        res.send(error)
    }
})

router.get('/registerError', (req,res) => {
    try {
        res.render('registerError')
    } catch (error) {
        res.send(error)
    }
})

router.get('/loginError', (req,res) => {
    try {
        res.render('loginError')
    } catch (error) {
        res.send(error)
    }
})

router.get('/profile', (req,res) => {
    try {
        if(req.session.user){
            const {first_name, last_name, email, role, age, cart} = req.session.user
            res.render('profile', {
                first_name: first_name,
                last_name: last_name,
                email: email,
                age: age,
                cart: cart,
                role: role
            })
        } else {
            res.redirect('/')
        }
    } catch (error) {
        res.send(error)
    }
})


export default router