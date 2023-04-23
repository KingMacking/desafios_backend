import config from '../config/envConfig.js'
import SessionDTO from '../dto/UsersDTO/session.dto.js'


const isAdmin = (req,res,next) =>{
    const session = new SessionDTO(req.session)
    const { role } = session
    if(role === 'admin' || req.body.password === config.adminPassword){
        next()
    } else {
        res.send('No autorizado')
    }
}

export default isAdmin