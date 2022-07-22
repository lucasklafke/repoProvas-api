import * as testRepository from '../repositories/testRepository.js';
import { Test } from '@prisma/client';
interface CreateTest {
        name: string;
        url: string;
        category: string;
        discipline: string;
        instructor: string;
}

async function getTeacherDiscipline(teacherName : string, disciplineName : string){
        const teacher = await testRepository.getTeacherByName(teacherName)
        const discipline = await testRepository.getDisciplineByName(disciplineName)
        if(!teacher || !discipline){
                throw  {type:"not_found", message:'Teacher or Discipline not found'}
        }
        return await testRepository.getTeacherDisciplineByBothIds(teacher.id, discipline.id)

}
export async function createTest(data : CreateTest){
        const teacherDiscipline = await getTeacherDiscipline(data.instructor, data.discipline)
        if(!teacherDiscipline){
                throw {type:"conflict", message:'Teacher does not have this discipline'}
        }
        const category = await testRepository.getCategoryByName(data.category)
        if(!category){
                throw {type:"not_found", message:'Category not found'}
        }
        const createTestData = {
                name: data.name,
                pdfUrl: data.url,
                categoryId: category.id,
                teacherDisciplineId: teacherDiscipline.id
        }
        await testRepository.createTest(createTestData)
}

export async function getTestsByDiscipline(){
        
}

export async function getTestsByInstructor(){

}