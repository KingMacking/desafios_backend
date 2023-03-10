import { Router } from "express";
import UserManager from "../dao/services/mongoManagers/UserManager.js";

const router = Router()
const userManager = new UserManager()

//Should be enviroment variable, this is only for testing
const admin = {
    email: "adminCoder@coder.com",
    password: "desafio5coder"
}

router.post('/register', async (req,res) => {
    const user = req.body
    try {
        const newUser = await userManager.registerUser(user)
        if(newUser){
            res.redirect('/')
        } else {
            res.redirect('/registerError')
        }
    } catch (error) {
        res.send(error)
    }
})

router.post('/login', async (req,res) => {
    const userData = req.body
    try {
        if(userData.email === admin.email && userData.password === admin.password){
            req.session.user = userData
            req.session.user.name = "Administrador"
            req.session.user.lastName = "Coderhouse"
            req.session.role = "admin"
            res.redirect('/products')
        } else {
            const user = await userManager.loginUser(userData)
            if(user){
                req.session.user = user
                req.session.role = "user"
                res.redirect('/products')
            } else {
                res.redirect('/loginError')
            }
        }
    } catch (error) {
        res.send(error)
    }
})

router.get('/logout', async (req,res) => {
    req.session.destroy(error => {
        if(error){
            console.log(error);
        } else {
            res.redirect('/')
        }
    })
})

export default router