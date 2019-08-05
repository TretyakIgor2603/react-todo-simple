import * as controllers from "../controllers/user";
import withAuth from "../middleware/auth";
import Router from "express-promise-router";
const router = Router();

router.get("/", withAuth, controllers.getUsers);


export default router;
