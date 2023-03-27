import { Router } from "express";
import passport from "passport";

const router = Router()

router.post('/register', passport.authenticate('register', {
    failureRedirect: '/registerError',
    successRedirect: '/',
    passReqToCallback: true,
}))

router.post('/login', passport.authenticate('login'),(req,res) => {
    req.session.user = req.user
    res.redirect('/products')
})

router.get('/github/auth', passport.authenticate('githubAuth', {scope: [ 'user:email' ] }))
router.get('/github/callback', passport.authenticate('githubAuth'),(req,res) => {
    req.session.user = req.user
    res.redirect('/products')
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