const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: ''
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

