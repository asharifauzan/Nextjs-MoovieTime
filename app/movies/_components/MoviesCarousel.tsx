"use client";

import React from "react";
import Image from "next/image";

import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import Link from "next/link";
import { type MovieType } from "@/lib/api/_base.api";

const URL_IMAGE = "https://image.tmdb.org/t/p/w500";

const StarIcon = (
  <svg
    width="17"
    height="17"
    viewBox="0 0 17 17"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M7.84818 2.13274C8.19526 1.32678 9.338 1.32678 9.68509 2.13274L10.7225 4.54183C10.8673 4.87801 11.1842 5.10823 11.5487 5.14203L14.1604 5.38427C15.0342 5.46531 15.3873 6.55212 14.7281 7.13127L12.7575 8.86241C12.4825 9.10398 12.3615 9.47648 12.4419 9.83355L13.0186 12.3924C13.2116 13.2484 12.2871 13.9201 11.5325 13.4721L9.27719 12.1329C8.96247 11.946 8.5708 11.946 8.25607 12.1329L6.00072 13.4721C5.24619 13.9201 4.32169 13.2484 4.51463 12.3924L5.09133 9.83355C5.17181 9.47648 5.05077 9.10398 4.77579 8.86241L2.8052 7.13127C2.14594 6.55212 2.49906 5.46531 3.37284 5.38427L5.98461 5.14203C6.34907 5.10823 6.66594 4.87801 6.81072 4.54183L7.84818 2.13274Z"
      fill="#FFB802"
    />
  </svg>
);

export default function MoviesCarousel({ data }: { data: MovieType[] }) {
  return (
    <Swiper
      modules={[Pagination, A11y, Autoplay]}
      spaceBetween={50}
      slidesPerView={2.6}
      className="w-full h-full"
      enabled
      centeredSlides
      pagination={{
        clickable: true,
        renderBullet: (_index, className) => {
          const extendedClassName = `${className} !bg-[#ffffff80]`;
          return '<span class="' + extendedClassName + '">' + "</span>";
        },
      }}
      autoplay={{
        delay: 115000,
        disableOnInteraction: false,
      }}
      loop
    >
      {data?.map((movie) => (
        <SwiperSlide key={movie.id}>
          <Link href={`/movies/${movie.id}`}>
            <div className="flex items-center w-max">
              <Image
                width={243}
                height={364}
                src={`${URL_IMAGE}${movie.poster_path}`}
                alt={movie.title}
              />
              <div className="w-[400px] h-[324px] px-[20px] py-[25px] bg-black">
                <p className="flex items-center space-x-[5px] font-bold text-[18px]">
                  {StarIcon}
                  <span>{movie.vote_average}</span>
                </p>
                <p className="font-medium text-[28px]">{movie.title}</p>
                <p className="flex items-center space-x-[5px] my-[11px]">
                  <span>{movie.release_date}</span>
                  <span className="block w-1.5 h-1.5 bg-[#FFFFFF80] rounded-full"></span>
                  <span>{movie.genre_ids.join(", ")}</span>
                </p>
                <p>{movie.overview}</p>
              </div>
            </div>
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
