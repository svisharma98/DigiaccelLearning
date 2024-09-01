import { Router } from 'express';
import authRoute from "./auth.route.js";
import testsRoute from "./tests.route.js";

const router = Router();
router.use("/auth", authRoute);
router.use("/tests", testsRoute);
export default router;