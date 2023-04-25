import SessionDTO from '../dto/UsersDTO/session.dto.js'


const isLogged = (req,res,next) =>{
    const session = new SessionDTO(req.session)
    const { role } = session
    if(role){
        next()
    } else {
        res.send('No autorizado')
    }
}

export default isLogged