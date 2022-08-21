import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "./task/taskSlice";
import loginReducer from "./login/loginSlice";

export default configureStore({
  reducer: {
    task: taskReducer,
    login: loginReducer,
  },
});
