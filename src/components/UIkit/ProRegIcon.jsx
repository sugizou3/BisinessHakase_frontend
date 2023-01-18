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
import Avatar from "@mui/material/Avatar";
import Cookie from "universal-cookie";
import { useRouter } from "next/router";
import { useState } from "react";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import {
  selectAuthen,
  editEmail,
  editPassword,
} from "../../src/reducks/login/loginSlice.jsx";

const cookie = new Cookie();

export default function ProRegIcon() {
  const [show, setShow] = useState(false);
  const router = useRouter();

  const authen = useSelector(selectAuthen);
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(editEmail(""));
    dispatch(editPassword(""));
    cookie.remove("access_token", { path: "/" });
    router.push("/signup");
  };

  return (
    <div>
      {authen.email ? (
        <div className="">
          

          <button className="pointer-events-auto"
            onClick={() => {
              setShow((prevState) => !prevState);
            }}
          >
            <Avatar>H</Avatar>
          </button>
          {show ? (<div className="absolute right-1 w-64 h-full">
            <Paper sx={{ width: 320, maxWidth: "100%" }}>
              <MenuList>
                <Link href="/mypage">
                  <MenuItem>
                    <ListItemIcon>
                      <AccountCircleOutlinedIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Profile</ListItemText>
                  </MenuItem>
                </Link>
                <Divider />
                <MenuItem onClick={logout}>
                  <ListItemIcon>
                    <LogoutIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Logout</ListItemText>
                </MenuItem>
              </MenuList>
            </Paper>
          </div>):(<div className="absolute right-1 w-64 h-full"></div>)}
        </div>
      ) : (
        <Link href="signup/">
          <Button
            type="submit"
            fullWidth
            variant="outlined"
            sx={{ fontWeight: "bold", width: 90 }}
            className="flex items-center "
          >
            ログイン
          </Button>
        </Link>
      )}
    </div>
  );
}
