import { Router } from "express";
import { signUp, signIn } from "../controllers/authController.js";
import { schemaValidator } from "../middlewares/schemaValidator.js";
import authSchema from "../schemas/authSchema.js";
var authRouter = Router();
authRouter.post("/signup", schemaValidator(authSchema), signUp);
authRouter.post("/signin", schemaValidator(authSchema), signIn);
export default authRouter;
//# sourceMappingURL=authRouter.js.map