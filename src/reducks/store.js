import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";
import authReducer from "./auth/authSlice";
import postReducer from "./post/postSlice";
import dictionaryReducer from "./dictionary/dictionarySlice";
import searchInfoReducer from "./searchInfo/searchInfoSlice";

// export const store = configureStore({
//   reducer: {
//     auth: authReducer,
//     post: postReducer,
//   },
// });

// export default configureStore({
//   reducer: {
//     login: loginReducer,
//     auth: authReducer,
//     post: postReducer,
//   },
// });

const reducers = combineReducers({
  auth: authReducer,
  post: postReducer,
  dictionary: dictionaryReducer,
  searchInfo: searchInfoReducer,
});

const persistConfig = {
  key: "root", // Storageに保存されるキー名を指定する
  storage, // 保存先としてlocalStorageがここで設定される
  whitelist: [`auth`], // Stateは`name`のみStorageに保存する
  // blacklist: ['post','searchInfo'] // `name2`は保存しない
};

// 永続化設定されたReducerとして定義
const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});

export default store;
