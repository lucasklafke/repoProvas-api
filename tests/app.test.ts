import app from '../src/app.js';
import supertest from 'supertest';
import prisma from '../src/config/db.js';
beforeEach(async () => {
    await prisma.$executeRaw`TRUNCATE TABLE sessions`;
    await prisma.$executeRaw`DELETE FROM users WHERE email = 'teste@teste.com'`;
})
describe("Auth tests", () => {
    it("given a body to singup, create user", async() => {
        const body = {
                email: "teste@teste.com",
                password: "testes"
        }
       const result = await supertest(app).post(`/signup`).send(body)
       expect(result.statusCode).toBe(201)

    });
    it("given a body missing password, return 404", async () => {
        const body = {
                email: ""
        }
        const result = await supertest(app).post(`/signup`).send(body)
        expect(result.statusCode).toBe(404)
    })
});

afterAll(async () => {
    prisma.$disconnect();
})