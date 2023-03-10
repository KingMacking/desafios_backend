import { userModel } from "../../models/user.model.js";

export default class UserManager {
    async registerUser(user){
        const {email} = user
        try {
            const userAlreadyExist = await userModel.findOne({email: email})
            if (userAlreadyExist){
                return null
            } else {
                const newUser = await userModel.create(user)
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
            const userExist = await userModel.findOne({email: email, password: password})
            if(userExist){
                console.log(userExist);
                return userExist
            } else {
                return null
            }
        } catch (error) {
            console.log(error);
            throw new Error(error)
        }
    }
}