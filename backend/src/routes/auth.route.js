import { Router } from 'express';
const router = Router();
import { validate, registerSchema } from './validateSchema.js';
import { login, register } from "../controller/auth.ctrl.js";

router.post("/login", login);
router.post("/register", validate(registerSchema), register);

export default router;