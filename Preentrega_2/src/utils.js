import {dirname} from 'path'
import { fileURLToPath } from 'url'
import multer from 'multer'

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