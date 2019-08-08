import * as authController from "../controllers/auth";
import Router from "express-promise-router";
import withAuth from "../middleware/auth";
import { createValidator } from "../middleware/validation";
import {signInSchema} from '../validation/authorization'

const router = Router();
const signInMiddleware = createValidator(signInSchema)

router.post("/user-exist", authController.userExist);
// router.post("/login", signInMiddleware, authController.login);
router.post("/login", authController.validate("login"), authController.login);
router.post("/logout", withAuth, authController.logout);
router.post("/register", authController.register);
router.get("/check-token", withAuth, (req, res) => res.sendStatus(200));

export default router;
