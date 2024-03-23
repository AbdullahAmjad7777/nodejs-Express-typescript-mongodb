"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const db_connection_1 = __importDefault(require("./database/db.connection"));
const auth_route_1 = __importDefault(require("./routes/auth.route"));
const user_route_1 = __importDefault(require("./routes/user.route"));
const post_route_1 = __importDefault(require("./routes/post.route"));
const category_route_1 = __importDefault(require("./routes/category.route"));
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 8000;
// Middleware setup
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)());
app.use("/images", express_1.default.static(path_1.default.join(__dirname, "/images")));
// Routes
app.use("/api/v1/auth", auth_route_1.default);
app.use("/api/v1/users", user_route_1.default);
app.use("/api/v1/posts", post_route_1.default);
app.use("/api/v1/categories", category_route_1.default);
// Multer configuration for file upload
const storage = multer_1.default.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "images");
    },
    filename: (req, file, callback) => {
        callback(null, "file.png");
    },
});
const upload = (0, multer_1.default)({ storage: storage });
app.post("/upload", upload.single("file"), (req, res) => {
    res.status(200).json({ message: "File has been uploaded" });
});
// Database connection and server start
(0, db_connection_1.default)()
    .then(() => {
    app.get("/", (req, res) => {
        res.send("Welcome to the task manager API");
    });
    app.listen(port, () => {
        console.log(`Server is running at ${port}`);
    });
})
    .catch((error) => {
    console.error("Error connecting to database:", error);
});
