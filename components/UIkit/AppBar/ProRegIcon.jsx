import * as React from "react";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import Button from "@mui/material/Button";
import { useSelector, useDispatch } from "react-redux";
import {
  setOpenModal,
  selectProfile,
  resetOpenProfile,
  setOpenProfile,
  resetMyprofile,
} from "../../../src/reducks/auth/authSlice.js";
import { AuthModal, ProfileIcon, ProfileModal } from "../index.jsx";
import { resetOpenNewPost } from "src/reducks/post/postSlice.js";
import { Modal } from "@mui/material";

export default function ProRegIcon() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const profile = useSelector(selectProfile);

  const dispatch = useDispatch();

  const logout = () => {
    localStorage.removeItem("localJWT");
    dispatch(resetMyprofile());
    dispatch(resetOpenProfile());
    dispatch(resetOpenNewPost());
    dispatch(setOpenModal());
  };
  const openProfileModal = () => {
    dispatch(setOpenProfile());
  };

  return (
    <div>
      {profile?.nickName ? (
        <div className="">
          <button className="pointer-events-auto" onClick={handleOpen}>
            <ProfileIcon />
          </button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
            BackdropProps={{
              style: {
                backgroundColor: "transparent",
              },
            }}
          >
            <Paper className="absolute top-14 right-1 w-44  min-w-max">
              <MenuList>
                <MenuItem onClick={openProfileModal}>
                  <ListItemIcon>
                    <AccountCircleOutlinedIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Profile</ListItemText>
                </MenuItem>

                <Divider />
                <MenuItem onClick={logout}>
                  <ListItemIcon>
                    <LogoutIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Logout</ListItemText>
                </MenuItem>
              </MenuList>
            </Paper>
          </Modal>
        </div>
      ) : (
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ fontWeight: "bold", width: 90 }}
          className="flex items-center "
          onClick={async () => {
            await dispatch(setOpenModal());
          }}
        >
          ログイン
        </Button>
      )}
      <AuthModal />
      <ProfileModal />
    </div>
  );
}
