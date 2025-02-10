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

export type MovieType = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

export const TmdbAPI = {
  /**
   * Get List of Popular movies
   *
   * Read more: https://developer.themoviedb.org/reference/movie-popular-list
   */
  async getPopularMovies({ genres, page }: { genres?: string; page?: number }) {
    const response = await BaseAPI.get("/3/movie/popular", {
      params: {
        with_genres: genres,
        page,
      },
    });
    return response;
  },

  /**
   * Get List of Upcoming Movies
   *
   * Read more: https://developer.themoviedb.org/reference/movie-upcoming-list
   */
  async getUpcomingMovies() {
    const response = await BaseAPI.get("3/movie/upcoming");
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

  /**
   * Get detail movie by id
   *
   * Read more: https://developer.themoviedb.org/reference/movie-details
   */
  async getMovieById(id: number) {
    const response = await BaseAPI.get(`/3/movie/${id}`);
    return response;
  },

  /**
   * Get recommendation from specific movie
   *
   * Read more: https://api.themoviedb.org/3/movie/{movie_id}/recommendations
   */
  async getRecommendationFromMovie(id: number) {
    const response = await BaseAPI.get(`3/movie/${id}/recommendations`);
    return response;
  },
};
