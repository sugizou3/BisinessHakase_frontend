import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { useDispatch } from "react-redux";

const apiUrl = process.env.NEXT_PUBLIC_RESTAPI_URL;

export const fetchAsyncLogin = createAsyncThunk("auth/post", async (authen) => {
  const res = await axios.post(`${apiUrl}api/auth/jwt/create`, authen, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return res.data;
});

export const fetchAsynkVerify = createAsyncThunk("verify/post", async () => {
  const body = {
    token: localStorage.localJWT,
  };
  const res = await axios.post(`${apiUrl}api/auth/jwt/verify`, body, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  //return res.data;
});

export const fetchAsynkRefresh = createAsyncThunk("refresh/post", async () => {
  const body = {
    refresh: localStorage.localJWT_refresh,
  };
  const res = await axios.post(`${apiUrl}api/auth/jwt/refresh`, body, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
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
    if (localStorage.localJWT) {
      const res = await axios.post(`${apiUrl}api/profile/`, nickName, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `JWT ${localStorage.localJWT}`,
        },
      });
      return res.data;
    } else {
      const res = await axios.post(`${apiUrl}api/profile/`, nickName, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          //Authorization: `JWT ${localStorage.localJWT}`,
        },
      });
      return res.data;
    }

    // const res = await axios.post(`${apiUrl}api/profile/`, nickName, {
    //   headers: {
    //     "Content-Type": "application/json",
    //     Accept: "application/json",
    //     //Authorization: `JWT ${localStorage.localJWT}`,
    //   },
    // });
    // return res.data;
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
      // Authorization: `JWT ${localStorage.localJWT}`,
    },
  });
  return res.data;
});

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    openModal: false,
    isLoginTrueRegiFalse: true,
    openProfileModal: false,
    editState: false,
    isLoadingAuth: false,
    searchText: "",
    verifyStates: false,
    isLoggedIn: true,
    myprofile: {
      id: 0,
      nickName: "",
      userProfile: 0,
      created_on: "",
      img: "",
      download: [],
    },
    profiles: [
      {
        id: 0,
        nickName: "",
        userProfile: 0,
        created_on: "",
        img: "",
        download: [],
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
    isLoggedInOn(state) {
      state.isLoggedIn = true;
    },
    isLoggedInOff(state) {
      state.isLoggedIn = false;
    },
    changeIsLoginTrueRegiFalse(state) {
      state.isLoginTrueRegiFalse = !state.isLoginTrueRegiFalse;
    },
    setOpenProfile(state) {
      state.openProfileModal = true;
    },
    resetOpenProfile(state) {
      state.openProfileModal = false;
    },
    setEditState(state) {
      state.editState = true;
    },
    resetEditState(state) {
      state.editState = false;
    },

    editNickname(state, action) {
      state.myprofile.nickName = action.payload;
    },
    editImage(state, action) {
      state.myprofile.img = action.payload;
    },
    setSearchText(state, action) {
      state.searchText = action.payload;
    },
    resetSearchText(state) {
      state.searchText = "";
    },

    resetMyprofile(state) {
      state.myprofile.id = 0;
      state.myprofile.nickName = "";
      state.myprofile.userProfile = 0;
      state.myprofile.created_on = "";
      state.myprofile.img = "";
      state.myprofile.download = [];
      state.isLoggedIn = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAsyncLogin.fulfilled, (state, action) => {
      localStorage.setItem("localJWT", action.payload.access);
      localStorage.setItem("localJWT_refresh", action.payload.refresh);
    });
    builder.addCase(fetchAsynkVerify.fulfilled, (state, action) => {
      state.verifyStates = true;
    });
    builder.addCase(fetchAsynkVerify.rejected, (state, action) => {
      state.verifyStates = false;
    });

    builder.addCase(fetchAsynkRefresh.fulfilled, (state, action) => {
      localStorage.setItem("localJWT", action.payload.access);
      localStorage.setItem("localJWT_refresh", action.payload.refresh);
    });
    builder.addCase(fetchAsynkRefresh.rejected, (state, action) => {
      state.myprofile.id = 0;
      state.myprofile.nickName = "";
      state.myprofile.userProfile = 0;
      state.myprofile.created_on = "";
      state.myprofile.img = "";
      state.myprofile.download = [];
      state.isLoggedIn = false;
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
  setEditState,
  resetEditState,
  setIsLoginTrueRegiFalse,
  resetIsLoginTrueRegiFalse,
  isLoggedInOn,
  isLoggedInOff,
  changeIsLoginTrueRegiFalse,
  setOpenProfile,
  resetOpenProfile,
  editNickname,
  editImage,
  setSearchText,
  resetSearchText,
  resetMyprofile,
} = authSlice.actions;

export const selectIsLoadingAuth = (state) => state.auth.isLoadingAuth;
export const selectOpenModal = (state) => state.auth.openModal;
export const selectIsLoginTrueRegiFalse = (state) =>
  state.auth.isLoginTrueRegiFalse;
export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectVerifyState = (state) => state.auth.verifyStates;
export const selectOpenProfile = (state) => state.auth.openProfileModal;
export const selectEditState = (state) => state.auth.editState;
export const selectProfile = (state) => state.auth.myprofile;
export const selectProfiles = (state) => state.auth.profiles;
export const selectSearchText = (state) => state.auth.searchText;

export default authSlice.reducer;
