import * as controllers from "../controllers/auth";
import Router from "express-promise-router";
import withAuth from "../middleware/auth";
import { createValidator } from "../middleware/validation";
import {signInSchema} from '../validation/authorization'

const router = Router();
const signInMiddleware = createValidator(signInSchema)

router.post("/user-exist", controllers.userExist);
// router.post("/login", signInMiddleware, controllers.login);
router.post("/login", controllers.validate("login"), controllers.login);
router.post("/logout", withAuth, controllers.logout);
router.post("/register", controllers.register);
router.get("/check-token", withAuth, (req, res) => res.sendStatus(200));

export default router;
