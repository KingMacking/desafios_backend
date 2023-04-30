import bcrypt from 'bcrypt'


export const hasherCompare = async (data, hashedData) => {
    return bcrypt.compare(data, hashedData)
}