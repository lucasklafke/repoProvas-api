import joi from "joi";
const testSchema = joi.object({
    name: joi.string().required(),
    url: joi.string().uri().required(),
    category: joi.string().required(),
    discipline: joi.string().required(),
    instructor: joi.string().required()
});
export default testSchema;
//# sourceMappingURL=testSchema.js.map