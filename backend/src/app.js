import Fastify from "fastify";
import cros from '@fastify/cors'
import { PrismaClient } from "@prisma/client";

const app = Fastify({
    logger: true
});

await app.register(cros,{})

const prisma = new PrismaClient();

app.get('/api/questions', async (req, reply) => {

    const allQuestions = await prisma.questions.findMany();   
    return allQuestions;
});


try{
    app.listen({port: 3000});
} catch (error) {
    app.log.error(error);
    process.exit(1);
}