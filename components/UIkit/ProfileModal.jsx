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
  selectIsLoadingAuth,
  setOpenProfile,
  resetOpenProfile,
  selectIsLoginTrueRegiFalse,
  resetOpenModal,
  changeIsLoginTrueRegiFalse,
  fetchCredStart,
  fetchCredEnd,
  fetchAsyncLogin,
  fetchAsyncRegister,
  fetchAsyncGetMyProf,
  fetchAsyncGetProfs,
  fetchAsyncCreateProf,
  selectEditState,
  setEditState,
  resetEditState,
  editNickname,
  selectOpenProfile,
  selectProfile,
  fetchAsyncUpdateProf,
} from "../../src/reducks/auth/authSlice";
import { styled as muiStyled } from "@mui/material/styles";

const RotationSettings = muiStyled((props) => {
  const { ...other } = props;
  return <IconButton {...other} />;
})(({ editState, theme }) => ({
  transform: !editState ? "rotate(0deg)" : "rotate(180deg)",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function ProfileModal() {
  const openModal = useSelector(selectOpenProfile);
  const dispatch = useDispatch();
  const myprofile = useSelector(selectProfile);
  const editState = useSelector(selectEditState);

  const [image, setImage] = useState(myprofile ? myprofile.img : null);
  const [name, setName] = useState(myprofile.nickName);
  const [update, setUpdata] = useState(false);

  const upDateProfile = async (e) => {
    e.preventDefault();
    const packet = {
      id: myprofile.id,
      nickName: name,
      img: image,
      download: myprofile.download,
    };
    await dispatch(fetchCredStart());
    await dispatch(fetchAsyncUpdateProf(packet));
    await dispatch(fetchCredEnd());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleEditClick = async () => {
    if (editState) {
      await dispatch(resetEditState());
    } else {
      await dispatch(setEditState());
    }
  };

  return (
    <div>
      <Modal
        open={openModal}
        onClose={async () => {
          await dispatch(resetEditState());
          await dispatch(resetOpenProfile());
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  w-96 bg-gray-200 p-8 rounded-2xl">
          <div className="absolute right-4 top-4">
            <RotationSettings
              editState={editState}
              aria-edit={editState}
              aria-label="show more"
              onClick={handleEditClick}
            >
              <SettingsIcon fontSize="large" />
            </RotationSettings>
          </div>
          {editState ? (
            <div className="flex flex-col items-center mt-5">
              <ProfileIcon scale={120} />
              <div className="flex flex-col items-center ">
                <IconButton
                  className="bg-gray-300"
                  // onClick={handlerEditPicture}
                  aria-label="upload picture"
                  component="label"
                >
                  <input
                    id="imageInput"
                    hidden={true}
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files[0])}
                  />
                  <PhotoCameraIcon sx={{ fontSize: 30 }} />
                </IconButton>

                {/* <TextField
                  id="outlined-basic"
                  defaultValue={myprofile.nickName}
                  label="Email"
                  variant="outlined"
                  sx={{ mb: 2 }}
                  onChange={(e) => dispatch(editNickname(e.target.value))}
                /> */}
                <TextField
                  id="outlined-basic"
                  defaultValue={myprofile.nickName}
                  label="Nickname"
                  variant="outlined"
                  sx={{ mb: 2 }}
                  onChange={(e) => setName(e.target.value)}
                />
                <Button
                  disabled={!myprofile?.nickName}
                  variant="contained"
                  color="primary"
                  type="submit"
                  onClick={upDateProfile}
                >
                  Update
                </Button>
              </div>
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
