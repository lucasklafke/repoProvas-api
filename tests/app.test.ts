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
});

describe("test tests", () => {
    it("given a body to create test, create test", async() => {
        const body = {
                name : "test-teste",
                url: "http://google.com",
                category : "Projeto",
                discipline : "HTML e CSS",
                instructor: "Diego Pinho"
        }
        const singupResponse = await supertest(app).post(`/signup`).send({email: "teste@teste.com", password: "testes"})
        const token = singupResponse.body.token
        console.log(token)
        const result = await supertest(app).post(`/test`).send(body).set("Authorization", `Bearer ${token}`)
        expect(result.statusCode).toBe(201)
    })
    
    it("given a body to create test without authorization, expected 401", async() => {
        const body = {
                name : "test-teste",
                url: "http://google.com",
                category : "Projeto",
                discipline : "HTML e CSS",
                instructor: "Diego Pinho"
        }
        const result = await supertest(app).post(`/test`).send(body)
        expect(result.statusCode).toBe(401)
    })

    it("given a body to create test with invalid token, expected 401", async() => {
        const body = {
                name : "test-teste",
                url: "http://google.com",
                category : "Projeto",
                discipline : "HTML e CSS",
                instructor: "Diego Pinho"
        }
        const result = await supertest(app).post(`/test`).send(body).set("Authorization", `Bearer invalid-token`)
        expect(result.statusCode).toBe(401)
    })

    it("given a body to create test with invalid body, expected 401", async() => {
        const body = {
                name : "test-teste",
                url: "google",
                category : "Projeto",
                discipline : "HTML e CSS",
                instructor: "Dieguinho Pinho"
        }
        const result = await supertest(app).post(`/test`).send(body).set("Authorization", `Bearer invalid-token`)
        expect(result.statusCode).toBe(400)
    })

    it("given an authorization, get tests by discipline", async() => {
        const singupResponse = await supertest(app).post(`/signup`).send({email: "teste@teste.com", password: "testes"})
        const token = singupResponse.body.token
        const result = await supertest(app).get(`/get/tests/discipline`).set("Authorization", `Bearer ${token}`)
        expect(result.statusCode).toBe(200)
    })

    it("given an authorization, get tests by instructor", async() => {
        const singupResponse = await supertest(app).post(`/signup`).send({email: "teste@teste.com", password: "testes"})
        const token = singupResponse.body.token
        const result = await supertest(app).get(`/get/tests/instructor`).set("Authorization", `Bearer ${token}`)
        expect(result.statusCode).toBe(200)
    })

    it("given an authorization, get tests by instructor", async() => {
        const singupResponse = await supertest(app).post(`/signup`).send({email: "teste@teste.com", password: "testes"})
        const token = singupResponse.body.token
        const result = await supertest(app).get(`/get/tests/instructor`).set("Authorization", `Bearer ${token}`)
        expect(result.statusCode).toBe(200)
    })
})



afterAll(async () => {
    prisma.$disconnect();
})