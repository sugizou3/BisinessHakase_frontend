import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { useDispatch } from "react-redux";

const apiUrl = process.env.NEXT_PUBLIC_RESTAPI_URL;

export const fetchAsyncGetSearchInfo = createAsyncThunk(
  "searchInfo/get",
  async () => {
    const res = await axios.get(`${apiUrl}api/searchInfo/`, {
      headers: {
        // Authorization: `JWT ${localStorage.localJWT}`,
      },
    });
    return res.data;
  }
);

export const searchInfoSlice = createSlice({
  name: "searchInfo",
  initialState: {
    searchHistroy: [
      {
        user:0,
        count:0,
        text:[0],
        searched_on: "",
      },
    ],

  },
  extraReducers: (builder) => {
    builder.addCase(fetchAsyncGetSearchInfo.fulfilled, (state, action) => {
    state.searchHistroy = action.payload;
    });
  },
});

export const selectSearchInfo = (state) => state.searchInfo.searchHistroy;

export default searchInfoSlice.reducer;
