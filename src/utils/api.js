const BASE_URL = 'https://yts.am/api/v2';

class Api {
  async getSuggestions(id) {
    const query = await fetch(`${BASE_URL}/movie_suggestions.json?movie_id=${id}`);
    const {data} = await query.json();
    return data.movies;
  }

  async getMovies() {
    const query = await fetch(`${BASE_URL}/list_movies.json`);
    const {data} = await query.json();
    return data.movies;
  }
}

export default new Api();