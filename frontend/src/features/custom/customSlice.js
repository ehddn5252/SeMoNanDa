import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { saveToken } from '../../common/api/JWT-common';
import axios from '../../common/api/http-common';


export const cus_roomcreate = createAsyncThunk(
    'CREATE',
    async (roomInfo) => {
      try {
        const response = await axios.post('/room/create', roomInfo);
        return response;
      } catch (err) {
        return err.response.status;
      }
    }
  );
