import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as GithubStrategy } from 'passport-github2'
import passport from 'passport'

import { userModel } from '../dao/MongoDao/models/user.model.js';
import { cartModel } from '../dao/MongoDao/models/carts.model.js';

import { hasher } from '../utils/hasher.js';
import { hasherCompare } from '../utils/hasherCompare.js';
import envConfig from '../config/envConfig.js';
import GithubUserDTO from '../dto/UsersDTO/githubUser.dto.js';
import NewCartDTO from '../dto/CartsDTO/newCart.dto.js';
import logger from '../utils/winston/winston.js';

passport.use('register', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, email, password, done) =>{
    try {
        const user = await userModel.findOne({email: email})
        const {first_name, last_name, age} = req.body
        if (!first_name || !last_name || !age || !email || !password) {
            return done(null, false)
        }
        if(user){
            return done(null, false)
        }
        const hashedPassword = await hasher(password)
        const cart = new NewCartDTO()
        const userCart = await cartModel.create(cart)
        const newUserData = {...req.body, password: hashedPassword, cart: userCart._id}
        const newUser = await userModel.create(newUserData)
        done(null, newUser)
        logger.info('User registered')
    } catch (error) {
        done(error)
        logger.error(error)
    }
}))

passport.use('login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true,
},  async (req, email, password, done) => {
        try {
            const userExist = await userModel.findOne({email: email})
            if(!userExist){
                done(null, false)
                logger.error('User not exist')
            } else {
                console.log(userExist);
                const passwordMatch = await hasherCompare(password, userExist.password)
                if (!passwordMatch) return done(null, false)
                done(null, userExist)
                logger.info('Logged successfully')
            }
        } catch (error) {
            done(error)
            logger.error(error)
        }
    }
))

passport.use('githubAuth', new GithubStrategy({
    clientID: envConfig.githubClientId,
    clientSecret: envConfig.githubClientSecret,
    callbackURL: 'http://localhost:3000/users/github/callback',
}, async (accessToken, refreshToken, profile, done) =>{
    const {name, email} = profile._json
    const user = await userModel.findOne({email: email})
    if(!user){
        const cart = new NewCartDTO()
        const userCart = await cartModel.create(cart)
        const userData = new GithubUserDTO({name, email}, userCart)
        const newUser = await userModel.create(userData)
        done(null, newUser)
        logger.info('Registered successfully')
    } else {
        done(null, user)
        logger.info('Logged successfully')
    }
}))


passport.serializeUser((user, done) => {
    done(null, user._id);
})

passport.deserializeUser(async (id, done) => {
    const user = await userModel.findOne({_id: id})
    done(null, user)
})