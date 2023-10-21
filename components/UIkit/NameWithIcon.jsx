import "tailwindcss/tailwind.css";
import { ProfileIcon,ProfileModal } from "./index";
import * as React from "react";
import Typography from "@mui/material/Typography";
import SettingsIcon from "@mui/icons-material/Settings";
import { styled as muiStyled } from "@mui/material/styles";
import {
  selectEditState,
  setEditState,
  resetEditState,
  selectProfile,
  setOpenProfile,
} from "../../src/reducks/auth/authSlice";
import { TextField, CircularProgress, IconButton } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";

const RotationSettings = muiStyled((props) => {
  const { ...other } = props;
  return <IconButton {...other} />;
})(({ editState, theme }) => ({
  transform: !editState ? "rotate(0deg)" : "rotate(180deg)",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function NameWithIcon() {
  const dispatch = useDispatch();
  const myProf = useSelector(selectProfile);
  const editState = useSelector(selectEditState);
  const openProfileModal = () => {
    dispatch(setOpenProfile());
  };
  const handleEditClick = async () => {
    openProfileModal()
    if (editState) {
      await dispatch(resetEditState());
    } else {
      await dispatch(setEditState());
    }
  };

  return (
      <div className="flex flex-col items-center mt-5">
        <ProfileIcon scale={120} />
        <Typography sx={{mt:1}} >{myProf.nickName}</Typography>
        <div className="relative left-20 bottom-12">
            <RotationSettings
              editState={editState}
              aria-edit={editState}
              aria-label="show more"
              onClick={handleEditClick}
            >
              <SettingsIcon fontSize="large" />
            </RotationSettings>
          </div>
          <ProfileModal />
      </div>
  );
}
