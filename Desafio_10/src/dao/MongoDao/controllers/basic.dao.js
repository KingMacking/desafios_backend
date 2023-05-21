import CustomError from "../../../utils/errors/customError.js"
import { ErrorsCause, ErrorsMessage, ErrorsName } from "../../../utils/errors/errors.enums.js"

export default class BasicDao {
    constructor(model){
        this.model = model
    }

    async save(obj){
        try {
            const response = await this.model.create(obj)
            return response
        } catch (error) {
            CustomError.createCustomError({
                name: ErrorsName.INVALID_DATA,
                cause: ErrorsCause.INVALID_DATA,
                message: ErrorsMessage.INVALID_DATA,
            })
        }
    }

    async getById(id){
        try {
            const response = await this.model.findOne({_id: id}).lean()
            if(response){
                return response
            } else {
                return "Not found"
            }
        } catch (error) {
            CustomError.createCustomError({
                name: ErrorsName.INVALID_ID,
                cause: ErrorsCause.INVALID_ID,
                message: ErrorsMessage.INVALID_ID,
            })
        }
    }

    async deleteById(id){
        try {
            const response = await this.model.deleteOne({_id: id})
            return response
        } catch (error) {
            CustomError.createCustomError({
                name: ErrorsName.INVALID_ID,
                cause: ErrorsCause.INVALID_ID,
                message: ErrorsMessage.INVALID_ID,
            })
        }
    }
}