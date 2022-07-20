import { Request, Response, NextFunction } from "express"
export function schemaValidator(schema : any){
        return async (req : Request, res : Response, next : NextFunction) => {
                const result = await schema.validate(req.body)
                if(result.error){
                return res.status(400).send(result.error)
                }
                next()
        }
}