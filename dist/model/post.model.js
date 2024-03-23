"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const PostSchema = new mongoose_1.default.Schema({
    title: { type: String, required: true, unique: true },
    desc: { type: String, required: true },
    photo: { type: String, required: false },
    user_name: { type: String, required: true },
    categories: { type: Array, required: false },
}, { timestamps: true });
const postModel = mongoose_1.default.model("posts", PostSchema);
exports.default = postModel;
