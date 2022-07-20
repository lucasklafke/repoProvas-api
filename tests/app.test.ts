import app from '../src/app.js';
import supertest from 'supertest';
import prisma from '../src/config/db.js';
beforeEach(async () => {
    await prisma.$executeRaw`DELETE FROM sessions`;
    await prisma.$executeRaw`DELETE FROM users WHERE email = 'teste@teste.com'`;
})
describe("POST /tasks", () => {
    it("given a body to singup", async() => {
        const body = {
                email: "teste@teste.com",
                password: "testes"
        }
       const result = await supertest(app).post(`/signup`).send(body)
       expect(result.statusCode).toBe(201)

    });
});