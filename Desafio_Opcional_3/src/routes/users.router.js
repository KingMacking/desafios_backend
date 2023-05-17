import { Router } from "express";
import passport from "passport";

import usersController from "../controllers/users.controller.js";
import isPremium from "../middlewares/isPremium.middleware.js";

const router = Router()

router.post('/register', passport.authenticate('register', {
    failureRedirect: '/registerError',
    successRedirect: '/',
    passReqToCallback: true,
}))

router.post('/login', passport.authenticate('login'), async (req,res) => {
    req.session.user = req.user
    res.redirect('/products')
})


router.get('/github/auth', passport.authenticate('githubAuth', {scope: [ 'user:email' ] }))
router.get('/github/callback', passport.authenticate('githubAuth'), async (req,res) => {
    req.session.user = req.user
    res.redirect('/products')
})

router.get('/logout', usersController.logut)

router.post('/resetpassword', usersController.resetPassword)

router.post('/premium/:userId', usersController.setPremium)

router.delete('/premium/:userId/products/:prodId', usersController.deleteOwnProduct)

router.post('/createNewPassword/:userId/:token', usersController.createNewPassword)
export default router