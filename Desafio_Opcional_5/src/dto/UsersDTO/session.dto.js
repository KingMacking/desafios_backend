export default class SessionDTO {
    constructor(session){
        this.full_name = `${session.user?.first_name} ${session.user?.last_name}`
        this.email = session.user?.email
        this.cart = session.user?.cart
        this.role = session.user?.role
        this.age = session.user?.age
    }
}