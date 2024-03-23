"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllpost = exports.getPostbyid = exports.deletePost = exports.updatePost = exports.createPost = void 0;
const post_model_1 = __importDefault(require("../model/post.model"));
// import { Post } from "../model/post.model";
const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post = new post_model_1.default(req.body);
        const savedPost = yield post.save();
        return res.status(201).json({ savedPost });
    }
    catch (error) {
        return res.status(500).json({ error });
    }
});
exports.createPost = createPost;
const updatePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post = yield post_model_1.default.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }
        if (post.user_name === req.body.user_name) {
            const updatedPost = yield post_model_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true });
            return res.status(200).json({ updatedPost });
        }
        else {
            return res
                .status(403)
                .json({
                message: "User name in request body does not match post's user name.",
            });
        }
    }
    catch (error) {
        return res.status(500).json({ error });
    }
});
exports.updatePost = updatePost;
const deletePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post = yield post_model_1.default.findById(req.params.id);
        if (!post) {
            return res.status(404).json({
                message: "Post not found"
            });
        }
        if (post.user_name === req.body.user_name) {
            yield post_model_1.default.findByIdAndDelete(req.params.id);
            return res.status(200).json({
                message: "Post deleted successfully"
            });
        }
        else {
            return res.status(403).json({
                message: "Unauthorized: You don't have permission to delete this post"
            });
        }
    }
    catch (error) {
        return res.status(500).json({
            error
        });
    }
});
exports.deletePost = deletePost;
const getPostbyid = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post = yield post_model_1.default.findById(req.params.id);
        if (!post) {
            return res.status(401).json({
                message: "post not found"
            });
        }
        return res.status(201).json({ post });
    }
    catch (error) {
        return res.status(201).json({ error });
    }
});
exports.getPostbyid = getPostbyid;
const getAllpost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const username = req.query.user; // Ensure username is treated as string
    const catname = req.query.cat; // Ensure catname is treated as string
    try {
        let posts;
        if (username) {
            posts = yield post_model_1.default.find({ user_name: username });
        }
        else if (catname) {
            posts = yield post_model_1.default.find({ categories: { $in: [catname] } });
        }
        else {
            posts = yield post_model_1.default.find();
        }
        return res.status(200).json({ posts, count: posts.length }); // Changed status to 200 and corrected count
    }
    catch (error) {
        return res.status(500).json({ error }); // Changed status to 500 for internal server error
    }
});
exports.getAllpost = getAllpost;
