const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0ZTE3ZTMzMmI5N2UyNjBhYWMxYjVhMTY3MDIxM2Q2YSIsInN1YiI6IjYzNzNkMTRiOGZkZGE5MDA3N2RhNzE5MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.8oY9DS06lwaWeqOrf9pscss9birQWQgh1fKc_B8M2zU'
    }
  };
  

export async function getGenresList(waitTime) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      fetch(`https://api.themoviedb.org/3/genre/movie/list?language=en`, options)
        .then(response => response.json())
        .then(data => resolve(data))
        .catch(error => reject(error));
    }, waitTime);
  });
}

export async function getMovie(imdbId, waitTime) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      fetch(`https://api.themoviedb.org/3/find/${imdbId}?external_source=imdb_id&language=es`, options)
        .then(response => response.json())
        .then(data => resolve(data))
        .catch(error => reject(error));
    }, waitTime);
  });
}

export async function getMoreInfo(tmdbId, waitTime) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      fetch(`https://api.themoviedb.org/3/movie/${tmdbId}?language=es`, options)
        .then(response => response.json())
        .then(data => resolve(data))
        .catch(error => reject(error));
    }, waitTime);
  });
}

