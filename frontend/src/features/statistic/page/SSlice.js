import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../common/api/http-common";

export const category = createAsyncThunk(
  "CATEGORY",
  async (topics, { rejectWithValue }) => {
     const categoryUID = parseInt(topics.categoryUid);
      console.log(categoryUID);
    try {
      const response = await axios.get(`/statis/subject/category`, {
        params: { categoryUID },
      });
      return response;
    } catch (err) {
      return rejectWithValue(err.response);
    }
  }
);

export const categoryAll = createAsyncThunk(
  "CATEGORYAll",
  async (topics, { rejectWithValue }) => {
  
    try {
      const response = await axios.post(`/statis/subject`);
      return response;
    } catch (err) {
      return rejectWithValue(err.response);
    }
  }
);
