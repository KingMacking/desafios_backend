export default class CustomError {
    static createCustomError({name='Error', cause,message}){
        const newError = new Error(message,{cause})
        newError.name = name
        throw newError
    }
}