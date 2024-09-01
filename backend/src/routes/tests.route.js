import { Router } from 'express';
const router = Router();

import { verifyToken } from '../utils/auth.js';
import { startTest, nextQuestion } from "../controller/test.ctrl.js";

router.get("/start-test", verifyToken, startTest);
router.get("/next-question", verifyToken, nextQuestion);

export default router;