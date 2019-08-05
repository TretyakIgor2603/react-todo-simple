import * as controllers from "../controllers/todo";
import Router from "express-promise-router"
const router = Router()

router.get("/", controllers.get);
router.post("/", controllers.create);
router.delete("/:id", controllers.remove);
router.put("/", controllers.update);

export default router;
