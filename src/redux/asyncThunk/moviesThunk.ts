import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../custom/axios";
import { IGetMovieDetail } from "../../interfaces/movie";
import { IAddMovie, IDeleteAllMovie, IDeleteMovie, IGetAllMovies, ISearchMovie } from "../../interfaces/movie";

export const getCategories = createAsyncThunk(
  "movies/getCategories",
  async () => {
    try {
      const response = await fetch(
        process.env.REACT_APP_API_THE_LOAI as string
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getCountries = createAsyncThunk(
  "movies/getCountries",
  async () => {
    try {
      const response = await fetch(
        process.env.REACT_APP_API_QUOC_GIA as string
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getSlideShow = createAsyncThunk(
  "movies/getSlideShow",
  async () => {
    try {
      const response = await fetch(
        process.env.REACT_APP_API_PHIM_MOI_CAP_NHAT as string
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getFeatureFilm = createAsyncThunk(
  "movies/getFeatureFilm",
  async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_PHIM_LE}?limit=24` as string
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getTelevisionSeries = createAsyncThunk(
  "movies/getTelevisionSeries",
  async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_PHIM_BO}?limit=24` as string
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getCartoon = createAsyncThunk("movies/getCartoon", async () => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_HOAT_HINH}?limit=24` as string
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
});

export const getTvShows = createAsyncThunk("movies/getTvShows", async () => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_TV_SHOWS}?limit=24` as string
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
});

export const getMovieInfo = createAsyncThunk(
  "movies/getMovieInfo",
  async (slug: string) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_THONG_TIN_PHIM}/${slug}` as string
      );
      const data = await response.json();

      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getMovieDetail = createAsyncThunk(
  "movies/getMovieDetail",
  async (rawData: IGetMovieDetail) => {
    let { describe, slug, page } = rawData;
    try {
      const baseApi = `${process.env.REACT_APP_API_BASE}/${describe}/${slug}`;

      const response =
        describe !== "nam"
          ? await fetch(`${baseApi}?page=${page}&limit=24` as string)
          : await fetch(baseApi as string);

      const data = await response.json();
      return data.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const searchMovie = createAsyncThunk(
  "movies/searchMovie",
  async (rawData: ISearchMovie) => {
    const { keyword, page } = rawData;

    try {
      const baseApi: string = `${process.env.REACT_APP_API_TIM_KIEM}?keyword=${keyword}&limit=24&page=${page}`;
      const response = await fetch(baseApi);
      const data = await response.json();
      return data.data;
    } catch (error) {
      console.log(error);
    }
  }
);


export const getAllMovies = createAsyncThunk(
  "movies/getAllMovies",
  async (rawData: IGetAllMovies) => {
    try {
      const { userId, type } = rawData;
      const response = await axios.get(
        `${process.env.REACT_APP_API}/movies/get-all-movies?type=${type}&userId=${userId}`
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);

export const addMovie = createAsyncThunk(
  "movies/addMovie",
  async (rawData: IAddMovie) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API}/movies/add-movie`,
        rawData
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);

export const deleteMovie = createAsyncThunk(
  "movies/deleteMovie",
  async (rawData: IDeleteMovie) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API}/movies/delete-movie`,
        rawData
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);

export const deleteAllMovie = createAsyncThunk(
  "movies/deleteAllMovie",
  async (rawData: IDeleteAllMovie) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API}/movies/delete-all-movie`,
        rawData
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);
