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

app.post('/api/result', async(req, reply) => {
    const data = req.body;

    const allMoviesGenre = await prisma.moviesTmdb.findMany({
        where: {
            generes: {
                contains: data[3].optionChosen
            }            
        }
    });

    const allMoviesGenreNotNull = allMoviesGenre.filter(cur => cur.runtime != null);    

    const avgRuntime = allMoviesGenreNotNull.reduce((acc, cur) => (acc + cur.runtime), 0) / allMoviesGenreNotNull.length;
    const avgPopularity = allMoviesGenre.reduce((acc, cur) => (acc + cur.popularity), 0) / allMoviesGenre.length;
    const avgYear = Math.trunc(allMoviesGenre.reduce((acc, cur) => (acc + cur.releaseDateYear), 0) / allMoviesGenre.length);
 
    const queryData =  data.map(e => {
        if(e.optionName === 'runtime'){
            if(e.optionChosen === 'Short'){
                e.optionChosen = {lte : avgRuntime}                
            } else {
                e.optionChosen = {gte: avgRuntime}
            };            
        } if (e.optionName === 'releaseDate'){
            if(e.optionChosen === 'Old'){
                e.optionChosen = {lte: avgYear}
            } else {
                e.optionChosen = {gte: avgYear}
            }
        } if (e.optionName === 'popularity'){
            if(e.optionChosen === 'Unknown'){
                e.optionChosen = {lte: avgPopularity}
            } else {
                e.optionChosen = {gte: avgPopularity}
            }
        } if (e.optionName === 'generes'){
            e.optionChosen = {contains: e.optionChosen}
        }
        return e
    });


    let moviesSelection = await prisma.moviesTmdb.findMany({
        where: {
            runtime: queryData[0].optionChosen,
            releaseDateYear: queryData[1].optionChosen,
            popularity: queryData[2].optionChosen,
            generes: queryData[3].optionChosen,

        }
    })

    if (moviesSelection.length < 1){

        moviesSelection = await prisma.moviesTmdb.findMany({
            where: {
                runtime: queryData[0].optionChosen,
                releaseDateYear: queryData[1].optionChosen,
                // popularity: queryData[2].optionChosen,
                generes: queryData[3].optionChosen,    
            }
        })        
    } 
    
    if (moviesSelection.length < 1){

        moviesSelection = await prisma.moviesTmdb.findMany({
            where: {
                runtime: queryData[0].optionChosen,
                // releaseDateYear: queryData[1].optionChosen,
                // popularity: queryData[2].optionChosen,
                generes: queryData[3].optionChosen,    
            }
        })        
    }
    
    if (moviesSelection.length < 1){

        moviesSelection = await prisma.moviesTmdb.findMany({
            where: {
                // runtime: queryData[0].optionChosen,
                // releaseDateYear: queryData[1].optionChosen,
                // popularity: queryData[2].optionChosen,
                generes: queryData[3].optionChosen,    
            }
        });      
    };
    reply.send(moviesSelection);
});


try{
    app.listen({port: 3000, host:'0.0.0.0'});
} catch (error) {
    app.log.error(error);
    process.exit(1);
}