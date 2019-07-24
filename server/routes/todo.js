import express from "express";
import { fetchAll, create, removeById, toggleDone, search } from "../controllers/todo";
const router = express.Router();

router.get("/", fetchAll);
router.get("/search/:term", search);
router.post("/", create);
router.put("/toggle/:id", toggleDone);
router.delete("/:id", removeById);

export default router;
