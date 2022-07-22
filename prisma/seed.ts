import bcrypt from "bcrypt";

import prisma  from "../src/config/db.js";

// create admin user
async function main(){
  const SALT = 10;
  const hashedPassword = bcrypt.hashSync("admin", SALT);

        await prisma.$executeRaw`INSERT INTO terms ("number") VALUES (1);`
 
        await prisma.$executeRaw`INSERT INTO categories ("name") VALUES ('Projeto');`


        await prisma.$executeRaw`INSERT INTO teachers ("name") VALUES ('Diego Pinho');`

        await prisma.$executeRaw`INSERT INTO disciplines ("name", "termId") VALUES ('HTML e CSS', 1);`

        await prisma.$executeRaw`INSERT INTO "teachersDisciplines" ("teacherId", "disciplineId") VALUES (1, 1);`
}


main().catch(e => {
  console.log(e);
  process.exit(1);
}).finally(async () => {
  await prisma.$disconnect();
})