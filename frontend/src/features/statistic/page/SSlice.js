import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../../common/api/http-common';

export const category = createAsyncThunk(
    'CATEGORY',
    async (categoryUid, { rejectWithValue }) => {
        console.log(categoryUid);
      try {
        const response = await axios.post('/subject/category',{params:{categoryUid}});
        return response.data;
      } catch (err) {
        console.log(err.response);
        return rejectWithValue(err.response);
      }
    }
  );
  