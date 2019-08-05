import * as controllers from "../controllers/auth";
import Router from "express-promise-router";
const router = Router();
import withAuth from "../middleware/auth";

router.post("/user-exist", controllers.userExist);
router.post("/login", controllers.validate("login"), controllers.login);
router.post("/logout", withAuth, controllers.logout);
router.post("/register", controllers.register);
router.get("/check-token", withAuth, function(req, res) {
  res.sendStatus(200);
});

export default router;
