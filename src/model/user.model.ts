import mongoose from "mongoose";

interface User {
  user_name: string;
  email:string;
  password:string
  profile_pic:string
}

const userSchema = new mongoose.Schema({
    user_name: { type: String, required: true,unique:true},
    email: { type: String, required: true,unique:true},
    password: { type: String, required: true},
    profile_pic: { type: String, default:""},
},
{timestamps:true}
);

const userModel = mongoose.model<User>("users", userSchema);

export default userModel;
