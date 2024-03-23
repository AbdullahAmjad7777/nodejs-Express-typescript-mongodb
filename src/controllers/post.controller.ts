import { Request, Response } from "express";
import postModel from "../model/post.model";
// import { Post } from "../model/post.model";



const createPost = async (req: Request, res: Response) => {
  try {
    const post = new postModel(req.body);
    const savedPost = await post.save();
    return res.status(201).json({ savedPost });
  } catch (error) {
    return res.status(500).json({ error });
  }
};



const updatePost = async (req: Request, res: Response) => {
  try {
    const post = await postModel.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    if (post.user_name === req.body.user_name) {
      const updatedPost = await postModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      return res.status(200).json({ updatedPost });
    } else {
      return res
        .status(403)
        .json({
          message: "User name in request body does not match post's user name.",
        });
    }
  } catch (error) {
    return res.status(500).json({ error });
  }
};


const deletePost = async (req: Request, res: Response) => {
    try {
        const post = await postModel.findById(req.params.id);
        if (!post) {
            return res.status(404).json({
                message: "Post not found"
            });
        }
        if (post.user_name === req.body.user_name) {
            await postModel.findByIdAndDelete(req.params.id);
            return res.status(200).json({
                message: "Post deleted successfully"
            });
        } else {
            return res.status(403).json({
                message: "Unauthorized: You don't have permission to delete this post"
            });
        }
    } catch (error) {
        return res.status(500).json({
            error
        });
    }
};


const getPostbyid = async(req:Request,res:Response)=>{
    try {
        const post  = await postModel.findById(req.params.id)
        if(!post){
            return res.status(401).json({
                message:"post not found"
            })
        }
        return res.status(201).json({post})
    } catch (error) {
        return res.status(201).json({error})
    }
}
 

const getAllpost = async (req: Request, res: Response) => {
    const username = req.query.user as string; // Ensure username is treated as string
    const catname = req.query.cat as string; // Ensure catname is treated as string
    try {
        let posts;
        if (username) {
            posts = await postModel.find({ user_name: username });
        } else if (catname) {
            posts = await postModel.find({ categories: { $in: [catname] } });
        } else {
            posts = await postModel.find();
        }
        return res.status(200).json({ posts, count: posts.length }); // Changed status to 200 and corrected count
    } catch (error) {
        return res.status(500).json({ error }); // Changed status to 500 for internal server error
    }
};


export { createPost, updatePost ,deletePost,getPostbyid,getAllpost};
