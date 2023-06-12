import bcrypt from 'bcrypt'


export const hasher = async (data) => {
    return bcrypt.hash(data, 10)
}