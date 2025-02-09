"use client";

import React, { PropsWithChildren, useEffect, useState } from "react";
import { TmdbAPI } from "@/lib/api/_base.api";

interface ICategoriesContent {
  loaded: boolean;
  onLoad: (e?: any) => void;
}

export default function CategoriesContent({
  loaded,
  onLoad,
  children,
}: PropsWithChildren<ICategoriesContent>) {
  useEffect(() => {
    const fetchGenres = async () => {
      if (!loaded) {
        const response = await TmdbAPI.getMovieGenres();
        const data = response.data.genres;
        onLoad(data);
      }
    };

    fetchGenres();
  }, []);

  return <>{children}</>;
}
