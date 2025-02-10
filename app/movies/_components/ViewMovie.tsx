"use client";

import React from "react";
import Image from "next/image";
import { type MovieType } from "@/lib/api/_base.api";
import MoviesCarousel from "./MoviesCarousel";

const URL_IMAGE = "https://image.tmdb.org/t/p/w500";

export default function ViewMovie({
  data,
  recommendations,
}: {
  data: MovieType;
  recommendations: MovieType[];
}) {
  return (
    <main>
      <div
        className={`bg-[url('https://image.tmdb.org/t/p/w500${data.backdrop_path}')] bg-no-repeat bg-cover bg-center h-[600px]`}
      />
      <div
        className="content bg-black p-3 flex w-4/6 mx-auto space-x-4 -mt-1/2"
        style={{ marginTop: "-50px" }}
      >
        <div className="left">
          <Image
            width={220}
            height={330}
            src={URL_IMAGE.concat(data.poster_path)}
            alt={data.title}
          />
        </div>

        <div className="right">
          <p>{data.release_date.slice(0, 4)}</p>
          <p className="font-semibold text-4xl">{data.title}</p>

          <div className="overview mt-3">
            <p className="text-[#ff0000]">Overview</p>
            <p>{data.overview}</p>
          </div>
        </div>
      </div>

      <div className="recommendations p-[--content-padding]">
        <h2 className="title mb-12">Recommendation Movies</h2>

        <MoviesCarousel data={recommendations} />
      </div>
    </main>
  );
}
