import { Router } from "express";

const router = Router()

router.get('/current', async (req,res) =>{
    try {
        const currentUser = await req.session.user
        res.send(currentUser)
    } catch (error) {
        res.send(error)
    }
})

export default router