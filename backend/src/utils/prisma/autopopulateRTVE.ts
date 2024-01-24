import { PrismaClient } from '@prisma/client'
import { scrapAllCategories } from "../rtveScraper";

const prisma = new PrismaClient()

async function main() {

    const data = await scrapAllCategories();

    Object.entries(data).forEach(([key, value]) => {
        const categoryName = data[(key as any)].categoryName;
        const categoryId = data[(key as any)].categoryId;
        const movies = data[(key as any)].movies;
                
      
        Object.entries(movies).forEach(async ([key, value]) => {
            const movieId = Number((movies)[(key as any)].id);
            const movieName = movies[(key as any)].name;
            const imdbId = movies[(key as any)].imdbId;

            await prisma.moviesRtve.create({
                data:{
                    categoryId: categoryId,
                    categoryName: categoryName,
                    movieId: movieId,
                    movieName: movieName,
                    imdbId: imdbId
                }
            });
            
        });        
    });
    
  }
  
  main()
    .then(async () => {
      await prisma.$disconnect()
    })
    .catch(async (e) => {
      console.error(e)
      await prisma.$disconnect()
      process.exit(1)
    })