import { Router } from "express";
import mocksControllers from "../controllers/mocks.controllers.js";

const router = Router()

router.get('/mockingproducts', mocksControllers.getFakeProducts)

export default router