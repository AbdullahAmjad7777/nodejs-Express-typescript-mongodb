import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userModel from "../model/user.model";

const createUser = async (req: Request, res: Response) => {
  try {
    const { user_name, email, password } = req.body;

    const existingEmail = await userModel.findOne({ email });
    if (existingEmail) {
      return res
        .status(400)
        .json({ message: "User with this email already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const savedUser = new userModel({
      user_name,
      email,
      password: hashedPassword,
    });

    await savedUser.save();
    return res.status(201).json({ message: "User registered successfully." ,savedUser});
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

const loginUser = async (req: Request, res: Response) => {
  try {
    const { user_name, password } = req.body;

    const existingUser = await userModel.findOne({ user_name });
    if (!existingUser) {
      return res.status(404).json({ message: "User not found." });
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    const token = jwt.sign({ id: existingUser.id }, process.env.JWT_SEC!, {
      expiresIn: "3d",
    });
    return res
      .status(200)
      .json({ message: "User logged in successfully.", token });
  } catch (error) {
    console.error("Error logging in user:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

export { createUser, loginUser };
