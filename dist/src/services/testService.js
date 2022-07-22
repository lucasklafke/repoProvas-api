var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as testRepository from '../repositories/testRepository.js';
function getTeacherDiscipline(teacherName, disciplineName) {
    return __awaiter(this, void 0, void 0, function* () {
        const teacher = yield testRepository.getTeacherByName(teacherName);
        const discipline = yield testRepository.getDisciplineByName(disciplineName);
        if (!teacher || !discipline) {
            throw { type: "not_found", message: 'Teacher or Discipline not found' };
        }
        return yield testRepository.getTeacherDisciplineByBothIds(teacher.id, discipline.id);
    });
}
export function createTest(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const teacherDiscipline = yield getTeacherDiscipline(data.instructor, data.discipline);
        if (!teacherDiscipline) {
            throw { type: "conflict", message: 'Teacher does not have this discipline' };
        }
        const category = yield testRepository.getCategoryByName(data.category);
        if (!category) {
            throw { type: "not_found", message: 'Category not found' };
        }
        const createTestData = {
            name: data.name,
            pdfUrl: data.url,
            categoryId: category.id,
            teacherDisciplineId: teacherDiscipline.id
        };
        yield testRepository.createTest(createTestData);
    });
}
export function getTestsByDiscipline() {
    return __awaiter(this, void 0, void 0, function* () {
    });
}
export function getTestsByInstructor() {
    return __awaiter(this, void 0, void 0, function* () {
    });
}
//# sourceMappingURL=testService.js.map