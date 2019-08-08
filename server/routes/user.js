import * as userController from "../controllers/user";
import withAuth from "../middleware/auth";
import Router from "express-promise-router";
const router = Router();

router.get("/", withAuth, userController.getUser);

export default router;
