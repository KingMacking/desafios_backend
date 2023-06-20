import fs from 'fs'
import crypto from 'crypto'

import { userModel } from "../dao/MongoDao/models/user.model.js";
import { tokenModel } from "../dao/MongoDao/models/tokens.model.js";
import logger from "../utils/winston/winston.js"
import { transporter } from "../config/nodemailerConfig.js";
import { hasher } from "../utils/hasher.js";
import { hasherCompare } from "../utils/hasherCompare.js";

import { productModel } from "../dao/MongoDao/models/products.model.js";
import CustomError from '../utils/errors/customError.js';
import { ErrorsCause, ErrorsMessage, ErrorsName } from '../utils/errors/errors.enums.js';
import UserInfo from '../dto/UsersDTO/userInfo.dto.js';

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
        const user = await userModel.findById(req.session.user._id)
        user.last_connection = Date.now()
        await user.save()
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
            const canGetPremium = () => {
                const id = user.documents.some(doc => doc.docType === "id")
                const account = user.documents.some(doc => doc.docType === "account")
                const adress = user.documents.some(doc => doc.docType === "adress")

                if (id && adress && account) {
                    return true
                } else {
                    return false
                }
            }
            const updatedRole = user.role === "user" ? "premium" : "user"
            if(user.role === "premium") {
                const result = await userModel.updateOne({_id: userId}, {
                    $set: {
                        role: updatedRole
                    }
                })
                res.send(result)
            } else if(canGetPremium() && user.role === "user"){
                const result = await userModel.updateOne({_id: userId}, {
                    $set: {
                        role: updatedRole
                    }
                })
                res.send(result)
            } else {
                CustomError.createCustomError({
                    name: ErrorsName.DOCUMENTS_ERROR,
                    cause: ErrorsCause.DOCUMENTS_ERROR,
                    message: ErrorsMessage.DOCUMENTS_ERROR,
                })
            }
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

    uploadDocument = async (req,res,next) => {
        try {
            const file = req.file
            const uploadType = req.body.uploadType
            let folder
            if(uploadType === "id" || uploadType === "account" || uploadType === "adress"){
                folder = "documents"
            } else {
                folder = uploadType
            }
            if(file){
                fs.renameSync(file.path, file.destination+'/'+folder+'/'+req.session.user._id+'-'+uploadType+'-'+file.originalname)
            }
            const document = {
                name: req.session.user._id+'-'+uploadType+'-'+file.originalname,
                reference: file.destination+'/'+folder,
                docType: uploadType,
            }
            const user = await userModel.findById(req.session.user._id)
            if(file && user){
                user.documents.push(document)
                await user.save()
            }
            res.send(document)
        } catch (error) {
            next(error)
        }
    }

    getAllUsers = async (req,res,next) => {
        try {
            const result = await userModel.find()
            const users = result.map(user => user = new UserInfo(user))
            res.send(users)
        } catch (error) {
            next(error)
        }
    }

    deleteInactiveUsers = async (req,res,next) => {
        try {
            const currentDate = new Date()
            const twoDaysAgo = new Date()
            twoDaysAgo.setDate(currentDate.getDate()-2)

            const inactiveUsers = await userModel.find({last_connection: {$lt: twoDaysAgo}})
            await userModel.deleteMany({last_connection: {$lt: twoDaysAgo}})
            inactiveUsers.forEach(user => {
                transporter.sendMail({
                    from: 'eCommerce',
                    to: user.email,
                    subject: "Cuenta eliminada por inactividad",
                    template: 'accountDeleted',
                })
            })
            res.send(`Se han eliminado ${inactiveUsers.length} usuarios inactivos`)
        } catch (error) {
            next(error)
        }
    }

    deleteUser = async (req,res,next) => {
        try {
            const {userId} = req.params
            await userModel.deleteOne({_id: userId})
            res.send("Usuario eliminado con exito")
        } catch (error) {
            next(error)
        }
    }
}

export default new UsersController