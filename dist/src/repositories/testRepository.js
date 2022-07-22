var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import prisma from "../config/db.js";
export function getCategoryByName(name) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield prisma.category.findFirst({
            where: {
                name: {
                    equals: name,
                    mode: 'insensitive'
                }
            }
        });
    });
}
export function getTeacherByName(name) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield prisma.teacher.findFirst({
            where: {
                name: {
                    equals: name,
                    mode: 'insensitive'
                }
            }
        });
    });
}
export function getDisciplineByName(name) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield prisma.discipline.findFirst({
            where: {
                name: {
                    equals: name,
                    mode: 'insensitive'
                }
            }
        });
    });
}
export function getTeacherDisciplineByBothIds(teacherId, disciplineId) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield prisma.teacher_Discipline.findFirst({
            where: {
                teacher_id: teacherId,
                discipline_id: disciplineId
            }
        });
    });
}
export function createTest(data) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield prisma.test.create({
            data
        });
    });
}
export function getTestAndInfos() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield prisma.test.findMany({
            include: {
                Category: true,
                teachers_disciplines: {
                    include: {
                        teachers: true,
                    }
                }
            }
        });
    });
}
//# sourceMappingURL=testRepository.js.map