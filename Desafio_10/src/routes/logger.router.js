import { Router } from "express";
import loggerController from "../controllers/logger.controller.js";

const router = Router()

router.get('/', loggerController.testAllLogs)

export default router