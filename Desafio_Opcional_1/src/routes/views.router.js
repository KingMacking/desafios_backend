import { Router } from "express";
import MessageManager from "../dao/services/mongoManagers/MessageManager.js";
import { uploader } from "../utils.js";

const messageManager = new MessageManager()

const router = Router()

router.get('/', (req,res) => {
    res.render('chat')
})

router.post('/messages', uploader.none(), async (req,res) => {
    const data = req.body
    try {
        const message = await messageManager.sendMessage(data)
        res.send(message)
    } catch (error) {
        res.send(error)
    }
})

router.get('/messages', async (req,res) => {
    try {
        const messages = await messageManager.getMessages()
        res.send(messages)
    } catch (error) {
        res.send(error)
    }
})

export default router