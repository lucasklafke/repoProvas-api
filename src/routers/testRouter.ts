import { Router } from "express"
import { createTest, getTestsByDiscipline, getTestsByInstructor} from "../controllers/testController.js"
import { schemaValidator } from "../middlewares/schemaValidator.js"
import { validateJWT } from "../middlewares/validateJWT.js"
import testSchema from "../schemas/testSchema.js"

const testRouter = Router()

testRouter.post("/test",schemaValidator(testSchema),validateJWT, createTest)
testRouter.get("/get/tests/discipline", validateJWT, getTestsByDiscipline)
testRouter.get("/get/tests/instructor", validateJWT, getTestsByInstructor)
export default testRouter