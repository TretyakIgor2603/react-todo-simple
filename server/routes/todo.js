import express from "express";
import * as controllers from "../controllers/todo";
const router = express.Router();

router.get("/", controllers.fetchAll);
router.get("/search/:term", controllers.search);
router.post("/", controllers.create);
router.put("/toggle/:id", controllers.toggleDone);
router.delete("/:id", controllers.removeById);

export default router;
