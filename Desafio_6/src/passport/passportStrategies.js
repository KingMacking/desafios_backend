import passport from 'passport'
import { userModel } from '../dao/models/user.model.js';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as GithubStrategy } from 'passport-github2'
import { hasher, hasherCompare } from '../utils.js';

passport.use('register', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, email, password, done) =>{
    const user = await userModel.findOne({email: email})
    if(user){
        return done(null, false)
    }
    const hashedPassword = await hasher(password)
    const newUser = await userModel.create({...req.body, password: hashedPassword})
    done(null, newUser)
}))

passport.use('login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true,
},  async (req, email, password, done) => {
        const userExist = await userModel.findOne({email: email})
        if(userExist){
            const passwordMatch = await hasherCompare(password, userExist.password)
            if(passwordMatch){
                done(null, userExist)
            } else {
                done(null, false)
            }
        } else {
            done(null, false)
        }
    }
))

passport.use('githubAuth', new GithubStrategy({
    clientID: 'Iv1.76a07b39672d1276',
    clientSecret: 'e2d50eb5064ca0c740be3a8a3717977e5ca742eb',
    callbackURL: 'http://localhost:3000/users/github/callback',
}, async (accessToken, refreshToken, profile, done) =>{
    const user = await userModel.findOne({email: profile._json.email})
    if(!user){
        const userData = {
            name: profile._json.name.split(' ')[0],
            lastName: profile._json.name.split(' ')[1] || ' ',
            email: profile._json.email,
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