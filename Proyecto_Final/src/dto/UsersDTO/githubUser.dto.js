export default class GithubUserDTO{
    constructor(user, cartId){
        this.first_name = user.name.split(' ')[0]
        this.last_name = user.name.split(' ').slice(1).join(' ')
        this.email = user.email
        this.password = ''
        this.role = 'user'
        this.cart = cartId
    }
}