import { Router } from "express";
import authRouter from "./authRouter.js";
var globalRouter = Router();
globalRouter.use(authRouter);
export default globalRouter;
//# sourceMappingURL=globalRouter.js.map