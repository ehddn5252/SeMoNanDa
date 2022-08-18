import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../common/api/http-common";

export const category = createAsyncThunk(
  "CATEGORY",
  async (uid, { rejectWithValue }) => {
    //////////////////
    const params = new URLSearchParams({
      categoryUID : this.categoryUid,
    }).toString();
   console.log("pa" , params);

    const url =
    "https://i7e103.p.ssafy.io/api/statis/subject/category?" +
    params;

    const categoryUID = uid.categoryUid;
    console.log("ddsdsadasdsddddddd", categoryUID);
    try {
      const response = await axios.post(url);
      console.log("zzzzz", response);
      return response.data;
    } catch (err) {
      console.log("err uid", uid);
      console.log("err", err.response);
      return rejectWithValue(err.response);
    }
  }


    //////////////////
  //   const temp = parseInt(uid.categoryUid);
  //   console.log("ddsdsadasdsddddddd", temp);
  //   try {
  //     const response = await axios.post(`/subject/category`, {
  //       categoryUID: { temp },
  //     });
  //     return response.data;
  //   } catch (err) {
  //     console.log("err uid", uid);
  //     console.log("err", err.response);
  //     return rejectWithValue(err.response);
  //   }
  // }
);
