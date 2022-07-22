import {Router} from "express"
import authRouter from "./authRouter.js" 
import testRouter from "./testRouter.js"
const globalRouter = Router()

globalRouter.use(authRouter)
globalRouter.use(testRouter)
export default globalRouter;