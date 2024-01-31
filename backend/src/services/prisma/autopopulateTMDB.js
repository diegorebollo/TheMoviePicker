import { PrismaClient } from '@prisma/client'
import { getMovie, getGenresList, getMoreInfo } from "../../utils/tmdbApi.js";

const prisma = new PrismaClient()

async function main() {

    const allMovies = await prisma.moviesRtve.findMany(); 
    const genresList = await getGenresList(400);

    allMovies.forEach(async movie => {

        const movieTitle = movie.movieName;
        const movieRtveId = movie.movieId;
        const movieImdbId = movie.imdbId;

        if (movieImdbId === null){
            console.log(movieTitle, movieImdbId, 'No IMDB ID')
        } else {
            const apiData = await getMovie(movieImdbId, 700);
            
            const [movieApiData] = apiData['movie_results'];            

            if (movieApiData === undefined){
                console.log(movieTitle, movieRtveId, 'Not Found');
            } else {
                const genre_ids = movieApiData['genre_ids'];
                const generes =  genre_ids.map(id => genresList['genres'].find(genere => genere.id === id).name).join();
                const moreMovieData = await getMoreInfo(movieApiData.id, 350);
                const releaseDateYear = Number(movieApiData.release_date.split('-')[0])

                await prisma.moviesTmdb.create({
    
                    data: {
                        rtveId: movieRtveId,
                        tmdbId: movieApiData.id,
                        title: movieApiData.title,
                        overview: movieApiData.overview,
                        popularity: movieApiData.popularity,
                        releaseDate: movieApiData.release_date,
                        releaseDateYear: releaseDateYear,
                        generes: generes,
                        runtime: moreMovieData.runtime,
                        posterPath: moreMovieData.poster_path
                                                
                    }
                })
            }
        }                              

    })
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