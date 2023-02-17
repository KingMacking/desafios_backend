import express from 'express'
import { Server } from 'socket.io'
import handlebars from 'express-handlebars'
import { __dirname } from './utils.js'
import productsRouter from './routes/products.router.js'
import viewsRouter from './routes/views.router.js'
import cartsRouter from './routes/carts.router.js'

//Connect to mongo
import './dao/dbConfig.js'

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))

//Root public dir
app.use(express.static(__dirname + '/public'))

//Routes
app.use('/products', productsRouter)
app.use('/carts', cartsRouter)
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
    socket.emit('fetchMessages')
    socket.on('newMessage', ()=>{
        socket.emit('fetchMessages')
    })
})