import { Router } from "express"
import { createTest } from "../controllers/testController.js"
import { schemaValidator } from "../middlewares/schemaValidator.js"
import { validateJWT } from "../middlewares/validateJWT.js"
import testSchema from "../schemas/testSchema.js"

const testRouter = Router()

testRouter.post("/test",schemaValidator(testSchema),validateJWT, createTest)
export default testRouter