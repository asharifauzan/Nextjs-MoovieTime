"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import queryString from "query-string";
import MoviesGrid from "./MoviesGrid";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { type SearchParams } from "next/dist/server/request/search-params";
import { type MovieType } from "@/lib/api/_base.api";

const API_MAX_PAGE = 500;
const SORT_OPTIONS = [
  {
    label: "Popularity Ascending",
    value: "popularity.asc",
  },
  {
    label: "Popularity Descending",
    value: "popularity.desc",
  },
  {
    label: "Release Date Ascending",
    value: "primary_release_date.asc",
  },
  {
    label: "Release Date Descending",
    value: "primary_release_date.desc",
  },
  {
    label: "Rating Ascending",
    value: "vote_average.asc",
  },
  {
    label: "Rating Descending",
    value: "vote_average.desc",
  },
];

export default function ListMovie({
  genresOptions,
  data,
  page,
  totalPages,
}: SearchParams & {
  data: MovieType[];
  genresOptions: { id: number; name: string }[];
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isLastPage = page === totalPages || Number(page) === API_MAX_PAGE;

  const [movies, setMovies] = useState<MovieType[]>([]);

  // Merge current movies with incoming movie data results
  useEffect(() => {
    setMovies((prevMovies) => [...prevMovies, ...data]);
  }, [data]);

  const handleFilterGenre = (_isChecked: boolean, newGenre: string) => {
    setMovies([]);
    const qsObject = queryString.parse(searchParams.toLocaleString());
    qsObject.page = "1"; // reset page to 1
    qsObject.genres = newGenre;
    const qsString = queryString.stringify(qsObject);

    router.push(`/movies?${qsString}`);
  };

  const handleLoadMore = () => {
    const qsObject = queryString.parse(searchParams.toLocaleString());
    qsObject.page = String(Number(page) + 1);
    const qsString = queryString.stringify(qsObject);

    router.push(`/movies?${qsString}`, { scroll: false });
  };

  return (
    <main>
      <div className="flex flex-col px-[--content-padding] pt-[60px]">
        <Separator className="separator-accent" />

        <div className="header">
          <h2 className="title">Movie</h2>
        </div>

        <div className="content flex gap-[30px] pt-[60px]">
          <div
            className="sidebar p-5 rounded-md h-max"
            style={{
              background:
                "linear-gradient(180deg, #0E1723 0%, rgba(30, 35, 42, 0) 100%)",
            }}
          >
            <div className="sort">
              <h3 className="font-bold mb-[18px]">Sort Result By</h3>

              <Separator />
              <div className="mt-[16px] mb-[31px]">
                <Select
                  value=""
                  onValueChange={(e) => {
                    router.replace(`/movies?sort=${e}`);
                  }}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Popularity" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {SORT_OPTIONS.map((sort) => (
                        <SelectItem key={sort.value} value={sort.value}>
                          {sort.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <Separator />
            </div>

            <div className="filter">
              <h3 className="font-bold my-[11px]">Genres</h3>
              <Separator className="mb-[18px]" />
              {genresOptions?.map((genre) => (
                <div key={genre.id} className="flex justify-between">
                  <p>{genre.name}</p>
                  <Checkbox
                    onCheckedChange={(e) =>
                      handleFilterGenre(e as boolean, genre.name)
                    }
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="flex-1 pb-[93px]">
            <MoviesGrid data={movies as MovieType[]} colNum={5} />

            {!isLastPage && (
              <Button
                className="block mx-auto mt-[63px] bg-[#FF0000] text-white rounded-full px-9 font-semibold"
                onClick={handleLoadMore}
              >
                Load More
              </Button>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
