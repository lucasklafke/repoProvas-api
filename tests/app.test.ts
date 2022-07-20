import app from '../src/app.js';
import supertest from 'supertest';

describe("POST /tasks", async () => {
    // ...

    it("given a task with duplicate title it should return 409", async () => {
        const body = {
          title: 'Beber agua de novo',
          description: 'Beba, agora',
        };

        const firstTry = await supertest(app).post("/tasks").send(body);
        expect(firstTry.status).toEqual(201); // a primeira inserção vai funcionar

        // se tentarmos criar uma task igual, deve retornar 409
        const secondTry = await supertest(app).post("/tasks").send(body);
        expect(secondTry.status).toEqual(409);
    });
});