import React, { useState, useEffect, useCallback } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { useSelector, useDispatch } from "react-redux";
import { ProfileIcon } from ".";
import SettingsIcon from "@mui/icons-material/Settings";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import { Formik } from "formik";
import * as Yup from "yup";
import { TextField, CircularProgress, IconButton } from "@mui/material";
import {
  selectEditState,
  setEditState,
  resetEditState,
  resetOpenProfile,
  selectOpenProfile,
  selectProfile,
 
  
  
} from "../../src/reducks/auth/authSlice";
import { styled as muiStyled } from "@mui/material/styles";



// export const RotationSettings = muiStyled((props) => {
//   const {  ...other } = props;
//   return <IconButton {...other} />;
// })(({ editState,theme }) => ({
//   transform: !editState ? "rotate(0deg)" : "rotate(180deg)",
//   transition: theme.transitions.create("transform", {
//     duration: theme.transitions.duration.shortest,
//   }),
// }));
