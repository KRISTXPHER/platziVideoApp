const BASE_URL = 'https://yts.am/api/v2';

class Api {
  async getSuggestions(id) {
    const query = await fetch(`${BASE_URL}/list_movies.json?movie_id=${id}`);
    const { data } = await query.json();
    return data.movies;
  }
}

export default new Api();