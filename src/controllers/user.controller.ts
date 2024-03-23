import { Request, Response } from "express";
import bcrypt from "bcrypt";
import userModel from "../model/user.model";
import postModel from "../model/post.model";
const updateUser = async (req: Request, res: Response) => {
  try {
    const { user_id } = req.body;
    const { id } = req.params;

    // Ensure that the user is updating their own profile
    if (user_id !== id) {
      return res
        .status(403)
        .json({
          message: "Unauthorized: You cannot update another user's profile.",
        });
    }

    // Hash the password if provided
    if (req.body.password) {
      req.body.password = await bcrypt.hash(req.body.password, 10);
    }

    // Find and update the user
    const updatedUser = await userModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found." });
    }

    return res.status(200).json({
      message: "User updated successfully.",
      updatedUser,
    });
  } catch (error) {
    console.error("Error updating user:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};


const userDelete = async (req:Request, res:Response) => {
  try {
    const user = await userModel.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    if (req.body.user_id === req.params.id) {
      await postModel.deleteMany({ user_name: user.user_name });
      await userModel.findByIdAndDelete(req.params.id);
      return res.status(200).json({ message: "User and associated posts deleted successfully." });
    } else {
      return res.status(403).json({ message: "User ID in request body does not match URL." });
    }
  } catch (error) {
    console.error("Error deleting user:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

const getUserbyId = async(req:Request,res:Response)=>{
  try {
    const user = await userModel.findById(req.params.id)
    if(!user){
      return res.status(401).json({
        message:"user not found"
      })
    }
    return res.status(201).json({user})
  } catch (error) {
    return res.status(401).json({error})
  }
}


export { updateUser ,userDelete,getUserbyId};
