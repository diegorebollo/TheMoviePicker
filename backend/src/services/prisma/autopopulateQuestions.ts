import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {

    const allGeneres: string[] = [] ;

    const allMovieGeneres = await prisma.moviesTmdb.findMany({
        select: {
            generes: true
        }
    })

    allMovieGeneres.forEach((e) => {
        const allMovieGeneresList = e.generes?.split(',');
        
        allMovieGeneresList?.forEach((e) => {
            if(e != ' ' &&  e.length > 1 && !allGeneres.includes(e)) {
                allGeneres.push(e)
            }
        });
    });

    await prisma.questions.create({
        data: {
            title: 'Do you prefer short or long movies?',
            optionName: 'runtime',
            options: 'Short, Long'            
        }
    });

    await prisma.questions.create({
        data: {
            title: 'Do you prefer a new movie or an old one?',
            optionName: 'releaseDate',
            options: 'New, Old'            
        }
    });

        await prisma.questions.create({
        data: {
            title: 'Do you prefer something popular or something unknown?',
            optionName: 'popularity',
            options: 'Popular, Unknown'            
        }
    });

    await prisma.questions.create({
        data: {
            title: 'What movie genre do you prefer out of these ones?',
            optionName: 'generes',
            options: allGeneres.toString()            
        }
    });

};
  
main()
    .then(async () => {
      await prisma.$disconnect()
    })
    .catch(async (e) => {
      console.error(e)
      await prisma.$disconnect()
      process.exit(1)
    })

