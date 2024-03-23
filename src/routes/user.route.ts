import { Router } from "express";
import { updateUser,userDelete,getUserbyId } from "../controllers/user.controller";
const router = Router();

router.put("/Update/:id",updateUser);
router.delete("/Delete/:id",userDelete);
router.get("/findbyid/:id",getUserbyId);


export default router;
