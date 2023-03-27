import { userModel } from "../../models/user.model.js";
import { hasher, hasherCompare } from "../../../utils.js";

export default class UserManager {
    async registerUser(user){
        const {email, password} = user
        const hashedPassword = await hasher(password)
        try {
            const userAlreadyExist = await userModel.findOne({email: email})
            if (userAlreadyExist){
                return null
            } else {
                const newUser = await userModel.create({...user, password: hashedPassword})
                return newUser
            }
        } catch (error) {
            console.log(error);
            throw new Error(error)
        }
    }

    async loginUser(user){
        const {email, password} = user
        try {
            const userExist = await userModel.findOne({email: email})
            if(userExist){
                console.log(userExist);
                const passwordMatch = await hasherCompare(password, userExist.password)
                if(passwordMatch){
                    return userExist
                }
            } else {
                return null
            }
        } catch (error) {
            console.log(error);
            throw new Error(error)
        }
    }

    async getAll(){
        try {
            const users = await userModel.find().populate('cart')
            return users
        } catch (error) {
            return error
        }
    }

    async getOneById(userId){
        try {
            const user = await userModel.findOne({_id: userId}).populate('cart')
            return user
        } catch (error) {
            return error
        }
    }

    async updateOne(userId, updatedInfo){
        try {
            const updatedUser = await userModel.updateOne({_id: userId}, {$set: updatedInfo})
            return updatedUser
        } catch (error) {
            return error
        }
    }

    async deleteOne(userId){
        try {
            const deletedUser = await userModel.deleteOne({_id: userId})
            return deletedUser
        } catch (error) {
            return error
        }
    }
}