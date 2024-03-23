import mongoose from "mongoose";

interface category {
  name: string;
}

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
},
{timestamps:true}
);

const categoryModel = mongoose.model<category>("categories", categorySchema);

export default categoryModel;
