import prisma from "../config/db.js"
import { Test } from "@prisma/client"

type createTest ={
        name: string,
        pdfUrl: string,
        categoryId: number,
        teacherDisciplineId: number
}

export async function getCategoryByName(name: string){
        return await prisma.category.findFirst({
                where: {
                        name : {
                                equals: name,
                                mode: 'insensitive'
                        }
                }
        })
}

export async function getTeacherByName(name: string){
        return await prisma.teacher.findFirst({
                where: {
                        name : {
                                equals: name,
                                mode: 'insensitive'
                        }
                }
        })
}

export async function getDisciplineByName(name: string){
        return await prisma.discipline.findFirst({
                where: {
                        name : {
                                equals: name,
                                mode: 'insensitive'
                        }
                }
        })
}

export async function getTeacherDisciplineByBothIds(teacherId: number, disciplineId: number){
        return await prisma.teacher_Discipline.findFirst({
                where: {
                        teacher_id: teacherId,
                        discipline_id: disciplineId
                }
        })
}

export async function createTest(data: createTest){
        return await prisma.test.create({
                data
        })
        
}

export async function getTestAndInfos(){
        return await prisma.test.findMany({
                include: {
                        Category: true,
                        teachers_disciplines: {
                                include: {
                                        teachers: true,
                                        
                                }
                        }
                }
        })
}