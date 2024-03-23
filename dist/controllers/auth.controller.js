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
exports.loginUser = exports.createUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = __importDefault(require("../model/user.model"));
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user_name, email, password } = req.body;
        const existingEmail = yield user_model_1.default.findOne({ email });
        if (existingEmail) {
            return res
                .status(400)
                .json({ message: "User with this email already exists." });
        }
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        const savedUser = new user_model_1.default({
            user_name,
            email,
            password: hashedPassword,
        });
        yield savedUser.save();
        return res.status(201).json({ message: "User registered successfully.", savedUser });
    }
    catch (error) {
        console.error("Error creating user:", error);
        return res.status(500).json({ message: "Internal server error." });
    }
});
exports.createUser = createUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user_name, password } = req.body;
        const existingUser = yield user_model_1.default.findOne({ user_name });
        if (!existingUser) {
            return res.status(404).json({ message: "User not found." });
        }
        const isPasswordValid = yield bcrypt_1.default.compare(password, existingUser.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid credentials." });
        }
        const token = jsonwebtoken_1.default.sign({ id: existingUser.id }, process.env.JWT_SEC, {
            expiresIn: "3d",
        });
        return res
            .status(200)
            .json({ message: "User logged in successfully.", token });
    }
    catch (error) {
        console.error("Error logging in user:", error);
        return res.status(500).json({ message: "Internal server error." });
    }
});
exports.loginUser = loginUser;
