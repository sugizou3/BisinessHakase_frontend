import * as React from "react";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import Typography from "@mui/material/Typography";
import ContentCut from "@mui/icons-material/ContentCut";
import ContentCopy from "@mui/icons-material/ContentCopy";
import ContentPaste from "@mui/icons-material/ContentPaste";
import Cloud from "@mui/icons-material/Cloud";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import {
  selectAuthen,
  editEmail,
  editPassword,
} from "../../src/reducks/login/loginSlice.js";

export default function ProRegIcon() {

  const authen = useSelector(selectAuthen);

  const logout = () => {
    dispatch(editEmail(""));
    dispatch(editPassword(""));
    cookie.remove("access_token", { path: "/" });
    router.push("/signup");
  };


  return (
    <div>
      {authen.email ? (
        <div className="flex ">
          <div className="relative top-28 left-7 bg-gray-500 w-64 h-full">
            <Paper sx={{ width: 320, maxWidth: "100%" }}>
        <MenuList>
          <MenuItem>
            <ListItemIcon>
              <ContentCut fontSize="small" />
            </ListItemIcon>
            <ListItemText>Cut</ListItemText>
            <Typography variant="body2" color="text.secondary">
              ⌘X
            </Typography>
          </MenuItem>
          <MenuItem>
            <ListItemIcon>
              <ContentCopy fontSize="small" />
            </ListItemIcon>
            <ListItemText>Copy</ListItemText>
            <Typography variant="body2" color="text.secondary">
              ⌘C
            </Typography>
          </MenuItem>
          <MenuItem>
            <ListItemIcon>
              <ContentPaste fontSize="small" />
            </ListItemIcon>
            <ListItemText>Paste</ListItemText>
            <Typography variant="body2" color="text.secondary">
              ⌘V
            </Typography>
          </MenuItem>
          <Divider />
          <MenuItem>
            <ListItemIcon>
              <Cloud fontSize="small" />
            </ListItemIcon>
            <ListItemText>Web Clipboard</ListItemText>
          </MenuItem>
        </MenuList>
      </Paper>
          </div>
          <button onClick={logout}>
            <Avatar>H</Avatar>
          </button>
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
