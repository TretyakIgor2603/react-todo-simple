import * as controllers from "../controllers/todo";
import withAuth from "../middleware/auth";
import Router from "express-promise-router"
const router = Router()

router.get("/", withAuth, controllers.get);
router.post("/", withAuth, controllers.create);
router.delete("/:id", withAuth, controllers.remove);
router.put("/", withAuth, controllers.update);

export default router;
