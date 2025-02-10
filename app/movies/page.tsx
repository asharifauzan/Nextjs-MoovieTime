import React from "react";
import ListMovie from "./_components/ListMovie";
import { TmdbAPI } from "@/lib/api/_base.api";
import { type SearchParams } from "next/dist/server/request/search-params";

export default async function MoviePage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const { genres, page } = await searchParams;

  const response = await TmdbAPI.getPopularMovies({
    genres: genres as string,
    page: Number(page) || 1,
  });

  const response2 = await TmdbAPI.getMovieGenres();

  const { results, page: currentPage, total_pages } = response.data;
  const { genres: genresOption } = response2.data;

  return (
    <ListMovie
      genresOptions={genresOption}
      data={results}
      page={currentPage}
      totalPages={total_pages}
      genres={genres}
    />
  );
}
