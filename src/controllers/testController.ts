import { Request, Response } from "express";
import * as testService from "../services/testService.js"
import { Test } from "@prisma/client";

export async function createTest(req: Request, res: Response){
        const {name, url, category, discipline, instructor} = req.body
        await testService.createTest({name, url, category, discipline, instructor})
        res.sendStatus(201)
}