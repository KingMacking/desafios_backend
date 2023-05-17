import { Router } from "express";
import sessionController from "../controllers/session.controller.js";

const router = Router()

router.get('/current', sessionController.getCurrenSessionUser)

export default router