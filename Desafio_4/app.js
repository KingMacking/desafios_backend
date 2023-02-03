import express from 'express'
import { Server } from 'socket.io'
import { __dirname } from './src/utils/utils.js'
import handlebars from "express-handlebars"
import viewsRouter from './src/routes/views.router.js'

const PORT = 8080
const app = express()
const server = app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`);
})
const io = new Server(server);
app.set('socketio', io)

//Handlebars config
app.engine('handlebars', handlebars.engine())
app.set('view engine', 'handlebars')
app.set('views', __dirname+'/../views')

io.on('connection', (socket) => {
    console.log(`user connected ${socket.id}`);
})

//Express uses
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(__dirname+'/public'))
app.use('/', viewsRouter)