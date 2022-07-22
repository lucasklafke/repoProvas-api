var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import app from '../src/app.js';
import supertest from 'supertest';
import prisma from '../src/config/db.js';
beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.$executeRaw `TRUNCATE TABLE sessions`;
    yield prisma.$executeRaw `DELETE FROM users WHERE email = 'teste@teste.com'`;
}));
describe("Auth tests", () => {
    it("given a body to singup, create user", () => __awaiter(void 0, void 0, void 0, function* () {
        const body = {
            email: "teste@teste.com",
            password: "testes"
        };
        const result = yield supertest(app).post(`/signup`).send(body);
        expect(result.statusCode).toBe(201);
    }));
    it("given a body missing password, return 404", () => __awaiter(void 0, void 0, void 0, function* () {
        const body = {
            email: ""
        };
        const result = yield supertest(app).post(`/signup`).send(body);
        expect(result.statusCode).toBe(404);
    }));
});
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    prisma.$disconnect();
}));
//# sourceMappingURL=app.test.js.map