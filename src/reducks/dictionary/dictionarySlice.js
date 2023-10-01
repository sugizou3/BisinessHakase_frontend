import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { useDispatch } from "react-redux";

const apiUrl = process.env.NEXT_PUBLIC_RESTAPI_URL;

// export const getDictionary =
//   ("list-dictionary/get",
//   async () => {
//     const res = await axios.get(`${apiUrl}api/list-dictionary/`, {
//       headers: {
//         //Authorization: `JWT ${localStorage.localJWT}`,
//       },
//     });
//     return res.data[0];
//   });

export const fetchAsyncGetDictionary = createAsyncThunk(
  "dictionary/get",
  async () => {
    const res = await axios.get(`${apiUrl}api/dictionary/`, {
      headers: {
        // Authorization: `JWT ${localStorage.localJWT}`,
      },
    });
    return res.data;
  }
);

export const dictionarySlice = createSlice({
  name: "dictionary",
  initialState: {
    words: [
      {
        id: 0,
        text: "",
      },
    ],
  },
  //   reducers: {
  //     setWords(state, action) {
  //         return {
  //             ...state,
  //             words: action.payload,
  //           };
  //     },
  //     // setText(state, action) {
  //     //   state.words.text = action.payload;
  //     // },
  //   },
  extraReducers: (builder) => {
    builder.addCase(fetchAsyncGetDictionary.fulfilled, (state, action) => {
    state.words = action.payload;
    });
  },
});

export const {
  setDictionary,
  //   setText,
} = dictionarySlice.actions;

export const selectDictionary = (state) => state.dictionary.words;

export default dictionarySlice.reducer;
