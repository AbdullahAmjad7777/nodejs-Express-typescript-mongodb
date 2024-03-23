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
exports.getUserbyId = exports.userDelete = exports.updateUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_model_1 = __importDefault(require("../model/user.model"));
const post_model_1 = __importDefault(require("../model/post.model"));
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
            req.body.password = yield bcrypt_1.default.hash(req.body.password, 10);
        }
        // Find and update the user
        const updatedUser = yield user_model_1.default.findByIdAndUpdate(id, req.body, {
            new: true,
        });
        if (!updatedUser) {
            return res.status(404).json({ message: "User not found." });
        }
        return res.status(200).json({
            message: "User updated successfully.",
            updatedUser,
        });
    }
    catch (error) {
        console.error("Error updating user:", error);
        return res.status(500).json({ message: "Internal server error." });
    }
});
exports.updateUser = updateUser;
const userDelete = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_model_1.default.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }
        if (req.body.user_id === req.params.id) {
            yield post_model_1.default.deleteMany({ user_name: user.user_name });
            yield user_model_1.default.findByIdAndDelete(req.params.id);
            return res.status(200).json({ message: "User and associated posts deleted successfully." });
        }
        else {
            return res.status(403).json({ message: "User ID in request body does not match URL." });
        }
    }
    catch (error) {
        console.error("Error deleting user:", error);
        return res.status(500).json({ message: "Internal server error." });
    }
});
exports.userDelete = userDelete;
const getUserbyId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_model_1.default.findById(req.params.id);
        if (!user) {
            return res.status(401).json({
                message: "user not found"
            });
        }
        return res.status(201).json({ user });
    }
    catch (error) {
        return res.status(401).json({ error });
    }
});
exports.getUserbyId = getUserbyId;
