import Axios from "axios";

// TODO: consider to store at server side
const accessToken =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwYWU5YjdmMTk5Yjc2NDgyOTJhYzA5ZTUwNGYxN2ZiNyIsIm5iZiI6MTczOTExMDMxMC4yOTMsInN1YiI6IjY3YThiN2E2YmYwYTlmNmY1NGUwOTdmYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.eDmj9WR3xPG_9naLyPGWyw__u_TGaMfRleYNp824C10";

// const token = "0ae9b7f199b7648292ac09e504f17fb7";
// const accountId = "21806787";

const BaseAPI = Axios.create({
  baseURL: "https://api.themoviedb.org",
  headers: {
    Authorization: `Bearer ${accessToken}`,
  },
});

export const TmdbAPI = {
  /**
   * Get Popular movies
   *
   * Read more: https://developer.themoviedb.org/reference/movie-popular-list
   */
  async getPopularMovies() {
    const response = await BaseAPI.get("/3/movie/popular");
    return response;
  },

  /**
   * Get movie genres
   *
   * Read more: https://developer.themoviedb.org/reference/genre-movie-list
   */
  async getMovieGenres() {
    const response = await BaseAPI.get("/3/genre/movie/list");
    return response;
  },
};
