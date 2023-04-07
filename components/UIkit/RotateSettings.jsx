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

const RotationSettings = muiStyled((props) => {
  const {  ...other } = props;
  return <IconButton {...other} />;
})(({ editState,theme }) => ({
  transform: !editState ? "rotate(0deg)" : "rotate(180deg)",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function ProfileModal() {
  const openModal = useSelector(selectOpenProfile);
  const dispatch = useDispatch();
  const myprofile = useSelector(selectProfile);
  const [edit, setEdit] = useState(false);

  const handleEditClick = () => {
    setEdit(!edit);
  };

  return (
    <div>
      <Modal
        open={openModal}
        onClose={async () => {
          setEdit(false);
          await dispatch(resetOpenProfile());
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  w-96 bg-gray-200 p-8 rounded-2xl">
          <div className="absolute right-4 top-4">
            <RotationSettings
              expand={edit}
              aria-edit={edit}
              aria-label="show more"
              onClick={handleEditClick}
            >
              <SettingsIcon fontSize="large" />
            </RotationSettings>
          </div>
          {edit ? (
            <div className="flex flex-col items-center mt-5">
              <ProfileIcon scale={120} />

              <IconButton className="bg-gray-300">
                <PhotoCameraIcon sx={{ fontSize: 30 }} />
              </IconButton>

              <TextField
                id="outlined-basic"
                defaultValue={myprofile.nickName}
                label="Email"
                variant="outlined"
                sx={{ mb: 2 }}
              />
              <TextField
                id="outlined-basic"
                defaultValue={myprofile.nickName}
                label="Nickname"
                variant="outlined"
                sx={{ mb: 2 }}
              />
            </div>
          ) : (
            <div className="flex flex-col items-center mt-5">
              <ProfileIcon scale={120} />
              <div className="m-3">{myprofile.nickName}</div>
            </div>
          )}
        </Box>
      </Modal>
    </div>
  );
}
