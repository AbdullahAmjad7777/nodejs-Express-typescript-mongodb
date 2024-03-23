import express from "express";
import { Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import connectDB from "./database/db.connection";
import authRoute from "./routes/auth.route";
import userRoute from "./routes/user.route";
import postRoute from "./routes/post.route";
import categoryRoute from "./routes/category.route";
import multer from "multer";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

// Middleware setup
app.use(bodyParser.json());
app.use(cors());
app.use("/images", express.static(path.join(__dirname, "/images")));

// Routes
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/users", userRoute);
app.use("/api/v1/posts", postRoute);
app.use("/api/v1/categories", categoryRoute);

// Multer configuration for file upload
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "images");
  },
  filename: (req, file, callback) => {
    callback(null, "file.png");
  },
});

const upload = multer({ storage: storage });

app.post("/upload", upload.single("file"), (req: Request, res: Response) => {
  res.status(200).json({ message: "File has been uploaded" });
});

// Database connection and server start
connectDB()
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
