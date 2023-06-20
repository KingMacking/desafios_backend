import config from '../config/envConfig.js'
import CustomError from '../utils/errors/customError.js'
import { ErrorsName, ErrorsCause, ErrorsMessage } from '../utils/errors/errors.enums.js'


const isAdmin = (req,res,next) =>{
    if(req.body.password === config.adminPassword){
        next()
    } else {
        CustomError.createCustomError({
            name: ErrorsName.INVALID_ADMIN_PASSWORD,
            cause: ErrorsCause.INVALID_ADMIN_PASSWORD,
            message: ErrorsMessage.INVALID_ADMIN_PASSWORD,
        })
    }
}

export default isAdmin