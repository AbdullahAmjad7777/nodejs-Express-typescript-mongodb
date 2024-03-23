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
exports.getallcategory = exports.createCategory = void 0;
const category_model_1 = __importDefault(require("../model/category.model"));
const createCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const savedCategory = yield category_model_1.default.create(req.body);
        return res.status(201).json({ savedCategory });
    }
    catch (error) {
        return res.status(500).json({ error });
    }
});
exports.createCategory = createCategory;
const getallcategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const category = yield category_model_1.default.find();
        return res.status(201).json({
            category,
            count: category.length
        });
    }
    catch (error) {
        return res.status(404).json({ error });
    }
});
exports.getallcategory = getallcategory;
