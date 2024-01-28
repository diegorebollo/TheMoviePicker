import Fastify from "fastify";
import cros from '@fastify/cors'
import { PrismaClient } from "@prisma/client";

const app = Fastify({
    logger: true
});

await app.register(cros,{})

const prisma = new PrismaClient();

app.get('/api/questions', async (req, reply) => {

    const testBusqueda = await prisma.moviesTmdb.findMany()

   
    return 'hello';
});


try{
    app.listen({port: 3000});
} catch (error) {
    app.log.error(error);
    process.exit(1);
}