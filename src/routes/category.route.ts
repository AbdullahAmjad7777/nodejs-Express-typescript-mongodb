import { Router } from "express";
import {createCategory,getallcategory} from "../controllers/category.controller";
const router = Router();

router.post("/createcategory",createCategory);
router.get("/getallcategory",getallcategory);

export default router;
