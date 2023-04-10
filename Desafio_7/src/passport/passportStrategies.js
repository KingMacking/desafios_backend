import passport from 'passport'
import { userModel } from '../dao/MongoDao/models/user.model.js';
import { cartModel } from '../dao/MongoDao/models/carts.model.js';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as GithubStrategy } from 'passport-github2'

import { hasher, hasherCompare } from '../utils.js';
import envConfig from '../config/envConfig.js';

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
        const userCart = await cartModel.create({products: []})
        const newUserData = {...req.body, password: hashedPassword, cart: userCart._id}
        const newUser = await userModel.create(newUserData)
        done(null, newUser)
    } catch (error) {
        done(error)
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
            } else {
                console.log(userExist);
                const passwordMatch = await hasherCompare(password, userExist.password)
                if (!passwordMatch) return done(null, false)
                done(null, userExist)
            }
        } catch (error) {
            done(error)
        }
    }
))

passport.use('githubAuth', new GithubStrategy({
    clientID: envConfig.githubClientId,
    clientSecret: envConfig.githubClientSecret,
    callbackURL: 'http://localhost:3000/users/github/callback',
}, async (accessToken, refreshToken, profile, done) =>{
    const user = await userModel.findOne({email: profile._json.email})
    const userCart = await cartModel.create({products: []})
    if(!user){
        const userData = {
            first_name: profile._json.name.split(' ')[0],
            last_name: profile._json.name.split(' ')[1] || ' ',
            email: profile._json.email,
            cart: userCart._id,
            password: " ",
        }
        const newUser = await userModel.create(userData)
        done(null, newUser)
    } else {
        done(null, user)
    }
}))


passport.serializeUser((user, done) => {
    done(null, user._id);
})

passport.deserializeUser(async (id, done) => {
    const user = await userModel.findOne({_id: id})
    done(null, user)
})