import nodemailer from 'nodemailer'
import config from './envConfig.js'
import compliler from 'nodemailer-express-handlebars'
import { __dirname } from '../__dirname.js'

export const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: config.gmailUser,
        pass: config.gmailPassword,
    }
})

transporter.use('compile', compliler({
    viewEngine: {
        extname: '.handlebars',
        layoutsDir: __dirname+'/views/layouts',
        defaultLayout: false,
        partialsDir: __dirname+'/views'
    },
    viewPath: __dirname+'/views',
    extName: '.handlebars'
}))