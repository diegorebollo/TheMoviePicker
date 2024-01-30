import { PrismaClient } from '@prisma/client'
import {scrapAllCategories} from '../../utils/rtveScraper.js'

const prisma = new PrismaClient()

async function main() {
    const data = await scrapAllCategories();

    Object.entries(data).forEach((key, value) => {

        const categoryName = data[value].categoryName;
        const categoryId = data[value].categoryId;
        const movies = data[value].movies;               
      
        Object.entries(movies).forEach(async (key, value) => {
            const movieId = Number(movies[value].id);
            const movieName = movies[value].name;
            const imdbId = movies[value].imdbId;

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