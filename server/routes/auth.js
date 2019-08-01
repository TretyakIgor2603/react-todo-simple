import * as controllers from "../controllers/auth";
import Router from "express-promise-router"
const router = Router()

router.post('/user-exist', controllers.userExist)
router.post('/login', controllers.login)
router.post('/register', controllers.register)

export default router;
