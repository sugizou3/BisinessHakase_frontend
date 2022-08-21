// import { createSlice } from "@reduxjs/toolkit";

// export const loginSlice = createSlice({
//   name: "login",
//   initialState: {
//     login:false,
//   },
//   reducers: {
//     signup: () => {
//       login = true;
//     },
//     signout:() => {
//       login = false;
//     },
//   },
// });

// export const { signup, signout } = loginSlice.actions;

// export const selectLogins = (state) => state.login.logins;

// export default loginSlice.reducer;


import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


//const token = localStorage.localJWT;

export const fetchAsyncLogin = createAsyncThunk("login/post", async (auth) => {
  const res = await axios.post(`${NEXT_PUBLIC_RESTAPI_URL}authen/jwt/create`, auth, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res.data;
});

export const fetchAsyncRegister = createAsyncThunk(
  "login/register",
  async (auth) => {
    const res = await axios.post(`${NEXT_PUBLIC_RESTAPI_URL}api/register/`, auth, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.data;
  }
);

export const fetchAsyncProf = createAsyncThunk("login/get", async () => {
  const res = await axios.get(`${NEXT_PUBLIC_RESTAPI_URL}api/myprofile/`, {
    headers: {
      Authorization: `JWT ${token}`,
    },
  });
  return res.data;
});

const loginSlice = createSlice({
  name: "login",
  initialState: {
    authen: {
      email: "",
      password: "",
    },
    isLoginView: true,
    profile: {
      id: 0,
      nickName: "",
      userProfile:"",
    },
  },
  reducers: {
    editEmail(state, action) {
      state.authen.email = action.payload;
    },
    editPassword(state, action) {
      state.authen.password = action.payload;
    },
    toggleMode(state) {
      state.isLoginView = !state.isLoginView;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAsyncLogin.fulfilled, (state, action) => {
      localStorage.setItem("localJWT", action.payload.access);
      action.payload.access && (window.location.href = "/");
    });
    builder.addCase(fetchAsyncProf.fulfilled, (state, action) => {
      state.profile = action.payload;
    });
  },
});
export const { editEmail, editPassword, toggleMode } = loginSlice.actions;
export const selectAuthen = (state) => state.login.authen;
export const selectIsLoginView = (state) => state.login.isLoginView;
export const selectProfile = (state) => state.login.profile;

export default loginSlice.reducer;

