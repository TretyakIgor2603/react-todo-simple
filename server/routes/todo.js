import express from "express";
import { fetchAll, create, removeById, toggleTaskDone, searchTasks } from "../controllers/todo";
const router = express.Router();

router.get("/", fetchAll);
router.get("/search/:term", searchTasks);
router.post("/", create);
router.put("/toggle/:id", toggleTaskDone);
router.delete("/:id", removeById);

export default router;
