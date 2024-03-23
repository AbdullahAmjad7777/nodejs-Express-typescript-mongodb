import mongoose from "mongoose";

interface Post {
  title: string;
  desc:string;
  photo:string;
  user_name:string
  categories: any[];
}

const PostSchema = new mongoose.Schema({
  title: { type: String, required: true,unique:true},
  desc: { type: String, required: true},
  photo: { type: String, required: false},
  user_name: { type: String, required: true},
  categories: { type: Array, required: false},
},
{timestamps:true}
);

const postModel = mongoose.model<Post>("posts", PostSchema);


export default postModel;
export {Post}
