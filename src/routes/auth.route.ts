import { Router } from "express";
import { createUser, loginUser } from "../controllers/auth.controller";
const router = Router();

router.post("/Register",createUser);
router.post("/Login",loginUser);

export default router;
