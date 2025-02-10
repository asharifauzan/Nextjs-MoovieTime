import React from "react";
import MoviesCarousel from "./movies/_components/MoviesCarousel";
import MoviesGrid from "./movies/_components/MoviesGrid";
import { Button } from "@/components/ui/button";
import { TmdbAPI } from "@/lib/api/_base.api";
import { Separator } from "@/components/ui/separator";

export default async function Home() {
  const response = await TmdbAPI.getPopularMovies({});
  const { results } = response.data;

  const response2 = await TmdbAPI.getUpcomingMovies();
  const { results: results2 } = response2.data;

  return (
    <div id="home-page">
      {/* Carousell */}
      <div className="flex justify-center pt-[56px] pb-[47px] bg-[#1e232a]">
        <MoviesCarousel data={results2.slice(0, 5)} />
      </div>

      {/* Content */}
      <div className="px-[--content-padding]">
        <div className="content pt-[115px] pb-[115px]">
          <Separator className="separator-accent" />
          <div className="header flex justify-between  mb-[43px]">
            <h2 className="title">Discover Movies</h2>

            <div className="tabs space-x-[21px]">
              <Button className="px-4 py-1.5 font-bold rounded-full">
                Popularity
              </Button>
              <Button className="px-4 py-1.5 font-bold rounded-full" disabled>
                Release Date
              </Button>
            </div>
          </div>
          <div className="content">
            <MoviesGrid data={results.slice(0, 10)} colNum={5} />
          </div>
        </div>
      </div>
    </div>
  );
}
