import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { saveToken } from '../../common/api/JWT-common';
import axios from '../../common/api/http-common';

// 메서드 전체 REST API, params 필요
// 회원가입
export const signup = createAsyncThunk(
  'SIGNUP',
  async (userInfo) => {
    try {
      const response = await axios.post('/user/signin', userInfo);
      return response;
    } catch (err) {
      console.log(err.response);
      return err.response.status;
    }
  }
);

// 닉네임 중복 검사
export const checkNickname = createAsyncThunk(
  'CHECK_NICKNAME',
  async (nickname) => {
    try {
      console.log(nickname)
      const response = await axios.get('/user/nickname-info',{
      params: {nickname}
      });
      return response;
    } catch (err) {
      return err.response.status;
    }
  }
);

// 아이디 중복 검사
export const checkId = createAsyncThunk(
  'CHECK_ID',
  async (user_id) => {
    try {
      console.log("user_id",user_id)
      const response = await axios.get('/user/id-info',{
      params: {user_id}
      });
      return response;
    } catch (err) {
      console.log("err_response",err.response.status);
      return err.response.status;
    }
  }
);

// 로그인
export const login = createAsyncThunk(
  'LOGIN',
  async (loginInfo) => {
    try {
      const response = await axios.post('/v1/auth/login', loginInfo);
      const {
        data: { accessToken },
      } = response;
      saveToken(accessToken);
      return response;
    } catch (err) {
      console.log("Axios",err.response.status)
      //console.log("rejectWithValue",rejectWithValue(err.response.status));
      return (err.response.status);
    }
  }
);

//내 정보 가져오기
export const loadUser = createAsyncThunk(
  'LOAD_USER',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get('/user/user-info',{
      params: {id}
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response);
    }
  }
);

// 비밀번호 확인
export const checkPassword = createAsyncThunk(
  'CHECK_PASSWORD',
  async (password, { rejectWithValue }) => {
    try {
      const response = await axios.post('/api/user/check_password', password);
      return response;
    } catch (err) {
      return rejectWithValue(err.response);
    }
  }
);

// 유저정보 변경
export const modifyUserInfo = createAsyncThunk(
  'MODIFY_NICKNAME',
  async (userInfo, { rejectWithValue }) => {
    try {
      const response = await axios.put('/user/profile', userInfo);
      console.log("modify_response",response);
      return response;
    } catch (err) {
      return rejectWithValue(err.response);
    }
  }
);


// 비밀번호 변경
export const modifyPassword = createAsyncThunk(
  'MODIFY_PASSWORD',
  async (data) => {
    try {
      const response = await axios.put('/user/profile/password', data);
      return response;
    } catch (err) {
      console.log("err",err);
      return err.response;
    }
  }
);

// 회원탈퇴
export const deleteUser = createAsyncThunk(
  'DELETE_USER',
  async (arg, { rejectWithValue }) => {
    try {
      const response = await axios.delete('/api/user');
      return response;
    } catch (err) {
      return rejectWithValue(err.response);
    }
  }
);

const initialState = {
  user: {},
  isAdmin: false,
  isAuthenticated: false,
  isNicknameChecked: false,
  isLoading: false,
  isIdChecked: false,
};

// slice
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setNicknameCheckedFalse: (state) => {
      state.isNicknameChecked = false;
    },
    setIdCheckedFasle: (state) => {
      state.isIdChecked = false;
    },
    resetUser: (state) => {
      console.log(state.user);
      state.user = {};
      state.isAdmin = false;
      console.log(state);
    },
  },
  extraReducers: {
    [signup.pending]: (state) => {
      state.isLoading = true;
    },
    [signup.fulfilled]: (state) => {
      state.isLoading = false;
    },
    [signup.rejected]: (state) => {
      state.isLoading = false;
    },
    [login.fulfilled]: (state) => {
      state.isAuthenticated = true;
    },
    [login.rejected]: (state) => {
      console.log("state",state);
      state.isAuthenticated = false;
    },
    [checkNickname.fulfilled]: (state) => {
      state.isNicknameChecked = true;
    },
    [checkNickname.rejected]: (state) => {
      state.isNicknameChecked = false;
    },
    [checkId.fulfilled]: (state) => {
      state.isIdChecked = true;
    },
    [checkId.rejected]: (state) => {
      console.log("state",state);
      state.isIdChecked = false;
    },
    [modifyUserInfo.fulfilled]: (state) => {
      state.isNicknameChecked = false;
    },
    [loadUser.fulfilled]: (state, action) => {
      state.user = action.payload;;
    },
  },
});

export const { setIdCheckedFasle, setNicknameCheckedFalse, resetUser } = userSlice.actions;
export default userSlice.reducer;