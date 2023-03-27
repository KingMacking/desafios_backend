import express from 'express'
import { Server } from 'socket.io'

import handlebars from 'express-handlebars'
import session from 'express-session'
import mongoStore from 'connect-mongo'
import cookieParser from 'cookie-parser'
import passport from 'passport'

import { __dirname } from './utils.js'
import productsRouter from './routes/products.router.js'
import viewsRouter from './routes/views.router.js'
import cartsRouter from './routes/carts.router.js'
import usersRouter from './routes/users.router.js'
import sessionRouter from './routes/sessions.router.js'

//Connect to mongo
import './dao/dbConfig.js'

//Passport strategies functions
import './passport/passportStrategies.js'

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.use(session({
    secret: 'kingmacking',
    resave: false,
    saveUninitialized: false,
    store: new mongoStore({
        mongoUrl: "mongodb+srv://matiasatzori:Mack27659870@cluster0.gq5ntlp.mongodb.net/ecommerce?retryWrites=true&w=majority"
    })
}))
app.use(passport.initialize())
app.use(passport.session())

//Root public dir
app.use(express.static(__dirname + '/public'))

//Routes
app.use('/api/products', productsRouter)
app.use('/api/carts', cartsRouter)
app.use('/api/sessions', sessionRouter)
app.use('/users', usersRouter)
app.use('/', viewsRouter)

//Template engine config
app.engine('handlebars', handlebars.engine())
app.set('view engine', 'handlebars')
app.set('views', __dirname+'/views')

//Port definition
const PORT = process.env.PORT || 3000

const httpServer = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})

const socketServer = new Server(httpServer)

socketServer.on('connection', socket => {
    console.log(`Usuario conectado con el ID ${socket.id}`)
})