import express from "express";
import { fetchAll, create, removeById, toggleTaskDone } from "../controllers/todo";
const router = express.Router();

router.get("/", fetchAll);
router.post("/", create);
router.delete("/:id", removeById);
router.put("/toggle/:id", toggleTaskDone);

export default router;
