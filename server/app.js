import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan"
import cors from "cors"
import todoRoutes from "./routes/todo";

const app = express();

app.use(morgan("dev"));
app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/api/tasks", todoRoutes);

export default app;
