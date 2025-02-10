import { TmdbAPI } from "@/lib/api/_base.api";
import React from "react";
import ViewMovie from "../_components/ViewMovie";
import { type Params } from "next/dist/server/request/params";

export default async function MovieView({ params }: { params: Params }) {
  const { id } = await params;

  const response = await TmdbAPI.getMovieById(Number(id));
  const data = response.data;

  const response2 = await TmdbAPI.getRecommendationFromMovie(Number(id));
  const { results } = response2.data;

  return <ViewMovie data={data} recommendations={results} />;
}
