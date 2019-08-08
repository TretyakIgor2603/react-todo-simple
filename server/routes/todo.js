import * as todoController from "../controllers/todo";
import withAuth from "../middleware/auth";
import Router from "express-promise-router"
const router = Router()

router.get("/", withAuth, todoController.get);
router.post("/", withAuth, todoController.create);
router.delete("/:id", withAuth, todoController.remove);
router.put("/", withAuth, todoController.update);

export default router;
