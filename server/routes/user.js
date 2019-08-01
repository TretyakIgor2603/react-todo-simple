import * as controllers from "../controllers/user";
const auth = require("../middleware/auth");
import Router from "express-promise-router";
const router = Router();

router.get("/", auth, controllers.getUsers);

export default router;
