import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const apiUrl = process.env.NEXT_PUBLIC_RESTAPI_URL;

export const fetchAsyncLogin = createAsyncThunk("auth/post", async (authen) => {
  const res = await axios.post(`${apiUrl}api/auth/jwt/create`, authen, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return res.data;
});

export const fetchAsyncRegister = createAsyncThunk(
  "auth/register",
  async (auth) => {
    const res = await axios.post(`${apiUrl}api/register/`, auth, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.data;
  }
);

export const fetchAsyncCreateProf = createAsyncThunk(
  "profile/post",
  async (nickName) => {
    const res = await axios.post(`${apiUrl}api/profile/`, nickName, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `JWT ${localStorage.localJWT}`,
      },
    });
    return res.data;
  }
);

export const fetchAsyncUpdateProf = createAsyncThunk(
  "profile/put",
  async (profile) => {
    const uploadData = new FormData();
    uploadData.append("nickName", profile.nickName);
    profile.img && uploadData.append("img", profile.img, profile.img.name);
    const res = await axios.put(
      `${apiUrl}api/profile/${profile.id}/`,
      uploadData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${localStorage.localJWT}`,
        },
      }
    );
    return res.data;
  }
);

export const fetchAsyncGetMyProf = createAsyncThunk("profile/get", async () => {
  const res = await axios.get(`${apiUrl}api/myprofile/`, {
    headers: {
      Authorization: `JWT ${localStorage.localJWT}`,
    },
  });
  return res.data[0];
});

export const fetchAsyncGetProfs = createAsyncThunk("profiles/get", async () => {
  const res = await axios.get(`${apiUrl}api/profile/`, {
    headers: {
      Authorization: `JWT ${localStorage.localJWT}`,
    },
  });
  return res.data;
});

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    openModal: false,
    isLoginTrueRegiFalse: true,
    openProfile: false,
    isLoadingAuth: false,
    myprofile: {
      id: 0,
      nickName: "",
      userProfile: 0,
      created_on: "",
      img: "",
    },
    profiles: [
      {
        id: 0,
        nickName: "",
        userProfile: 0,
        created_on: "",
        img: "",
      },
    ],
  },
  reducers: {
    fetchCredStart(state) {
      state.isLoadingAuth = true;
    },
    fetchCredEnd(state) {
      state.isLoadingAuth = false;
    },
    setOpenModal(state) {
      state.openModal = true;
    },
    resetOpenModal(state) {
      state.openModal = false;
    },
    setIsLoginTrueRegiFalse(state) {
      state.isLoginTrueRegiFalse = true;
    },
    resetIsLoginTrueRegiFalse(state) {
      state.isLoginTrueRegiFalse = false;
    },
    changeIsLoginTrueRegiFalse(state) {
      state.isLoginTrueRegiFalse = !state.isLoginTrueRegiFalse;
    },
    setOpenProfile(state) {
      state.openProfile = true;
    },
    resetOpenProfile(state) {
      state.openProfile = false;
    },
    editNickname(state, action) {
      state.myprofile.nickName = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAsyncLogin.fulfilled, (state, action) => {
      localStorage.setItem("localJWT", action.payload.access);
    });
    builder.addCase(fetchAsyncCreateProf.fulfilled, (state, action) => {
      state.myprofile = action.payload;
    });
    builder.addCase(fetchAsyncGetMyProf.fulfilled, (state, action) => {
      state.myprofile = action.payload;
    });
    builder.addCase(fetchAsyncGetProfs.fulfilled, (state, action) => {
      state.profiles = action.payload;
    });
    builder.addCase(fetchAsyncUpdateProf.fulfilled, (state, action) => {
      state.myprofile = action.payload;
      state.profiles = state.profiles.map((prof) =>
        prof.id === action.payload.id ? action.payload : prof
      );
    });
  },
});

export const {
  fetchCredStart,
  fetchCredEnd,
  setOpenModal,
  resetOpenModal,
  setIsLoginTrueRegiFalse,
  resetIsLoginTrueRegiFalse,
  changeIsLoginTrueRegiFalse,
  setOpenProfile,
  resetOpenProfile,
  editNickname,
} = authSlice.actions;

export const selectIsLoadingAuth = (state) => state.auth.isLoadingAuth;
export const selectOpenModal = (state) => state.auth.openModal;
export const selectIsLoginTrueRegiFalse = (state) => state.auth.isLoginTrueRegiFalse;
export const selectOpenProfile = (state) => state.auth.openProfile;
export const selectProfile = (state) => state.auth.myprofile;
export const selectProfiles = (state) => state.auth.profiles;

export default authSlice.reducer;
