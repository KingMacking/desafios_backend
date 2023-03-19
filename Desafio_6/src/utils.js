import {dirname} from 'path'
import { fileURLToPath } from 'url'
import multer from 'multer'
import bcrypt from 'bcrypt'

export const __dirname = dirname(fileURLToPath(import.meta.url))

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'src/public/images')
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
})

export const uploader = multer({ storage: storage });

export const hasher = async (text) => {
    return bcrypt.hash(text, 10)
}

export const hasherCompare = async (text, hashedText) => {
    return bcrypt.compare(text, hashedText)
}