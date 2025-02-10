import React from "react";
import Image from "next/image";
import Link from "next/link";
import { type MovieType } from "@/lib/api/_base.api";

export default function MoviesGrid({
  data,
  colNum = 1,
}: {
  data: MovieType[];
  colNum: number;
}) {
  const URL_IMAGE = "https://image.tmdb.org/t/p/w500";

  return (
    <div
      className="list grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-[25px] gap-y-[37px] justify-center"
      style={{ gridTemplateColumns: `repeat(${colNum}, max-content)` }}
    >
      {data?.map((movie) => (
        <Link key={movie.id} href={`/movies/${movie.id}`}>
          <div className="relative max-w-[220px]">
            <Image
              src={`${URL_IMAGE}${movie.poster_path}`}
              alt={movie.title}
              width={220}
              height={330}
            />
            <p>{movie.title}</p>
            <p>{movie.release_date.slice(0, 4)}</p>
            <p className="absolute top-0 right-0 px-[10px] py-[5px] bg-[#1E232B50]">
              {movie.vote_average.toFixed(1)}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}
