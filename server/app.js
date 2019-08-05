require("dotenv").config();
import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import cors from "cors";
import todoRoutes from "./routes/todo";
import authRoutes from "./routes/auth";
import userRoutes from "./routes/user";

const app = express();

app.use(morgan("dev"));
app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/api/tasks", todoRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);

app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

export default app;
