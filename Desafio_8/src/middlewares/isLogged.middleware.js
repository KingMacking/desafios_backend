import SessionDTO from '../dto/UsersDTO/session.dto.js'
import CustomError from '../utils/errors/customError.js'
import { ErrorsCause, ErrorsMessage, ErrorsName } from '../utils/errors/errors.enums.js'


const isLogged = (req,res,next) =>{
    const session = new SessionDTO(req.session)
    const { role } = session
    if(role){
        next()
    } else {
        CustomError.createCustomError({
            name: ErrorsName.INVALID_SESSION,
            cause: ErrorsCause.INVALID_SESSION,
            message: ErrorsMessage.INVALID_SESSION,
        })
    }
}

export default isLogged