import SessionDTO from '../dto/UsersDTO/session.dto.js'
import CustomError from '../utils/errors/customError.js'
import { ErrorsCause, ErrorsMessage, ErrorsName } from '../utils/errors/errors.enums.js'


const isPremium = (req,res,next) =>{
    const session = new SessionDTO(req.session)
    const { role } = session
    if(role === 'premium'){
        next()
    } else {
        CustomError.createCustomError({
            name: ErrorsName.INVALID_ROLE,
            cause: ErrorsCause.INVALID_ROLE,
            message: ErrorsMessage.INVALID_ROLE,
        })
    }
}

export default isPremium