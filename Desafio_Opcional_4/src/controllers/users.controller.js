import { userModel } from "../dao/MongoDao/models/user.model.js";
import { tokenModel } from "../dao/MongoDao/models/tokens.model.js";
import logger from "../utils/winston/winston.js"
import { transporter } from "../config/nodemailerConfig.js";
import { hasher } from "../utils/hasher.js";
import { hasherCompare } from "../utils/hasherCompare.js";

import crypto from 'crypto'
import { productModel } from "../dao/MongoDao/models/products.model.js";

class UsersController {
    resetPassword = async (req,res,next) => {
        try {
            const {email} = req.body
            const user = await userModel.findOne({email: email})
            if(!user) return logger.error('User with given email not found')

            let token = await tokenModel.findOne({userId: user._id})
            if(!token){
                token = await new tokenModel({
                    userId: user._id,
                    token: crypto.randomBytes(32).toString('hex')
                }).save()
            }

            const link = `http://localhost:3000/createNewPassword/${user._id}/${token.token}`
            transporter.sendMail({
                from: 'eCommerce',
                to: user.email,
                subject: 'Password reset',
                template: 'emailPasswordReset',
                context: {
                    link: link
                }
            })
            res.send('Enalce de reseteo de contraseña enviado a tu email')
        } catch (error) {
            next(error)
        }
    }

    logut = async (req,res) => {
        req.session.destroy(error => {
            if(error){
                console.log(error);
            } else {
                res.redirect('/')
            }
        })
    }

    createNewPassword = async (req,res, next) => {
        try {
            const {userId, token} = req.params
            logger.debug(userId)
            logger.debug(token)
            const {password} = req.body
            console.log(password);
            const user = await userModel.findById(userId)

            if(!user) return logger.error('User with given email not found')

            const tokenDB = await tokenModel.findOne({
                userId: user._id,
                token: token
            })

            if(!tokenDB) return logger.error('Invalid or expired token')

            const passwordMatch = await hasherCompare(password, user.password)
            if(passwordMatch){
                res.send('La contraseña debe ser distinta a la que ya tenias')
            } else {
                user.password = await hasher(password)
                await user.save()
                await tokenModel.deleteOne({token: token})
                res.send('Contraseña reseteada')
            }
        } catch (error) {
            next(error)
        }
    }

    setPremium = async (req,res, next) => {
        try {
            const {userId} = req.params
            const user = await userModel.findById(userId)
            const updatedRole = user.role === "user" ? "premium" : "user"
            const result = await userModel.updateOne({_id: userId}, {
                $set: {
                    role: updatedRole
                }
            })
            res.send(result)
        } catch (error) {
            next(error)
        }
    }

    deleteOwnProduct = async (req,res,next) => {
        try {
            const {prodId} = req.params
            const result = await productModel.deleteOne({_id: prodId})
            res.send(result)
        } catch (error) {
            next(error)
        }
    }
}

export default new UsersController