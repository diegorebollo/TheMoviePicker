import { PrismaClient } from '@prisma/client'
import { getMovie, getGenresList, getMoreInfo } from "../tmdbApi";

const prisma = new PrismaClient()

async function main() {

    const allMovies = await prisma.moviesRtve.findMany(); 
    const genresList = await getGenresList();
    
    allMovies.forEach(async movie => {

        const movieTitle = movie.movieName;
        const movieRtveId = movie.movieId;
        const movieImdbId = movie.imdbId;

        if (movieImdbId === null){
            console.log(movieTitle, movieImdbId, 'No IMDB ID')
        } else {
            const apiData = await getMovie(movieImdbId, 250);
            const [movieApiData] = apiData['movie_results'];

            if (movieApiData === undefined){
                console.log(movieTitle, movieRtveId, 'Not Found');
            } else {
                const genre_ids = movieApiData['genre_ids'];
                const generes =  genre_ids.map(id => genresList['genres'].find(genere => genere.id === id).name).join();
                const moreMovieData = await getMoreInfo(movieApiData.id, 250);

                await prisma.moviesTmdb.create({
                    data: {
                        rtveId: movieRtveId,
                        tmdbId: movieApiData.id,
                        title: movieApiData.title,
                        overview: movieApiData.overview,
                        popularity: movieApiData.popularity,
                        releaseDate: movieApiData.release_date,
                        generes: generes,
                        runtime: moreMovieData.runtime                        
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