import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../custom/axios";

export const getCommentList = createAsyncThunk(
  "movies/getCommentList",
  async (movie_slug: string) => {
    try {
      const response: any = await axios.get(
        `${process.env.REACT_APP_API}/comment/get-comments/${movie_slug}`
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);

export const addComment = createAsyncThunk(
  "movies/addComment",
  async (rawData: any) => {
    try {
      const response: any = await axios.post(
        `${process.env.REACT_APP_API}/comment/add-comment`,
        rawData
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);

export const deleleComment = createAsyncThunk(
  "movies/deleleComment",
  async (idComment: string) => {
    try {
      const response: any = await axios.post(
        `${process.env.REACT_APP_API}/comment/delete-comment`,
        { id: idComment }
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);

export const updateComment = createAsyncThunk(
  "movies/updateComment",
  async (rawData: any) => {
    try {
      const response: any = await axios.post(
        `${process.env.REACT_APP_API}/comment/update-comment`,
        rawData
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);
