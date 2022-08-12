import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../../common/api/http-common';


export const roomcreate = createAsyncThunk(
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