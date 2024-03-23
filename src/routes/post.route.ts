import { Router } from "express";
import { createPost, updatePost,deletePost,getPostbyid,getAllpost} from "../controllers/post.controller";
const router = Router();

router.post("/createpost",createPost);
router.put("/updatepost/:id",updatePost);
router.delete("/deletepost/:id",deletePost);
router.get("/getpost/:id",getPostbyid);
router.get("/getallpost",getAllpost);

export default router;
